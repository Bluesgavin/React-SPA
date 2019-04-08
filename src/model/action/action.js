const addTab = (tab, activeTab) => {
	return {
		type: "ADD_TAB",
		tabs: tab,
		activeTab: activeTab,
	};
};
const refreshTab = (tab) => {
	return {
		type: "REFRESH_TAB",
		tabs: tab,
	};
};
const setActive = (activeTab) => {
	return {
		type: "SET_ACTIVE",
		activeTab: activeTab
	};
};
const openPage = (openWay, data, Modal) => {
	return {
		type: "OPEN_PAGE",
		openWay: openWay,
		params: data,
		Modal: Modal
	};
};
const setCurrentPage = (pageID) => {
	return {
		type: "SET_CURRENT_PAGE",
		currentPage: pageID
	};
};
const setRouter = (routerList) => {
	return {
		type: "SET_ROUTER",
		routerList: routerList
	};
};


export {addTab, refreshTab, setActive, openPage, setCurrentPage, setRouter};
