import React, {useEffect} from "react";
import styled, {keyframes} from "styled-components";
import useModalContext from "hooks/useModalContext";

const slidein = keyframes`
  from {
    transform: translate(0, 10px);
    opacity: 0;
  }
  to {
    transfrom: translateY(0, 0);
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 999;
  ${({customStyle}) => customStyle};
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) =>
    props.opacity !== undefined ? "rgba(0,0,0,0.2)" : "rgba(0, 0, 0, 0.5)"};
  z-index: -1;
`;

const ChildrenWrap = styled.div`
  position: absolute;
  width: fit-content;
  max-width: 420px;
  z-index: 100;
  margin: auto;
  overflow: hidden;
  &.open {
    animation: 0.25s linear ${slidein};
  }
  &.bottom {
    bottom: 0;
  }
  &.left {
    left: 0;
  }
`;

const DefaultModalForm = styled.div`
  width: 420px;
  max-width: 90vw;
  border-radius: 20px;
  padding: 20px;
  overflow: hidden;
  background: ${({theme}) => theme.ui00};
  text-align: center;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`;

const ModalContents = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  &:not(:first-child) {
    padding-top: 12px;
  }
  &:not(:last-child) {
    padding-bottom: 20px;
  }
`;

const ModalButtonSection = styled.div`
  text-align: center;
`;

const Modal = ({children, closeHandler, style, align, opacity}, ref) => {
  const modalContext = useModalContext();
  useEffect(() => {
    document.body.style.cssText = `overflow: hidden; position: fixed; top: -${window.scrollY}px; width: 100%;`;
    const footerTab = document.getElementById("footerTab");
    if (footerTab)
      footerTab.style.cssText = `overflow: hidden; position: fixed; bottom: 0px; width: 100%; max-width: 420px;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      if (footerTab) footerTab.style.cssText = ``;
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
  return (
    <Container customStyle={style}>
      <Overlay onClick={closeHandler} opacity={opacity} />
      <ChildrenWrap
        className={(() => {
          const classes = [];
          if (align) {
            classes.push(align);
          }
          if (modalContext.isOpen) {
            classes.push("open");
          }
          return classes.join(" ");
        })()}
        ref={ref}>
        {children}
      </ChildrenWrap>
    </Container>
  );
};

const ForwardedModal = React.forwardRef(Modal);

export default ForwardedModal;

export {DefaultModalForm, ModalTitle, ModalButtonSection, ModalContents};
