import styled from "styled-components";

const BaseButton = styled.div`
  cursor: pointer;
  border: 1px solid;
  border-radius: 4px;
  padding: 8px 16px;
  &.small {
    padding: 4px 8px;
  }
  text-align: center;
`;

export default BaseButton;
