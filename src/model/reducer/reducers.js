export default (state, action) => {
	switch (action.type) {
	case "ADD_TAB":
		var ntabs = state.tabs;
		ntabs.push(action.tabs);
		return {
			...state,
			tabs: ntabs,
			activeTab: action.activeTab,
			newTabIndex: ++state.newTabIndex
		};
	case "REFRESH_TAB":
		return {
			...state,
			tabs: action.tabs
		};
	case "SET_ACTIVE":
		return {
			...state,
			activeTab: action.activeTab
		};
	case "SHOW_MENU":
		return {
			...state,
			nowMenu: action.nowMenu
		};
	case "ADD_HERF":
		return {
			...state,
			herf: [],
		};
	case "OPEN_PAGE":
		var tempParams = state;
		switch (action.openWay) {
		case "SUB":
			tempParams.pageParams = {openWay: "sub", params: action.params, Modal: action.Modal};
			break;
		default:
			break;
		}
		tempParams.openWay = action.openWay;
		return tempParams;
	case "SET_CURRENT_PAGE":
		return {
			...state,
			currentPage: action.currentPage,
		};
	case "SET_ROUTER":
		return {
			...state,
			routerList: action.routerList
		};
	default:
		return state;
	}
};