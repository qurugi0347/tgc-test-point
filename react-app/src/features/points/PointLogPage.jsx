import React, {useEffect, useState, useMemo} from "react";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import BaseLayout from "components/layout/BaseLayout";
import useModalContext from "hooks/useModalContext";
import Pagination from "components/Pagination";
import PointLogList from "./components/PointLogList";
import SearchSection from "./components/SearchSection";
import queryString from "query-string";
import {getUserPointLogs} from "api/point";

const UserPage = () => {
  const modalContext = useModalContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [maxPage, setMaxPage] = useState(1);
  const [pointLogData, setPointLogData] = useState([]);

  const queryData = useMemo(() => {
    return queryString.parse(location.search);
  }, [location.search]);

  const getData = async (searchQuery) => {
    modalContext.loading();
    const res = await getUserPointLogs(searchQuery);
    modalContext.popLoading();
    if (res.status >= 400) {
      modalContext.alert({
        title: "오류",
        description: res.data?.message || `${res.statusText}`,
      });
      return;
    }
    setPointLogData(res.data.data);
    setMaxPage(Math.ceil(res.data.total / res.data.limit) || 1);
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
    <BaseLayout title="포인트 내역">
      <ContentsWrapper>
        <SearchSection />
        <PointLogList logData={pointLogData} />
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
