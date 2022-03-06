import React from "react";
import styled from "styled-components";
import UserItem from "./UserItem";

const UserList = ({userData = []}) => {
  return (
    <Wrapper>
      {userData.map((userInfo) => {
        return <UserItem key={userInfo.id} {...userInfo} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: scroll;
  height: -webkit-fill-available;
`;

export default UserList;
