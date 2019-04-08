import React from "react";
import ReactDOM from "react-dom";
import { Provider} from "react-redux";
import {HashRouter } from "react-router-dom";
import App from "./App";
import store from "./model/store/store";
import zhCN from "antd/lib/locale-provider/zh_CN";
import {LocaleProvider} from "antd";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Provider store={store}><HashRouter><LocaleProvider locale={zhCN}><App /></LocaleProvider></HashRouter></Provider>, document.getElementById("root"));

serviceWorker.register();