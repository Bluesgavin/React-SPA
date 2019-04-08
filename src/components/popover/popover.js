import React, { Component } from "react";
import "./popover.css";
import { Popover, Button } from "antd";

const content = (
	<div>
		<p>内容</p>
		<p>内容</p>
	</div>
);

const buttonWidth = 70;

class popover extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
	}
    hide = () => {
    	this.setState({
    		visible: false,
    	});
    }

    handleVisibleChange = (visible) => {
    	this.setState({ visible });
    }

    render() {
    	return (
    		<div className="popover">
    			<h2>气泡卡片</h2>
    			<div className="popover-text">
    				<h3>基本用法</h3>
    				<p>最简单的用法，浮层的大小由内容区域决定。</p>
    			</div>
    			<Popover content={content} title="标题">
    				<Button type="primary">鼠标移入</Button>
    			</Popover>
    			<div>
    				<div className="popover-text">
    					<h3>三种触发方式</h3>
    					<p>鼠标移入、聚集、点击。</p>
    				</div>
    				<Popover content={content} title="标题" trigger="hover">
    					<Button style={{marginRight:"15px"}}>鼠标移入</Button>
    				</Popover>
    				<Popover content={content} title="标题" trigger="focus">
    					<Button style={{marginRight:"15px"}}>鼠标聚集</Button>
    				</Popover>
    				<Popover content={content} title="标题" trigger="click">
    					<Button style={{marginRight:"15px"}}>鼠标点击</Button>
    				</Popover>
    			</div>
    			<div className="position">
    				<div className="popover-text">
    					<h3>位置</h3>
    					<p>位置有十二个方向</p>
    				</div>
    				<div className="position-content">
    					<div style={{ marginLeft: buttonWidth, whiteSpace: "nowrap" }}>
    						<Popover placement="topLeft" title="标题" content={content} trigger="click">
    							<Button>上左</Button>
    						</Popover>
    						<Popover placement="top" title="标题" content={content} trigger="click">
    							<Button>上</Button>
    						</Popover>
    						<Popover placement="topRight" title="标题" content={content} trigger="click">
    							<Button>上右</Button>
    						</Popover>
    					</div>
    					<div style={{ width: buttonWidth, float: "left" }}>
    						<Popover placement="leftTop" title="标题" content={content} trigger="click">
    							<Button>左上</Button>
    						</Popover>
    						<Popover placement="left" title="标题" content={content} trigger="click">
    							<Button>左</Button>
    						</Popover>
    						<Popover placement="leftBottom" title="标题" content={content} trigger="click">
    							<Button>左下</Button>
    						</Popover>
    					</div>
    					<div style={{ width: buttonWidth, marginLeft: (buttonWidth * 4) + 24 }}>
    						<Popover placement="rightTop" title="标题" content={content} trigger="click">
    							<Button>右上</Button>
    						</Popover>
    						<Popover placement="right" title="标题" content={content} trigger="click">
    							<Button>右</Button>
    						</Popover>
    						<Popover placement="rightBottom" title="标题" content={content} trigger="click">
    							<Button>右下</Button>
    						</Popover>
    					</div>
    					<div style={{ marginLeft: buttonWidth, clear: "both", whiteSpace: "nowrap" }}>
    						<Popover placement="bottomLeft" title="标题" content={content} trigger="click">
    							<Button>下左</Button>
    						</Popover>
    						<Popover placement="bottom" title="标题" content={content} trigger="click">
    							<Button>下</Button>
    						</Popover>
    						<Popover placement="bottomRight" title="标题" content={content} trigger="click">
    							<Button>下右</Button>
    						</Popover>
    					</div>
    				</div>
    			</div>
    			<div className="closeInside">
    				<div className="popover-text">
    					<h3>从浮层内关闭</h3>
    					<p>使用 visible 属性控制浮层显示。</p>
    				</div>
    				<Popover
    					content={<span onClick={this.hide} style={{cursor:"pointer",color:"#1890ff"}}>Close</span>}
    					title="标题"
    					trigger="click"
    					visible={this.state.visible}
    					onVisibleChange={this.handleVisibleChange}
    				>
    					<Button type="primary">点击</Button>
    				</Popover>
    			</div>
    		</div>
    	);
    }
}

export default popover;
