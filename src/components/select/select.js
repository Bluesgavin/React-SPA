import React, { Component } from "react";
import { Select, Cascader } from "antd";

const { Option, OptGroup } = Select;
const options = [{
	value: "zhejiang",
	label: "Zhejiang",
	children: [{
		value: "hangzhou",
		label: "Hangzhou",
		children: [{
			value: "xihu",
			label: "West Lake",
		}],
	}],
}, {
	value: "jiangsu",
	label: "Jiangsu",
	children: [{
		value: "nanjing",
		label: "Nanjing",
		children: [{
			value: "zhonghuamen",
			label: "Zhong Hua Men",
		}],
	}],
}];
class Selecter extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}


	render() {
		return (
			<div className="selecter">
				<h2>选择器</h2>
				<div>
					<div className="content-text">
						<h3>基本用法</h3>
						<p>基本使用</p>
					</div>
					<Select defaultValue="lucy" style={{ width: 120, marginRight: "10px" }} >
						<Option value="jack">Jack</Option>
						<Option value="lucy">Lucy</Option>
						<Option value="disabled" disabled>Disabled</Option>
						<Option value="Yiminghe">yiminghe</Option>
					</Select>
					<Select defaultValue="lucy" style={{ width: 120, marginRight: "10px" }} disabled>
						<Option value="lucy">Lucy</Option>
					</Select>
					<Select defaultValue="lucy" style={{ width: 120 }} loading>
						<Option value="lucy">Lucy</Option>
					</Select>
				</div>
				<div>
					<div className="content-text">
						<h3>带搜索框</h3>
						<p>展开后可对选项进行搜索</p>
					</div>
					<Select
						showSearch
						style={{ width: 200 }}
						placeholder="请选择"
						optionFilterProp="children"
						filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					>
						<Option value="jack">Jack</Option>
						<Option value="lucy">Lucy</Option>
						<Option value="tom">Tom</Option>
					</Select>
				</div>
				<div>
					<div className="content-text">
						<h3>多选</h3>
						<p>从已有条目中选择</p>
					</div>
					<Select
						mode="multiple"
						style={{ width: 250 }}
						placeholder="请选择"
					>
						<Option value="jack">Jack</Option>
						<Option value="lucy">Lucy</Option>
						<Option value="tom">Tom</Option>
					</Select>,
				</div>
				<div>
					<div className="content-text">
						<h3>分组</h3>
						<p>未选项分组</p>
					</div>
					<Select
						defaultValue="lucy"
						style={{ width: 200 }}
					>
						<OptGroup label="Manager">
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
						</OptGroup>
						<OptGroup label="Engineer">
							<Option value="Yiminghe">yiminghe</Option>
						</OptGroup>
					</Select>,
				</div>
				<div>
					<div className="content-text">
						<h3>联动</h3>
						<p>联动选择器</p>
					</div>
					<Cascader style={{ width: 250 }} options={options} placeholder="请选择" />
				</div>
			</div>
		);
	}
}

export default Selecter;
