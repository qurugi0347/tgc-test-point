import React from "react";
import {Routes, Route} from "react-router-dom";
import MainPage from "./features/main/MainPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};

export default App;
