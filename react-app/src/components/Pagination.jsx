import React, {useMemo} from "react";
import styled from "styled-components";

const PaginationSection = ({maxPage, page, onChangePage}) => {
  const {startPage, endPage, pages} = useMemo(() => {
    const stPage = parseInt((page - 1) / 10) * 10 + 1;
    const edPage = Math.min(maxPage, stPage + 9);
    const pageNumber = [];
    for (let i = stPage; i <= edPage; i++) {
      pageNumber.push(i);
    }
    return {
      startPage: stPage,
      endPage: edPage,
      pages: pageNumber,
    };
  }, [page, maxPage]);

  return (
    <Wrapper>
      {startPage > 10 && (
        <span
          onClick={() => {
            if (onChangePage) {
              onChangePage(startPage - 1);
            }
          }}>{`<`}</span>
      )}
      {pages.map((num) => (
        <span
          key={num}
          className={page == num ? "active" : ""}
          onClick={() => {
            if (onChangePage) {
              onChangePage(num);
            }
          }}>
          {num}
        </span>
      ))}
      {endPage < maxPage && (
        <span
          onClick={() => {
            if (onChangePage) {
              onChangePage(endPage + 1);
            }
          }}>{`>`}</span>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  text-align: center;
  background: white;
  border-top: 1px solid;
  span {
    cursor: pointer;
    border: 1px solid #999;
    border-radius: 4px;
    padding: 2px 4px;
    margin: 0 4px;
    &.active {
      background: blue;
      border-color: blue;
      color: white;
    }
  }
`;

export default PaginationSection;
