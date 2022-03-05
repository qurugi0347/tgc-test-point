import React from "react";
import styled from "styled-components";
import BaseButton from "components/BaseButton";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Title>포인트 관리</Title>
      <BaseButton
        onClick={() => {
          navigate("/user");
        }}>
        로그인
      </BaseButton>
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

export default MainPage;
