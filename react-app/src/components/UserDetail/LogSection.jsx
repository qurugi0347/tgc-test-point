import React from "react";
import styled from "styled-components";
import BaseButton from "components/BaseButton";
import LogItem from "features/points/components/LogItem";

const PointLogSection = ({userPointLogs = [], onClickDetail}) => {
  return (
    <>
      <LogSection>
        {userPointLogs.map((userPointLog) => {
          return <LogItem key={userPointLog.id} {...userPointLog} />;
        })}
        {userPointLogs.length === 0 && "포인트 적립, 차감 내역이 없습니다."}
      </LogSection>
      <BaseButton onClick={onClickDetail}>자세히보기</BaseButton>
    </>
  );
};

const LogSection = styled.div`
  margin-top: 10px;
`;

export default PointLogSection;
