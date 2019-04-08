import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input } from "antd";
import appPulgIn from "../../components/appPlugIn/appPlugIn";

const getList = state => {
	return {
		state: state
	};
};


class open extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name:"",
			url:"",
			title:"",
			component:""
		};
	}


	setName=(e)=>{
		this.setState({name:e.target.value});
	}

	setUrl=(e)=>{
		this.setState({url:e.target.value});
	}

	setTitle=(e)=>{
		this.setState({title:e.target.value});
	}

	setComponent=(e)=>{
		this.setState({component:e.target.value});
	}

	confirm=()=>{
		let self =this;
		console.log({
			type: "NORMAL",
			 link: self.state.url, 
			 title: self.state.title, 
			 data:"",
			 component: self.state.component,
			name: self.state.name
		});
		this.props.app.open({
			type: "NORMAL",
			 link: self.state.url, 
			 title: self.state.title, 
			 data:"",
			 component: self.state.component,
			name: self.state.name
		});
		
	}

	render() {
		return (
			<div className="open" >
				<div style={{margin:"0 auto",width:"315px"}}>
					<div className="openTab-text">
    				<h2 style={{textAlign:"center"}}>动态引用</h2>
    			</div>
					<div>
						<p style={{margin:0}}>组件名称</p>
						<Input style={{marginBottom:"10px"}} onChange={this.setName}/>
					</div>
					<div>
						<p style={{margin:0}}>组件路由</p>
						<Input style={{marginBottom:"10px"}} onChange={this.setUrl}/>
					</div>
					<div>
						<p style={{margin:0}}>标签页标题</p>
						<Input style={{marginBottom:"10px"}} onChange={this.setTitle}/>
					</div>
					<div>
						<p style={{margin:0}}>组件路径</p>
						<Input style={{marginBottom:"10px"}} onChange={this.setComponent}/>
					</div>
					<Button type="primary" onClick={this.confirm}>确定</Button>
				</div>
    		</div>
		);
	}
}

export default connect(getList)(appPulgIn(open));