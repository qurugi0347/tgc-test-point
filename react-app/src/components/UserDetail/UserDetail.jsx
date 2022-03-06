import React, {useEffect, useState, useMemo} from "react";
import styled from "styled-components";
import BaseButton from "components/BaseButton";
import LogItem from "features/points/components/LogItem";
import {getUserDetail} from "api/user";
import useModalContext from "hooks/useModalContext";
import useTab from "hooks/useTab";
import PointLogSection from "./LogSection";
import ModifyPoint from "./ModifyPoint";

const UserDetail = ({id, onClickDetail, onClickModify}) => {
  const modalContext = useModalContext();
  const [userInfo, setUserInfo] = useState(null);
  const [userPointLogs, setUserPointLogs] = useState([]);

  const {selectedTab, tabComponent} = useTab({
    tabs: [{name: "최근 로그"}, {name: "포인트 수정"}],
  });

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

  const recentLogs = useMemo(() => {
    return (
      <PointLogSection
        userPointLogs={userPointLogs}
        onClickDetail={onClickDetail}
      />
    );
  }, [userPointLogs, onClickDetail]);

  const modifyPointComponent = useMemo(() => {
    return <ModifyPoint {...userInfo} />;
  }, [userInfo]);

  const renderContent = useMemo(() => {
    switch (selectedTab) {
      case 0:
        return recentLogs;
      case 1:
        return modifyPointComponent;
    }
    return null;
  }, [recentLogs, modifyPointComponent, selectedTab]);

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
      {tabComponent}
      {renderContent}
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

export default UserDetail;
