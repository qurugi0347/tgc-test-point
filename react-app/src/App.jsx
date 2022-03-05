import React from "react";
import {Routes, Route} from "react-router-dom";
import MainPage from "./features/main/MainPage";
import UserPage from "features/user/UserPage";
import E404 from "./features/common/E404";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="*" element={<E404 />} />
    </Routes>
  );
};

export default App;
