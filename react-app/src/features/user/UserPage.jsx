import React, {useEffect, useState, useMemo} from "react";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import BaseLayout from "components/layout/BaseLayout";
import useModalContext from "hooks/useModalContext";
import UserList from "./components/UserList";
import SearchSection from "./components/SearchSection";
import Pagination from "components/Pagination";
import queryString from "query-string";
import {getUserList} from "api/user";

const UserPage = () => {
  const modalContext = useModalContext();
  const location = useLocation();
  const navigate = useNavigate();
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

  const onChangePage = (page) => {
    const searchQuery = queryString.stringify({
      ...queryData,
      page: page,
    });
    navigate({
      pathname: location.pathname,
      search: searchQuery,
    });
  };

  useEffect(() => {
    getData(queryData);
  }, [queryData]);

  return (
    <BaseLayout title="유저">
      <ContentsWrapper>
        <SearchSection />
        <UserList userData={userData} />
        <Pagination
          maxPage={maxPage}
          page={queryData.page || 1}
          onChangePage={onChangePage}
        />
      </ContentsWrapper>
    </BaseLayout>
  );
};

const ContentsWrapper = styled.div`
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  height: 100%;
`;

export default UserPage;
