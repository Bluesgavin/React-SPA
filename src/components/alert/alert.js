import React, { Component } from "react";
import "./alert.css";
import { Alert } from "antd";

class alert extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
    onClose = (e) => {
    	console.log(e, "I was closed.");
    };

    render() {
    	return (
    		<div className="alert">
    			<h2>警告提示</h2>
    			<div>
    				<div className="alert-text">
    					<h3>四种样式</h3>
    					<p>共有四种样式 success、info、warning、error。</p>
    				</div>
    				<div className="alert-content">
    					<Alert message="Success Text" type="success" />
    					<Alert message="Info Text" type="info" />
    					<Alert message="Warning Text" type="warning" />
    					<Alert message="Error Text" type="error" />
    				</div>
    			</div>
    			<div>
    				<div className="alert-text">
    					<h3>可关闭的警告提示</h3>
    					<p>显示关闭按钮，点击可关闭警告提示。</p>
    				</div>
    				<div className="alert-content">
    					<Alert
    						message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
    						type="warning"
    						closable
    						onClose={this.onClose}
    					/>
    					<Alert
    						message="Error Text"
    						description="Error Description Error Description Error Description Error Description Error Description Error Description"
    						type="error"
    						closable
    						onClose={this.onClose}
    					/>
    				</div>
    			</div>
    			<div>
    				<div className="alert-text">
    					<h3>图标</h3>
    					<p>可口的图标让信息类型更加醒目。另含有辅助性文字介绍</p>
    				</div>
    				<div className="alert-content">
    					<Alert message="Success Tips" type="success" showIcon />
    					<Alert message="Informational Notes" type="info" showIcon />
    					<Alert message="Warning" type="warning" showIcon />
    					<Alert message="Error" type="error" showIcon />
    					<Alert
    						message="Success Tips"
    						description="Detailed description and advices about successful copywriting."
    						type="success"
    						showIcon
    					/>
    					<Alert
    						message="Informational Notes"
    						description="Additional description and informations about copywriting."
    						type="info"
    						showIcon
    					/>
    					<Alert
    						message="Warning"
    						description="This is a warning notice about copywriting."
    						type="warning"
    						showIcon
    					/>
    					<Alert
    						message="Error"
    						description="This is an error message about copywriting."
    						type="error"
    						showIcon
    					/>
    				</div>
    			</div>
    		</div>
    	);
    }
}

export default alert;
