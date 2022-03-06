import React, {useEffect, useState, useMemo} from "react";
import styled from "styled-components";
import BaseButton from "components/BaseButton";
import LogItem from "features/points/components/LogItem";
import {getUserDetail} from "api/user";
import useModalContext from "hooks/useModalContext";
import dayjs from "dayjs";

const UserDetail = ({id, onClickDetail, onClickModify}) => {
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
          <>
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

            <BaseButton onClick={() => onClickModify(userInfo)}>
              포인트 수정
            </BaseButton>
          </>
        );
      }, [userInfo])}
      {useMemo(() => {
        return (
          <>
            <div>최근 로그</div>
            <LogSection>
              {userPointLogs.map((userPointLog) => {
                return <LogItem key={userPointLog.id} {...userPointLog} />;
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

export default UserDetail;
