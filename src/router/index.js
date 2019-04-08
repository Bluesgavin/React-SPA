import React,{  lazy, Suspense,Component }  from "react";
import { Route, Switch } from "react-router-dom";
import { Spin } from "antd";
import { connect } from "react-redux";
import {setRouter} from "../model/action/action";
import config from "../config";

const getList = state => {
	return {
		state: state
	};
};

const Loading = ()=>{
	return(
		<div className="loading">
			<Spin tip="加载中..." style={{height:"100%",width:"100%"}}>
				<div style={{height:"100%"}}></div>
			</Spin>
		</div>
	);
};
const LoadingComponent=(Component)=>{
	return props=>(
		<Suspense fallback={Loading()}>
			<Component {...props}/>
		</Suspense>
	);
};

class  BasicRoute extends Component{
	constructor(props){
		super(props);
		this.state={
			
		};
	}

	componentWillMount(){
		let self = this;
		self.props.dispatch(setRouter(self.getRouterList(config.router)));
	}

	getRouterList=(list)=>{
		return list.map(item=>{
			return{
				url:item.url,
				component:lazy(() => import(`../${item.path}`))
			};
			
		});
	};

	render(){
		return(
			<Switch>
				{this.props.state.routerList.map((item,index)=><Route exact path={item.url} component={LoadingComponent(item.component)} key={index}/>)}
			</Switch>
		);
	}
}
	

export default connect(getList)(BasicRoute);
