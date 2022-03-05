import {useContext} from "react";
import ModalContext from "contexts/modal";

const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  return modalContext;
};

export default useModalContext;
