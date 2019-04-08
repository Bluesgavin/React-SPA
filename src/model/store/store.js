import {createStore} from "redux";
import reducer from "../reducer/reducers";
const initValue={
	tabs: [],
	activeTab: "1",
	newTabIndex: 0,
	nowMenu:{},
	herf:[],
	openWay:"",
	currentPage:"",
	pageParams:"",
	routerList:[]
};
const store=createStore(reducer,initValue);
export default store;