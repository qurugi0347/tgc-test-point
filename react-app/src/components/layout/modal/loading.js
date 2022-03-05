import React, {useEffect, useState} from "react";
import styled from "styled-components";

const LoadingIcon = styled.span`
  color: ${({theme}) => theme.ui00};
  margin: auto;
  display: block;
  width: fit-content;
  animation: none;
  transition: 0s all;
  transform: rotate(360deg);
`;

const ModalAlert = () => {
  return <LoadingIcon>로딩중</LoadingIcon>;
};

export default ModalAlert;
