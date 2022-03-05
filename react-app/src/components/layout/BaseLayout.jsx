import React from "react";
import styled from "styled-components";
import Menu from "./BaseMenu";

const BaseLayout = ({children, title = "제목을 설정해주세요"}) => {
  return (
    <>
      <TitleBar>{title}</TitleBar>
      <BaseWrapper>
        <Menu />
        <ContentWrapper>{children}</ContentWrapper>
      </BaseWrapper>
    </>
  );
};

const TitleBar = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: 500;
  border-bottom: 1px solid;
`;

const BaseWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  width: 100%;
  overflow: hidden;
  height: -webkit-fill-available;
`;

const ContentWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 71px);
`;

export default BaseLayout;
