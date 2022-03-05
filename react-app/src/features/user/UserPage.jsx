import React, {useEffect, useState, useMemo} from "react";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import BaseLayout from "components/layout/BaseLayout";
import useModalContext from "hooks/useModalContext";
import UserList from "./components/UserList";
import SearchSection from "./components/SearchSection";
import queryString from "query-string";
import {getUserList} from "api/user";

const UserPage = () => {
  const modalContext = useModalContext();
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  const queryData = useMemo(() => {
    return queryString.parse(location.search);
  }, [location.search]);

  const getData = async (searchQuery) => {
    modalContext.loading();
    const res = await getUserList(searchQuery);
    modalContext.popLoading();
    if (res.status !== 200) return;
    setMaxPage(Math.ceil(res.data.total / res.data.limit) || 1);
    setUserData(res.data?.data);
  };

  useEffect(() => {
    getData(queryData);
  }, [queryData]);

  return (
    <BaseLayout title="유저">
      <ContentsWrapper>
        <SearchSection />
        <UserList userData={userData} />
      </ContentsWrapper>
    </BaseLayout>
  );
};

const ContentsWrapper = styled.div`
  display: grid;
  grid-template-rows: max-content 1fr;
`;

export default UserPage;
