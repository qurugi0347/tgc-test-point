import React from "react";
import styled from "styled-components";
import UserItem from "./UserItem";

const UserList = ({userData = [], onClickItem}) => {
  return (
    <Wrapper>
      {userData.map((userInfo) => {
        return (
          <UserItem key={userInfo.id} {...userInfo} onClickItem={onClickItem} />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: scroll;
  height: -webkit-fill-available;
`;

export default UserList;
