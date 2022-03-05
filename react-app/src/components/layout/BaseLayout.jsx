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
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default BaseLayout;
