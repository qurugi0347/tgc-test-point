import {useState, useMemo} from "react";
import styled from "styled-components";

const useTab = ({defaultSelected, tabs = []}) => {
  const [selectedTab, setTab] = useState(defaultSelected ?? 0);
  const tabComponent = useMemo(() => {
    return (
      <TabWrapper>
        {tabs.map((tabInfo, idx) => {
          return (
            <TabButton
              key={idx}
              className={idx === selectedTab ? "active" : ""}
              onClick={() => setTab(idx)}>
              {tabInfo.name}
            </TabButton>
          );
        })}
      </TabWrapper>
    );
  }, [tabs, selectedTab]);

  return {selectedTab, setTab, tabComponent};
};

const TabWrapper = styled.div`
  width: 100%;
  background: white;
  display: grid;
  grid-template-columns: repeat(${({children}) => children.length}, 1fr);
`;

const TabButton = styled.div`
  display: inline-block;
  text-align: center;
  padding: 4px 16px;
  font-weight: 700;
  &:not(.active) {
    color: gray;
  }
`;

export default useTab;
