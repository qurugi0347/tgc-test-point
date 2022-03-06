import React, {useRef} from "react";
import styled from "styled-components";
import useTab from "hooks/useTab";
import BaseButton from "components/BaseButton";
import {putUserPoint} from "api/point";
import useModalContext from "hooks/useModalContext";

const PointLogSection = ({id: userId}) => {
  const {selectedTab, tabComponent} = useTab({
    tabs: [{name: "부여"}, {name: "차감"}],
  });
  const inputRef = useRef();
  const reasonRef = useRef();
  const detailRef = useRef();
  const modalContext = useModalContext();

  const modifyPoint = async () => {
    const modifyValue =
      Number(inputRef.current.value) * (selectedTab === 0 ? 1 : -1);
    modalContext.loading();
    const res = await putUserPoint(userId, {
      amount: modifyValue,
      reason: reasonRef.current.value,
      detail: detailRef.current.value,
    });
    modalContext.popLoading();
    if (res.status >= 400) {
      modalContext.alert({
        title: "오류",
        description: res.data?.message || `${res.statusText}`,
      });
      return;
    }
  };

  return (
    <Wrapper>
      <div>
        <input
          ref={inputRef}
          type="number"
          min="0"
          placeholder="변경할 포인트를 입력해주세요"
          onBlur={(e) => {
            if (0 > Number(e.target.value)) {
              e.target.value = 0;
            }
          }}
        />
        P
      </div>
      <div>
        <input ref={reasonRef} type="text" placeholder="변경 사유" />
        <textarea ref={detailRef} placeholder="상세 내용" />
      </div>
      {tabComponent}
      <BaseButton onClick={modifyPoint}>적용</BaseButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 20px;
`;

export default PointLogSection;
