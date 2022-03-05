import React, {useRef, useMemo} from "react";
import styled from "styled-components";
import queryString from "query-string";
import {useLocation, useNavigate} from "react-router-dom";
import BaseButton from "components/BaseButton";

const SearchSection = ({}) => {
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const queryData = useMemo(() => {
    return queryString.parse(location.search);
  }, [location.search]);

  const search = () => {
    const searchQuery = queryString.stringify({
      ...queryData,
      search: inputRef.current.value,
      page: 1,
    });
    navigate({
      pathname: location.pathname,
      search: searchQuery,
    });
  };

  return (
    <Wrapper>
      <Input
        ref={inputRef}
        type="search"
        placeholder="검색어를 입력하세요"
        defaultValue={queryData.search}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            search();
          }
        }}
      />
      <BaseButton className="small" onClick={search}>
        검색
      </BaseButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-bottom: 1px solid;
  padding: 8px 16px;
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 4px 8px;
`;

export default SearchSection;
