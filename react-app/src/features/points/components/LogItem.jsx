import React, {useMemo} from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const UserItem = ({amount, detail, reason, createdAt, user}) => {
  return (
    <Wrapper>
      <div>{dayjs(createdAt).format("YY-MM-DD hh:mm")}</div>
      <div>
        <span>{amount}</span>
        <span>{reason}</span>
      </div>
      <div>{detail}</div>
      {useMemo(() => {
        if (!user) return null;
        return (
          <UserSection>
            <span>id:{user.id}</span>
            <span>name:{user.name}</span>
          </UserSection>
        );
      }, [user])}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-bottom: 1px solid;
  padding: 8px 16px;
  cursor: pointer;
`;

const UserSection = styled.div`
  *:not(:first-child) {
    margin-left: 4px;
  }
`;

export default UserItem;
