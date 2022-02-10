import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./sass/main.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import './i18next';
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback ={(<div> Loading...</div>)}>
    <App />
    </Suspense>
  </Provider>,
  document.getElementById("root"),
);
