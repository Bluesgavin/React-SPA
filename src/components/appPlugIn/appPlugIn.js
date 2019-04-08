import React, {Component, lazy} from "react";
import {Modal, notification} from "antd";
import { addTab, refreshTab,setRouter } from "../../model/action/action";
import { openPage } from "../../model/action/action";



const openNotification = (data) => {
	notification.open({
		message: data.message,
		description: data.description,
		style: data.style,
		onClick: () => {
			console.log("Notification Clicked!");
		},
	});
};


const plugins = WrappedComponent => {

	return class AppplugIn extends Component {
		constructor(props) {
			super(props);
			let self = this;
			this.state = {
				...props,
				app: {
					open(data) {
						let props = self.props,
							newTabIndex = props.state.newTabIndex;
						switch (data.type) {
						//子页面打开
						case "SUB":
							if(data.component){
								data.async=true;
								data.content=require(`../../${data.component}`).default;
								self.props.dispatch(openPage("SUB", data.data,self));
								self.setModal(data);
							}else{
								self.props.dispatch(openPage("SUB", data.data,self));
								self.setModal(data);
							}
							break;
							//新窗口打开
						case "WINDOW":
							let location = window.location,
								url = location.origin + "/newWindow#/ReactPSA/" + data.link,
								win;

							self.props.dispatch(openPage("WINDOW"));
							localStorage.setItem("windowPage", JSON.stringify(data.data));
							win = window.open(url, "_blank");
							win.focus();
							break;
							//自身打开
						case "SELF":
							let activeTab = props.state.activeTab,
								tabs = props.state.tabs,
								newTabs;

							if(data.component){
								let routers = props.state.routerList,
									exist=false;
								routers.map(item=>{
									if(item.name===data.name) exist=true;
									return null;
								});
								if(!exist){
									routers.push({url:"/"+data.link,name:data.name,component:lazy(() => import(`../../${data.component}`))});
									props.dispatch(setRouter((routers)));
								}
								console.log(routers);
							}

							newTabs = tabs.map(item => {
								if (item.key.toString() === activeTab) {
									return { title: data.title, key: item.key, link: { pathname: data.link, state: ["self", data.data] } };
								}
								return item;
							});
							self.props.dispatch(openPage("SELF"));
							props.dispatch(refreshTab(newTabs));
							props.history.push({ pathname: data.link, state: ["self", data.data] });
							props.history.push({ pathname: data.link, state: ["self", data.data] });
							break;
							//新标签页打开
						default:
							if(data.component){
								let routers = props.state.routerList,
									exist=false;
								routers.map(item=>{
									if(item.name===data.name) exist=true;
									return null;
								});
								if(!exist){
									routers.push({url:"/"+data.link,name:data.name,component:lazy(() => import(`../../${data.component}`))});
									props.dispatch(setRouter(routers));
								}
							}
							props.dispatch(addTab({ title: data.title, key: newTabIndex, link: { pathname: data.link, state: ["newTab", data.data], hash: newTabIndex.toString() } }, newTabIndex.toString()));
							props.history.push({ pathname: data.link, state: ["newTab", data.data], hash: newTabIndex.toString() });
							break;
						}
					},
					close() {
						let props = self.props,
							tabs = props.state.tabs,
							activeTab = props.state.activeTab,
							newTabs;

						if (props.location.state) {
							switch (props.location.state[0]) {
							case "self":
								newTabs = tabs.filter(item => item.key.toString() !== activeTab);
								props.dispatch(refreshTab(newTabs));
								props.history.push("/");
								break;
							default:
								newTabs = tabs.filter(item => item.key.toString() !== activeTab);
								props.dispatch(refreshTab(newTabs));
								props.history.goBack();
								break;
							}
						}else if(props.state.pageParams){
							props.state.pageParams.Modal.ModalCancel();
						}
						
					},
					alert(data) {
						openNotification({
							message: data.title,
							description: data.text,
							style: data.style
						});
					}
				},
				modalTitle: "",
				modalContent: "",
				modalShow: false,
				modalOnOk: function () { },
				modalOnCancel: "",
				parmas: ""
			};
		}

		componentWillMount() {
			let openWay = this.props.state.openWay;

			switch (openWay) {
			case "SELF":
				this.setState({ parmas: this.props.state.modalPage });
				break;
			case "SUB":
				this.setState({ parmas: this.props.state.modalPage });
				break;
			default:
				this.setState({ parmas: JSON.parse(localStorage.getItem("windowPage")) });
				// localStorage.removeItem("windowPage");
				break;
			}

		}

		setModal = (data) => {
			console.log(data);
			this.setState({
				modalTitle: data.title,
				modalContent: data.content,
				modalShow: true,
				modalOnOk: data.onOk,
				modalOnCanle: data.onCancel,
				modalAsync:data.async
			});
		};

		ModalOk = () => {

		};

		ModalCancel = () => {
			this.setState({
				modalShow: false
			});
		};

		render() {
			return (
				<div>
					<WrappedComponent app={this.state.app} {...this.props} parmas={this.state.parmas} />
					<Modal
						title={this.state.modalTitle}
						visible={this.state.modalShow}
						onOk={this.state.modalOnOk}
						onCancel={this.ModalCancel}
						width="50%"

					>
						<this.state.modalContent />


					</Modal>
					<div className="sideModal" style={{ "position": "absolute", "right": 0, "top": 0, "bottom": 0, "background": "#fff" }}>
						{/* <SideModalContent/> */}
					</div>
				</div>
			);
		}
	};
};

export default plugins;