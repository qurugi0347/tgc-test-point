import React, {useCallback} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const menus = [
  {name: "유저", url: "/user"},
  {name: "설정", url: "/setting"},
];

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {menus.map((menu) => {
        return (
          <MenuItem key={menu.url} onClick={() => navigate(menu.url)}>
            {menu.name}
          </MenuItem>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  background: #dddddd;
  border-right: 1px solid;
`;

const MenuItem = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid;
  background: white;
`;

export default Menu;
