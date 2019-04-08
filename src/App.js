import React, { Component } from "react";
import Home from "./pages/home/home";
import { withRouter } from "react-router-dom";
import Route from "./router";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFullSreen:false
		};
	}

	componentWillMount(){
		if(window.location.pathname.indexOf("newWindow")!== -1){
			this.setState({isFullSreen:true});
		}
	}

	renderDom=()=>{
		if(this.state.isFullSreen){
			return <Route/>;
		}else{
			return <Home/>;
		}
	}

	render() {
		return this.renderDom();
	}
}

export default withRouter(App);
