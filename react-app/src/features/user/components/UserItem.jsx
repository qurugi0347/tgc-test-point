import React from "react";
import styled from "styled-components";

const UserItem = ({id, name, email, phone, onClickItem}) => {
  return (
    <Wrapper
      onClick={() => {
        if (onClickItem) onClickItem(id);
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
