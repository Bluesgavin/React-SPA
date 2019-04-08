import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import appPlugIn from "../../components/appPlugIn/appPlugIn";
import { Button } from "antd";

const getList = state => {
	return {
		state: state
	};
};
class CloseTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openWay: this.props.openWay
		};
	}


	close = () => {
		this.props.app.close();
	};

	renderParmas=()=>{
		let props = this.props;

		if(props.location.state){
			return props.location.state[1];
		}else if(props.state.pageParams){
			return props.state.pageParams.params;
		}else{
			return localStorage.getItem("windowPage");
		}
	}

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.close}>
					关闭标签页
    			</Button>
				<p>传参：{this.renderParmas()}</p>
			</div>
		);
	}
}

const newCloseTab = appPlugIn(CloseTab);

export default withRouter(connect(getList)(newCloseTab));