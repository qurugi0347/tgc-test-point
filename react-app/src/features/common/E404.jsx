import React from "react";
import styled from "styled-components";
import BaseButton from "components/BaseButton";
import {useNavigate} from "react-router-dom";

const E404 = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Title>페이지를 찾을 수 없습니다.</Title>
      <BaseButton
        onClick={() => {
          navigate("/user");
        }}>
        홈으로 돌아가기
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

export default E404;
