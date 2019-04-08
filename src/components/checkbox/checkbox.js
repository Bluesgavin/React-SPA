import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox, Button } from "antd";
import { withRouter } from "react-router-dom";

const getList = state => {
	return {
		state: state
	};
};
const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Apple", "Pear", "Orange"];

class checkBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disableChecked: false,
			disabledDisable: false,
			disabledChange: false,
			indeterminate: true,
			checkAll: false,
			checkedList: ["Apple", "Orange"],
			allcheckedList:["Apple"]
		};
	}

	toggleChecked = () => {
		this.setState({ disableChecked: !this.state.disableChecked });
	}

	toggleDisable = () => {
		this.setState({ disabledDisable: !this.state.disabledDisable });
	}

	disabledChange = (e) => {
		this.setState({
			disableChecked: e.target.checked,
		});
	}

	onChange = (checkedValues) => {
		console.log("checked = ", checkedValues);
	}

	onCheckAllChange = (e) => {
		this.setState({
			allcheckedList: e.target.checked ? plainOptions : [],
			indeterminate: false,
			checkAll: e.target.checked,
		});
	}

	allOnChange = (allcheckedList) => {
		this.setState({
			allcheckedList,
			indeterminate: !!allcheckedList.length && (allcheckedList.length < plainOptions.length),
			checkAll: allcheckedList.length === plainOptions.length,
		  });
	}

	render() {

		const label = `${this.state.disableChecked ? "选中" : "未选中"}-${this.state.disabledDisable ? "禁用" : "正常"}`;
		return (
			<div className="checkBox">
				<div className="openModal-text">
					<h2>多选框</h2>
				</div>
				<div>
					<div className="page-text">
						<h3>基本用法</h3>
						<p>简单的 多选框</p>
					</div>
					<Checkbox>多选框</Checkbox>
				</div>
				<div>
					<div className="page-text">
						<h3>不可用</h3>
						<p>联动受控多选框</p>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<Checkbox
							checked={this.state.disableChecked}
							disabled={this.state.disabledDisable}
							onChange={this.disabledChange}
						>
							{label}

						</Checkbox>
					</div>
					<div><Button
						type="primary"
						size="small"
						onClick={this.toggleChecked}
					>
						{!this.state.disableChecked ? "选中" : "未选中"}
					</Button>
					<Button
						style={{ marginLeft: "10px" }}
						type="primary"
						size="small"
						onClick={this.toggleDisable}
					>
						{!this.state.disabledDisable ? "禁用" : "正常"}
					</Button></div>
				</div>
				<div>
					<div className="page-text">
						<h3>多选框组</h3>
						<p>方便的从数组生成 多选框 组</p>
					</div>
					<div>
						<CheckboxGroup options={plainOptions} defaultValue={["Apple"]} onChange={this.onChange} />
					</div>
				</div>
				<div>
					<div className="page-text">
						<h3>全选</h3>
						<p>实现全选多选框组</p>
					</div>
					<div>
						<div style={{ borderBottom: "1px solid #E9E9E9" }}>
							<Checkbox
								indeterminate={this.state.indeterminate}
								onChange={this.onCheckAllChange}
								checked={this.state.checkAll}
							>
								全选
	  						</Checkbox>
						</div>
						<br />
						<CheckboxGroup options={plainOptions} value={this.state.allcheckedList} onChange={this.allOnChange} />
					</div>
				</div>
			</div>

		);
	}
}

export default withRouter(connect(getList)(checkBox));
