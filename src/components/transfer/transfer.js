import React, { Component } from "react";
import { Transfer, Switch } from "antd";

const mockData = [];
for (let i = 0; i < 20; i++) {
	mockData.push({
		key: i.toString(),
		title: `content${i + 1}`,
		description: `description of content${i + 1}`,
		disabled: i % 3 < 1,
	});
}

const oriTargetKeys = mockData
	.filter(item => +item.key % 3 > 1)
	.map(item => item.key);

class cTransfer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			targetKeys: oriTargetKeys,
			selectedKeys: [],
			disabled: false,
			mockData: [],
			mockData2:[],
			targetKeys2:[]
		};
	}

	componentDidMount() {
		this.getMock();
	}

	getMock = () => {
		const targetKeys2 = [];
		const mockData2 = [];
		for (let i = 0; i < 20; i++) {
			const data = {
				key: i.toString(),
				title: `content${i + 1}`,
				description: `description of content${i + 1}`,
				chosen: Math.random() * 2 > 1,
			};
			if (data.chosen) {
				targetKeys2.push(data.key);
			}
			mockData2.push(data);
		}
		this.setState({ mockData2, targetKeys2 });
	}

	filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

	handleChange = (nextTargetKeys, direction, moveKeys) => {
		this.setState({ targetKeys: nextTargetKeys });

		console.log("targetKeys: ", nextTargetKeys);
		console.log("direction: ", direction);
		console.log("moveKeys: ", moveKeys);
	}

	handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
		this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

		console.log("sourceSelectedKeys: ", sourceSelectedKeys);
		console.log("targetSelectedKeys: ", targetSelectedKeys);
	}

	handleScroll = (direction, e) => {
		console.log("direction:", direction);
		console.log("target:", e.target);
	}

	handleDisable = (disabled) => {
		this.setState({ disabled });
	};
	handleSearch = (dir, value) => {
		console.log("search:", dir, value);
	}
	handleChange2=(targetKeys2)=>{
		this.setState({ targetKeys2 });
	}

	render() {
		const { targetKeys, selectedKeys, disabled,targetKeys2,mockData2 } = this.state;
		return (
			<div className="transfer">
				<h2>穿梭框</h2>
				<div>
					<div className="content-text">
						<h3>基本用法</h3>
						<p>基本用法，可以禁用指定选项</p>
					</div>
					<Transfer
						dataSource={mockData}
						titles={["数据源", "目标"]}
						targetKeys={targetKeys}
						selectedKeys={selectedKeys}
						onChange={this.handleChange}
						onSelectChange={this.handleSelectChange}
						onScroll={this.handleScroll}
						render={item => item.title}
						disabled={disabled}
					/>
					<Switch
						unCheckedChildren="禁用"
						checkedChildren="开启"
						checked={disabled}
						onChange={this.handleDisable}
						style={{ marginTop: 16 }}
					/>
				</div>
				<div>
					<div className="content-text">
						<h3>带搜索框</h3>
						<p>带搜索框的穿梭框</p>
					</div>
					<Transfer
						dataSource={mockData2}
						showSearch
						filterOption={this.filterOption}
						targetKeys={targetKeys2}
						onChange={this.handleChange2}
						onSearch={this.handleSearch}
						render={item => item.title}
					/>
				</div>
			</div>
		);
	}
}

export default cTransfer;
