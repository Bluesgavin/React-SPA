import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import CloseTab from "../closeTab/closeTab";
import "./openTab.css";
import {Button} from "antd";
import appPulgIn from "../../components/appPlugIn/appPlugIn";
import ReactMarkdown from "react-markdown";


const getList = state => {
	return {
		state: state
	};
};


class openTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullVisible: false
		};
	}

    open=(data)=>{
    	this.props.app.open(data);
    };

    notifica = () => {
    	this.props.app.alert({
    		title: "标题",
    		text: "内容"
    	});
    };

    ModalOk = () => {
    	this.setState({fullVisible: false});
    };

    ModalCancel = () => {
    	this.setState({fullVisible: false});
    };

    render() {
    	return (
    		<div className="openTab">
    			<div className="openTab-text">
    				<h2>打开标签页操作</h2>
    			</div>
    			<div>
    				<Button type="primary" onClick={this.open.bind(this,{type: "NORMAL", link: "closeTab", title: "关闭标签页", data: "新标签页打开"})}>新标签页打开</Button>
    				<Button type="primary" onClick={this.open.bind(this,{
    					type: "SUB", link: "closeTab", title: "关闭标签页", content: CloseTab, onOk: function () {
    						console.log("ok");
    					}, data: "子页面打开"
    				})}>子页面打开</Button>
    				<Button type="primary" onClick={this.open.bind(this,{type: "WINDOW", link: "closeTab", title: "关闭标签页", data: "新窗口打开"})}>打开新窗口</Button>
    				<Button type="primary" onClick={this.open.bind(this,{type: "SELF", link: "closeTab", title: "关闭标签页", data: "当前标签页打开"})}>当前标签页打开</Button>
    				<div className="openTab-example">
    					<p>打开页面调用app.open( )。</p>
    					<p>其中属性type为打开标签页的方式，link是页面跳转的路径，title是标签页显示的字样，data是传参。</p>
    					<p>其中当type为SUB时，属性content为窗口内容组件,onOk为确定按钮点击回调</p>
    					<ReactMarkdown source={`
					//新标签页打开	 this.props.app.open({      
								type: "NORMAL",     
								link: "closeTab",      
								title: "关闭标签页",      
								data: "标签页打开"     
							});
						`}/>
    					<ReactMarkdown source={`
					//子页面打开	 this.props.app.open({       
								type: "SUB",     
								link: "closeTab",      
								title: "关闭标签页",      
								data: "子页面打开"     
							});
						`}/>
    					<ReactMarkdown source={`
					//新窗口打开	 this.props.app.open({       
								type: "WINDOW",     
								link: "closeTab",      
								title: "关闭标签页",     
								content: CloseTab,
								onOk: function(){console.log("ok")}    
								data: "新窗口打开"     
							});
						`}/>
    					<ReactMarkdown source={`
					//当前页面打开	 this.props.app.open({      
								type: "SELF",     
								link: "closeTab",      
								title: "关闭标签页",      
								data: "当前标签页打开"     
							});
						`}/>
    				</div>
    			</div>
    			<div className="openTab-text">
    				<h2>动态添加路由</h2>
    			</div>
    			<Button type="primary" onClick={this.open.bind(this,{type: "NORMAL", link: "one", title: "页面一", data:"",component:"components/one/one",name:"one"})}>
                    添加页面一
    			</Button>
    			<Button type="primary" onClick={this.open.bind(this,{type: "SELF", link: "one", title: "页面一", data:"",component:"components/one/one",name:"one"})}>
                    添加页面一(自身打开)
    			</Button>
    			<Button type="primary" onClick={this.open.bind(this,{type: "SUB", link: "one", title: "页面一", data:"",component:"components/one/one",name:"one",onOk: function () {
    				console.log("ok");}})}>
                    添加页面一(窗口打开)
    			</Button>
    			<div className="openTab-example">
    				<p>动态添加路由可以用于打开增量页面或组件</p>
    				<p>用法是在app.open的基础上添加component属性。填写对应加载组件的路径。以及name,对应的是组件的名称。</p>
    				<ReactMarkdown source={`
					//新标签页打开	 this.props.app.open({      
								type: "NORMAL",     
								link: "closeTab",      
								title: "关闭标签页",      
								data: "标签页打开",     
								component:"components/one/one",      
								name:"one"
							});
						`}/>
    				<ReactMarkdown source={`
					//子页面打开	 this.props.app.open({       
								type: "SUB",     
								link: "closeTab",      
								title: "关闭标签页",      
								data: "子页面打开",        
								component:"components/one/one",     
								name:"one"     
							});
						`}/>
    				<ReactMarkdown source={`
					//当前页面打开	 this.props.app.open({      
								type: "SELF",     
								link: "closeTab",      
								title: "关闭标签页",      
								data: "当前标签页打开",      
								component:"components/one/one",     
								name:"one"    
							});
						`}/>
    			</div>
    			<div className="openTab-text">
    				<h2>通知栏</h2>
    			</div>
    			<Button type="primary" onClick={this.notifica}>
                    通知栏
    			</Button>
    			<div className="openTab-example">
    				<p>通知栏调用用app.alert( )。</p>
    				<p>title是通知栏标题字样，text是通知栏内容。</p>
    				<ReactMarkdown source={`
							this.props.app.alert({     
								title: "标题",     
								text: "内容"    
							});
						`}/>
    			</div>
    		</div>
    	);
    }
}

const newOpenTab = appPulgIn(openTab);
export default withRouter(connect(getList)(newOpenTab));
