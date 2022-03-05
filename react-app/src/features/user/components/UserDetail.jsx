import React, {useEffect, useState, useMemo} from "react";
import styled from "styled-components";
import BaseButton from "components/BaseButton";
import {getUserDetail} from "api/user";
import useModalContext from "hooks/useModalContext";
import dayjs from "dayjs";

const UserDetail = ({id, onClickDetail}) => {
  const modalContext = useModalContext();
  const [userInfo, setUserInfo] = useState(null);
  const [userPointLogs, setUserPointLogs] = useState([]);

  const getData = async () => {
    const res = await getUserDetail(id);
    if (res.status >= 400) {
      modalContext.alert({
        title: "오류",
        description: res.data?.message || `${res.statusText}`,
      });
      return;
    }
    setUserInfo(res.data);
    setUserPointLogs(res.data.userPointLogGroups);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Wrapper>
      <div>
        {id}
        <Close onClick={() => modalContext.close()}>X</Close>
      </div>
      {useMemo(() => {
        if (!userInfo) return <div>로딩중</div>;
        const {name, email, phone, point} = userInfo;
        return (
          <InfoSection>
            <div>보유 포인트:</div>
            <div>{point}P</div>
            <div>이름:</div>
            <div>{name}</div>
            <div>전화번호:</div>
            <div>{phone}</div>
            <div>이메일:</div>
            <div>{email}</div>
          </InfoSection>
        );
      }, [userInfo])}
      {useMemo(() => {
        return (
          <>
            <LogSection>
              {userPointLogs.map((userPointLog) => {
                const {amount, createdAt, reason, detail} = userPointLog;
                return (
                  <LogItem>
                    <div>{dayjs(createdAt).format("YY-MM-DD hh:mm")}</div>
                    <div>
                      <div>{amount}P</div>
                      <div>{reason}</div>
                    </div>
                    <div>{detail}</div>
                  </LogItem>
                );
              })}
              {userPointLogs.length === 0 &&
                "포인트 적립, 차감 내역이 없습니다."}
            </LogSection>
            <BaseButton onClick={onClickDetail}>자세히보기</BaseButton>
          </>
        );
      }, [userPointLogs])}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px 20px;
  background: white;
  width: 400px;
`;

const Close = styled(BaseButton)`
  display: inline-block;
  cursor: pointer;
  padding: 2px 6px;
  float: right;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  border-bottom: 1px solid;
  width: 100%;
`;

const LogSection = styled.div`
  margin-top: 10px;
`;

const LogItem = styled.div`
  border-bottom: 1px solid;
  div * {
    display: inline-block;
    padding: 2px 4px;
  }
`;

export default UserDetail;
