import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Tabs, Dropdown } from "antd";
import Router from "../../router/index";
import "./home.css";
import "antd/dist/antd.less";
import { withRouter } from "react-router-dom";
import { addTab, refreshTab, setActive, setCurrentPage } from "../../model/action/action";
import axios from "axios";

axios.defaults.withCredentials = true;

const { SubMenu } = Menu,
	{ Header, Content, Sider } = Layout,
	TabPane = Tabs.TabPane,
	getList = state => {
		return {
			state: state
		};
	};
	// menuList = [
	// 	{
	// 		key: "sub1",
	// 		icon: "table",
	// 		text: "组件",
	// 		item: [
	// 			{ key: "table", tab: "表格", link: "table", text: "表格", id: "table" },
	// 			{ key: "openmodal", tab: "对话框", link: "openmodal", text: "对话框" },
	// 			{ key: "popover", tab: "气泡卡片", link: "popover", text: "气泡卡片" },
	// 			{ key: "alert", tab: "警告提示", link: "alert", text: "警告提示" },
	// 			{ key: "checkbox", tab: "多选框", link: "checkbox", text: "多选框" },
	// 			{ key: "selecter", tab: "选择器", link: "selecter", text: "选择器" },
	// 			{ key: "transfer", tab: "穿梭框", link: "transfer", text: "穿梭框" },
	// 		]
	// 	},
	// 	{
	// 		key: "sub2",
	// 		icon: "credit-card",
	// 		text: "页面",
	// 		item: [
	// 			{ key: "openTab", tab: "app接口", link: "openTab", text: "app接口" },
	// 		]
	// 	}];


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuList: [],
			showRouter: true
		};
	}

	componentDidMount(){
		let self = this;
		this.props.history.listen( (location,action) => {
			let self=this;
			setTimeout(function(){
				let path = location.pathname.substr(1),
					props = self.props,
					tab = props.state.tabs.filter((item, index) => {
						if (location.hash) {
							if(item.link.pathname===path&&item.link.hash===location.hash.substr(1)) return item;
						} else {
							if(item.link.pathname===path) return item;
						}
						return null;
					});
				if(tab[0]){
					props.dispatch(setActive(tab[0].key.toString()));
				}
			},100);

		} );

		axios.post("/getMenu", "").then(response => {
			if (response.status===200) {
				self.setState({menuList:response.data});
			}
		});
	}

	addTab = (e) => {
		let tabindex = this.props.state.newTabIndex,
			props = this.props,
			tabs = { title: e.item.props.tab, key: tabindex, link: { pathname: e.item.props.link }, id: e.item.props.key },
			isHave = false, havingtab;

		if (props.state.tabs.length) {
			props.state.tabs.map((item, index) => {
				if (item.link.pathname === e.item.props.link) { isHave = true; havingtab = item; }
				return null;
			});
			if (!isHave) {
				props.history.push(e.item.props.link);
				props.dispatch(addTab(tabs, tabindex.toString()));
				isHave = false;
			} else {
				props.history.push(havingtab.link);
			}
		} else {
			props.history.push(e.item.props.link);
			props.dispatch(addTab(tabs, tabindex.toString()));
		}
	};

	removeTab = (e) => {
		let tabs = this.props.state.tabs,
			props = this.props,
			ntab;

		tabs = tabs.filter(item => item.key !== parseInt(e));
		props.dispatch(refreshTab(tabs));
		if (!tabs.length) {
			props.history.replace("/");
		} else if (props.state.activeTab === e) {
			ntab = tabs[tabs.length - 1];
			props.history.push(ntab.link);
			props.dispatch(setCurrentPage(ntab.id));
		}
	};

	clickTab = (index, e) => {
		let props = this.props,
			tab = props.state.tabs.filter(item => item.key.toString() === index)[0];

		props.history.push(tab.link);
		props.dispatch(setCurrentPage(tab.id));
	};

	showMenu = (e) => {
		this.props.dispatch({ type: "SHOW_MENU", nowMenu: e });
	};

	CloseThisMenu = (e) => {
		let tabs = this.props.state.tabs,
			props = this.props,
			index = this.props.state.nowMenu.key,
			ntab;

		tabs = tabs.filter(item => item.key !== parseInt(index));
		props.dispatch(refreshTab(tabs));
		if (!tabs.length) {
			props.history.replace("/");
		} else if (props.state.activeTab === index.toString()) {
			ntab = tabs[tabs.length - 1];
			props.history.push(ntab.link);
			props.dispatch(setCurrentPage(ntab.id));
		}
		e.stopPropagation();
	};

	closeOtherMenu = (e) => {
		let state = this.props.state,
			props = this.props,
			newTab = state.tabs.filter(item => item.key === state.nowMenu.key);

		this.props.dispatch(refreshTab(newTab));
		if (state.nowMenu.key.toString() !== props.activeKey) {
			props.dispatch(setCurrentPage(state.nowMenu.id));
		}
	};

	closeAllMenu = (e) => {
		this.props.dispatch(refreshTab([]));
		this.props.history.replace("/");
		e.stopPropagation();
	};

	refreshMenu = (e) => {
		this.props.history.replace("/");
		let timer = setInterval(() => {
			this.props.history.replace(this.props.state.nowMenu.link);
			clearInterval(timer);
		}, 150);
		e.stopPropagation();
	};


	menu = (
		<Menu>
			<Menu.Item key="1">
				<div onClick={this.CloseThisMenu}>关闭此窗口</div>
			</Menu.Item>
			<Menu.Item key="2">
				<div onClick={this.closeOtherMenu}>关闭其他窗口</div>
			</Menu.Item>
			<Menu.Item key="3">
				<div onClick={this.closeAllMenu}>关闭所有窗口</div>
			</Menu.Item>
		</Menu>
	);

	activeMenu = (
		<Menu>
			<Menu.Item key="1">
				<div onClick={this.CloseThisMenu}>关闭此窗口</div>
			</Menu.Item>
			<Menu.Item key="2">
				<div onClick={this.closeOtherMenu}>关闭其他窗口</div>
			</Menu.Item>
			<Menu.Item key="3">
				<div onClick={this.closeAllMenu}>关闭所有窗口</div>
			</Menu.Item>
			<Menu.Item key="4">
				<div onClick={this.refreshMenu}>刷新</div>
			</Menu.Item>
		</Menu>
	)

	render() {
		return (
			<Layout className="App">
				<Header className="header" style={{height:"70px",boxShadow:"0 1px 6px rgba(0,0,0,0.25)"}}>
					赞同科技
				</Header>
				<Layout>
					<Sider width={200} style={{ background: "#fff" }}>
						<Menu
							mode="inline"
							defaultSelectedKeys={["1"]}
							defaultOpenKeys={["sub1"]}
							style={{ height: "100%", borderRight: 0 }}
							theme="dark"
						>
							{this.state.menuList.map((item, index) => {
								let subMenu = item.item.map((subItem) => <Menu.Item key={subItem.key}
									className="sideMenu"
									onClick={this.addTab}
									tab={subItem.tab}
									link={subItem.link}>{
										subItem.text}
								</Menu.Item>);

								return <SubMenu key={item.key} title={<span><Icon
									type={item.icon} />{item.text}</span>}>{subMenu}</SubMenu>;
							})}

						</Menu>
					</Sider>
					<Layout style={{ padding: "10px 24px 24px",backgroundColor:"#f2f2f2" }}>
						<div className="app-tabs">
							<Tabs
								onTabClick={this.clickTab}
								activeKey={this.props.state.activeTab}
								type="editable-card"
								onEdit={this.removeTab}
								hideAdd
							>
								{this.props.state.tabs.map(tab => <TabPane
									tab={<Dropdown overlay={this.props.state.nowMenu.key === parseInt(this.props.state.activeTab) ? this.activeMenu : this.menu} trigger={["contextMenu"]}
										onVisibleChange={this.showMenu.bind(this, tab)}>
										<div className="link-tab" >{tab.title}</div>
									</Dropdown>} key={tab.key} link="/test"></TabPane>)}
							</Tabs>
						</div>
						<Content style={{ background: "#fff", margin: 0,border:"1px solid #ececec",borderRadius:"4px",borderTop:"none" }}>
							<Router></Router>
						</Content>
					</Layout>
				</Layout>
			</Layout>

		);
	}
}

export default withRouter(connect(getList)(Home));
