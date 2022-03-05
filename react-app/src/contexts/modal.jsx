import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import {createPortal} from "react-dom";
import Modal from "components/layout/modal/";
import ModalAlert from "components/layout/modal/alert";
import ModalLoading from "components/layout/modal/loading";

const ModalContext = createContext();

const {Provider} = ModalContext;

/*
  Warning: modal에 던져주는 CallbackProps에서
*/
let modalStack = [];

const ModalProvider = ({children}) => {
  const [renderStack, setRenderStack] = useState(modalStack);

  const isOpen = modalStack.length !== 0;

  const custom = (component) => {
    modalStack.push(component);
    setRenderStack([...modalStack]);
  };

  const alert = (data) => {
    custom(<ModalAlert {...data} />);
  };

  const loading = () => {
    custom(<ModalLoading isLoading={true} />);
  };

  const close = () => {
    modalStack = [];
    setRenderStack([]);
  };

  const closeLoading = () => {
    const newStack = [];
    for (let i = 0; i < modalStack.length; i++) {
      const nowModal = modalStack[i];
      if (!nowModal.props.isLoading) {
        newStack.push(nowModal);
      }
    }
    modalStack = newStack;
    setRenderStack(newStack);
  };

  const isLoading = () => {
    for (let i = 0; i < modalStack.length; i++) {
      const nowModal = modalStack[i];
      if (nowModal.props.isLoading) {
        return true;
      }
    }
    return false;
  };

  const popLoading = () => {
    const newStack = [];
    let isPoped = false;
    for (let i = modalStack.length - 1; i >= 0; i--) {
      const nowModal = modalStack[i];
      if (!nowModal.props.isLoading || isPoped) {
        newStack.push(nowModal);
      } else {
        isPoped = true;
      }
    }
    modalStack = newStack;
    setRenderStack(newStack);
  };

  const pop = () => {
    modalStack = modalStack.slice(0, -1);
    setRenderStack([...modalStack]);
  };

  const value = {
    isOpen,
    custom,
    alert,
    close,
    pop,
    loading,
    closeLoading,
    popLoading,
    isLoading,
  };
  return (
    <Provider value={value}>
      {children}
      {useMemo(() => {
        if (!isOpen) return null;

        return renderStack.map((modal, idx) => {
          if (idx !== renderStack.length - 1) return null;
          return createPortal(
            <Modal
              opacity={modal.props.opacity}
              align={modal.props.align}
              closeHandler={() => {
                if (modal.props.onClickBack) modal.props.onClickBack();
              }}>
              {modal}
            </Modal>,
            document.getElementById("modal-root"),
          );
        });
      })}
    </Provider>
  );
};

export default ModalContext;
export {ModalProvider};
