import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes"; 
import './i18next';

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
