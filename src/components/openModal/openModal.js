import React, { Component } from "react";
import "./openModal.css";
import { Modal, Button } from "antd";

class openModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			baseVisible: false,
			titleVisible: false,
			customVisible: false,
			nomaskVisible: false,
			fullVisible: false,
			closeVisible: false,
			ModalText: "Content of the modal",
			confirmLoading: false,
		};
	}


	showModal = (e) => {
		this.setState({
			baseVisible: e === "baseVisible" ? true : this.state.baseVisible,
			titleVisible: e === "titleVisible" ? true : this.state.titleVisible,
			customVisible: e === "customVisible" ? true : this.state.customVisible,
			nomaskVisible: e === "nomaskVisible" ? true : this.state.nomaskVisible,
			maskeStyleVisible: e === "maskeStyleVisible" ? true : this.state.maskeStyleVisible,
			fullVisible: e === "fullVisible" ? true : this.state.fullVisible,
			closeVisible: e === "closeVisible" ? true : this.state.closeVisible,
		});
	}

	ModalOk = (e) => {
		switch (e) {
		case "baseVisible":
			this.setState({
				baseVisible: false
			});
			break;
		case "titleVisible":
			this.setState({
				ModalText: "The modal will be closed after two seconds",
				confirmLoading: true,
			});
			setTimeout(() => {
				this.setState({
					titleVisible: false,
					confirmLoading: false,
				});
			}, 700);
			break;
		case "customVisible":
			this.setState({
				customVisible: false
			});
			break;
		case "nomaskVisible":
			this.setState({
				nomaskVisible: false
			});
			break;
		case "maskeStyleVisible":
			this.setState({
				maskeStyleVisible: false
			});
			break;
		case "fullVisible":
			this.setState({
				fullVisible: false
			});
			break;
		case "closeVisible":
			this.setState({
				closeVisible: false
			});
			break;
		default:
			break;
		}
	}

	ModalCancel = (e) => {
		this.setState({
			baseVisible: e === "baseVisible" ? false : this.state.baseVisible,
			titleVisible: e === "titleVisible" ? false : this.state.titleVisible,
			customVisible: e === "customVisible" ? false : this.state.customVisible,
			nomaskVisible: e === "nomaskVisible" ? false : this.state.nomaskVisible,
			maskeStyleVisible: e === "maskeStyleVisible" ? false : this.state.maskeStyleVisible,
			fullVisible: e === "fullVisible" ? false : this.state.fullVisible,
			closeVisible: e === "closeVisible" ? false : this.state.closeVisible,
		});
	}

	ModalClose = (e) => {
		if (e === "closeVisible") {
			alert("窗口关闭");
		}

	}

	render() {
		return (
			<div className="openModal">
				<h2>对话框</h2>
				<div className="openModal-text">
					<h3>基本用法</h3>
				</div>
				<Button type="primary" onClick={this.showModal.bind(this, "baseVisible")}>
					基本对话框
    			</Button>
				<Modal
					title="Basic Modal"
					visible={this.state.baseVisible}
					onOk={this.ModalOk.bind(this, "baseVisible")}
					onCancel={this.ModalCancel.bind(this, "baseVisible")}
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal>
				<div>
					<div className="openModal-text">
						<h3>异步关闭</h3>
						<p>点击确定后异步关闭对话框，例如提交表单。</p>
					</div>
					<Button type="primary" onClick={this.showModal.bind(this, "titleVisible")}>
							异步关闭
    				</Button>
					<Modal
						title="Title"
						visible={this.state.titleVisible}
						onOk={this.ModalOk.bind(this, "titleVisible")}
						confirmLoading={this.state.confirmLoading}
						onCancel={this.ModalCancel.bind(this, "titleVisible")}
					>
						<p>{this.state.ModalText}</p>
					</Modal>
				</div>
				<div>
					<div className="openModal-text">
						<h3>自定义位置</h3>
						<p>使用 centered 或类似 style.top 的样式来设置对话框位置。</p>
					</div>
					<Button type="primary" onClick={this.showModal.bind(this, "customVisible")}>距离顶端20px打开</Button>
					<Modal
						title="距离顶端20px"
						style={{ top: 20 }}
						visible={this.state.customVisible}
						onOk={this.ModalOk.bind(this, "customVisible")}
						onCancel={this.ModalCancel.bind(this, "customVisible")}
					>
						<p>内容...</p>
						<p>内容...</p>
						<p>内容...</p>
					</Modal>
				</div>
				<div className="nomask">
					<div className="openModal-text">
						<h3>遮罩层</h3>
						<p>mask属性可以控制是否有遮罩层。</p>
						<p>maskStyle属性可以配置遮罩层样式。</p>
					</div>
					<Button type="primary" onClick={this.showModal.bind(this, "nomaskVisible")}>无遮罩层</Button>
					<Button type="primary" className="openModal-btn" onClick={this.showModal.bind(this, "maskeStyleVisible")}>遮罩层样式</Button>
					<Modal
						title="无遮罩层"
						visible={this.state.nomaskVisible}
						onOk={this.ModalOk.bind(this, "nomaskVisible")}
						onCancel={this.ModalCancel.bind(this, "nomaskVisible")}
						mask={false}
					>
						<p>some contents...</p>
						<p>some contents...</p>
						<p>some contents...</p>
					</Modal>
					<Modal
						title="遮罩层样式"
						visible={this.state.maskeStyleVisible}
						onOk={this.ModalOk.bind(this, "maskeStyleVisible")}
						onCancel={this.ModalCancel.bind(this, "maskeStyleVisible")}
						maskStyle={{ "backgroundColor": "rgba(24,255,167,0.3)" }}
					>
						<p>background-color:rgba(24,255,167,0.3)</p>
					</Modal>
				</div>
				<div className="full">
					<div className="openModal-text">
						<h3>宽度100%</h3>
						<p>通过width参数修改窗口宽</p>
					</div>
					<Button type="primary" onClick={this.showModal.bind(this, "fullVisible")}>
						基本对话框
    				</Button>
					<Modal
						title="宽度100%"
						visible={this.state.fullVisible}
						onOk={this.ModalOk.bind(this, "fullVisible")}
						onCancel={this.ModalCancel.bind(this, "fullVisible")}
						width="100%"

					>
						<p>width:100%</p>

					</Modal>
				</div>
				<div className="close">
					<div className="openModal-text">
						<h3>窗口关闭回调</h3>
						<p>窗口完全关闭后执行函数，</p>
					</div>
					<Button type="primary" onClick={this.showModal.bind(this, "closeVisible")}>
						窗口关闭回调
    				</Button>
					<Modal
						title="Basic Modal"
						visible={this.state.closeVisible}
						onOk={this.ModalOk.bind(this, "closeVisible")}
						onCancel={this.ModalCancel.bind(this, "closeVisible")}
						afterClose={this.ModalClose.bind(this, "closeVisible")}
					>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Modal>
				</div>
			</div>
		);
	}
}

export default openModal;
