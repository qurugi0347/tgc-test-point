import React, {useMemo} from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import useModalContext from "hooks/useModalContext";
import UserDetail from "components/UserDetail/UserDetail";
import {useNavigate} from "react-router-dom";

const UserItem = ({amount, detail, reason, createdAt, user}) => {
  const navigate = useNavigate();
  const modalContext = useModalContext();

  return (
    <Wrapper
      onClick={() => {
        modalContext.custom(
          <UserDetail
            id={user.id}
            onClickDetail={() => {
              modalContext.close();
              navigate({
                pathname: `/points/`,
                search: `?userId=${user.id}`,
              });
            }}
          />,
        );
      }}>
      <div>{dayjs(createdAt).format("YY-MM-DD hh:mm")}</div>
      {useMemo(() => {
        if (!user) return null;
        return (
          <UserSection>
            <span>id:{user.id}</span>
            <span>name:{user.name}</span>
          </UserSection>
        );
      }, [user])}
      <PointInfo>
        <span>{Math.abs(amount)}P</span>
        <span>{amount > 0 ? "부여" : "차감"}</span>
      </PointInfo>
      <Reason>{reason}</Reason>
      {detail && <Reason>{detail}</Reason>}
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

const PointInfo = styled.div`
  *:not(:first-child) {
    margin-left: 4px;
  }
`;

const Reason = styled.div`
  padding-left: 20px;
`;

export default UserItem;
