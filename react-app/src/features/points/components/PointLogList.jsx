import React from "react";
import styled from "styled-components";
import LogItem from "./LogItem";

const PointLogList = ({logData = []}) => {
  return (
    <Wrapper>
      {logData.map((logInfo) => {
        return <LogItem key={logInfo.id} {...logInfo} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: scroll;
  height: -webkit-fill-available;
`;

export default PointLogList;
