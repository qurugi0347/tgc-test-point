import React, {useRef, useMemo} from "react";
import styled from "styled-components";
import queryString from "query-string";
import {useLocation, useNavigate} from "react-router-dom";
import BaseButton from "components/BaseButton";

const SearchSection = ({}) => {
  const inputRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const queryData = useMemo(() => {
    return queryString.parse(location.search);
  }, [location.search]);

  const search = () => {
    const searchQuery = queryString.stringify({
      ...queryData,
      userId: inputRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      page: 1,
    });
    navigate({
      pathname: location.pathname,
      search: searchQuery,
    });
  };

  return (
    <Wrapper>
      <SearchWrapper>
        <div>유저 ID</div>
        <Input
          ref={inputRef}
          type="search"
          placeholder="UserId를 입력하세요"
          defaultValue={queryData.userId}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              search();
            }
          }}
        />
        <div>검색 시작일</div>
        <Input
          ref={startDateRef}
          type="date"
          defaultValue={queryData.startDate}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              search();
            }
          }}
        />
        <div>검색 종료일</div>
        <Input
          ref={endDateRef}
          type="date"
          defaultValue={queryData.endDate}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              search();
            }
          }}
        />
      </SearchWrapper>
      <BaseButton className="small" onClick={search}>
        검색
      </BaseButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-bottom: 1px solid;
  padding: 8px 16px;
`;

const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 4px 8px;
`;

export default SearchSection;
