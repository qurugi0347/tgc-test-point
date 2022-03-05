import React from "react";
import Button from "components/BaseButton";
import nl2br from "react-nl2br";
import useModalContext from "hooks/useModalContext";
import styled, {keyframes} from "styled-components";

import {
  DefaultModalForm,
  ModalTitle,
  ModalButtonSection,
  ModalContents,
} from "./index";

const ModalAlert = (props) => {
  const modalContext = useModalContext();
  return (
    <DefaultModalForm>
      <Title>{props.title}</Title>
      <Contents>{nl2br(props.description)}</Contents>
      <ModalButtonSection>
        <AlertButton
          className="large inverse r12"
          onClick={() => {
            if (props.onClose) {
              props.onClose();
              if (props.nextModal) return;
            }
            modalContext.close();
          }}>
          확인
        </AlertButton>
      </ModalButtonSection>
    </DefaultModalForm>
  );
};

const Title = styled(ModalTitle)`
  text-align: center;
`;

const Contents = styled(ModalContents)`
  text-align: center;
`;

const AlertButton = styled(Button)``;
export default ModalAlert;
