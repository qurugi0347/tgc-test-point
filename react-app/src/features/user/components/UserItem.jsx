import React from "react";
import styled from "styled-components";
import useModalContext from "hooks/useModalContext";
import UserDetail from "./UserDetail";
import {useNavigate} from "react-router-dom";

const UserItem = ({id, name, email, phone}) => {
  const navigate = useNavigate();
  const modalContext = useModalContext();
  return (
    <Wrapper
      onClick={() => {
        modalContext.custom(
          <UserDetail
            id={id}
            onClickDetail={() => {
              modalContext.close();
              navigate({
                pathname: `/points/`,
                search: `?userId=${id}`,
              });
            }}
          />,
        );
      }}>
      <div>{name}</div>
      <div>
        <span>{email}</span>
        {` | `}
        <span>{phone}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-bottom: 1px solid;
  padding: 8px 16px;
  cursor: pointer;
`;

export default UserItem;
