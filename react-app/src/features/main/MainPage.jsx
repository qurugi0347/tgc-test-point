import React from "react";
import styled from "styled-components";

const MainPage = () => {
  return (
    <Wrapper>
      <Title>포인트 관리</Title>
      <Button>로그인</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Title = styled.h1``;

const Button = styled.button``;

export default MainPage;
