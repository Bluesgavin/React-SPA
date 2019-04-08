import React, { Component } from "react";
import { Table, Divider, Tag, message } from "antd";
import { data1, data2, data3 } from "../../util";
import reqwest from "reqwest";
import "./tableList.css"

const { Column, ColumnGroup } = Table;
const columns = [{
	title: "Name",
	dataIndex: "name",
	sorter: true,
	render: name => `${name.first} ${name.last}`,
	width: "20%",
}, {
	title: "Gender",
	dataIndex: "gender",
	filters: [
		{ text: "Male", value: "male" },
		{ text: "Female", value: "female" },
	],
	width: "20%",
}, {
	title: "Email",
	dataIndex: "email",
}];

class TableList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: data1,
			data2: data1,
			columns: [
				{
					title: "姓名",
					dataIndex: "name",
					key: "name",
				}, {
					title: "年龄",
					dataIndex: "age",
					key: "age",
				}, {
					title: "地址",
					dataIndex: "address",
					key: "address",
				}, {
					title: "标签",
					key: "tags",
					dataIndex: "tags",
					render: tags => (
						<span>
							{tags.map(tag => {
								let color = tag.length < 2 ? "geekblue" : "green";
								if (tag === "欠佳") {
									color = "volcano";
								}
								return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
							})}
						</span>
					),
				}, {
					title: "操作",
					key: "action",
					render: (text, record) => (
						<span>
							<span className="tableList-btn" onClick={this.info.bind(this, record.name)}>邀请 {record.name}</span>
							<Divider type="vertical" />
							<span className="tableList-btn" onClick={this.delectItem.bind(this, record, "data1")}>删除</span>
						</span>
					),
				}
			],
			columns3: [
				{ title: "姓名", dataIndex: "name", key: "name" },
				{ title: "年龄", dataIndex: "age", key: "age" },
				{ title: "地址", dataIndex: "address", key: "address" },
				{
					title: "操作", dataIndex: "", key: "x", render: (text, record) => <span className="tableList-btn" onClick={this.delectItem.bind(this, record, "data3")}>删除</span>,
				},
			],
			data3: data2,
			columns4: [{
				title: "姓名",
				dataIndex: "name",
				filters: [{
					text: "张三",
					value: "张三",
				}, {
					text: "李四",
					value: "李四",
				}, {
					text: "更多",
					value: "更多",
					children: [{
						text: "王五",
						value: "王五",
					}, {
						text: "赵六",
						value: "赵六",
					}],
				}],
				onFilter: (value, record) => record.name.indexOf(value) === 0,
				sorter: (a, b) => a.name.length - b.name.length,
				sortDirections: ["descend"],
			}, {
				title: "年龄",
				dataIndex: "age",
				defaultSortOrder: "descend",
				sorter: (a, b) => a.age - b.age,
			}, {
				title: "地址",
				dataIndex: "address",
				filters: [{
					text: "西湖区",
					value: "西湖区",
				}, {
					text: "东部区",
					value: "东部区",
				}],
				filterMultiple: false,
				onFilter: (value, record) => record.address.indexOf(value) === 0,
				sorter: (a, b) => a.address.length - b.address.length,
				sortDirections: ["descend", "ascend"],
			}],
			data4: data3,
			data5:null

		};
	}

	componentDidMount() {
		this.fetch();
	}

	delectItem = (target, li) => {
		let data, ndata;
		switch (li) {
		case "data1":
			data = this.state.data;
			ndata = data.filter((item, index) => {
				if (item.key !== target.key) return item;
				return null;
			});
			this.setState({ data: ndata });
			break;
		case "data2":
			data = this.state.data2;
			ndata = data.filter((item, index) => {
				if (item.key !== target.key) return item;
				return null;
			});
			this.setState({ data2: ndata });
			break;
		case "data3":
			data = this.state.data3;
			ndata = data.filter((item, index) => {
				if (item.key !== target.key) return item;
				return null;
			});
			this.setState({ data3: ndata });
			break;
		default:
			break;
		}
	}

	info = (value) => {
		message.info(`邀请${value}`, 1);
	}

	handleTableChange = (pagination, filters, sorter,currentData) => {
		console.log("分页操作：",pagination);
		console.log("筛选操作：",filters);
		console.log("排序操作：",sorter);
		console.log("当前数据：",currentData);
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		});
		this.fetch({
			results: pagination.pageSize,
			page: pagination.current,
			sortField: sorter.field,
			sortOrder: sorter.order,
			...filters,
		});
	}

	fetch = (params = {}) => {
		this.setState({ loading: true });
		reqwest({
			url: "https://randomuser.me/api",
			method: "get",
			data: {
				results: 10,
				...params,
			},
			type: "json",
		}).then((data) => {
			const pagination = { ...this.state.pagination };
			// Read total count from server
			// pagination.total = data.totalCount;
			pagination.total = 200;
			this.setState({
				loading: false,
				data5: data.results,
				pagination,
			});
		});
	}


	render() {
		return (
			<div>
				<h2>表格</h2>
				<div>
					<div className="content-text">
						<h3>基本用法</h3>
						<p>简单的表格，最后一列是各种操作。</p>
					</div>
					<Table columns={this.state.columns} dataSource={this.state.data} />
				</div>
				<div>
					<div className="content-text">
						<h3>层级表头</h3>
						<p>可以根据实际需求，实现多层级表头</p>
					</div>
					<Table dataSource={this.state.data2}>
						<ColumnGroup title="姓名">
							<Column
								title="姓"
								dataIndex="firstName"
								key="firstName"
							/>
							<Column
								title="名"
								dataIndex="lastName"
								key="lastName"
							/>
						</ColumnGroup>
						<Column
							title="年龄"
							dataIndex="age"
							key="age"
						/>
						<Column
							title="地址"
							dataIndex="address"
							key="address"
						/>
						<Column
							title="标签"
							dataIndex="tags"
							key="tags"
							render={tags => (
								<span>
									{tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
								</span>
							)}
						/>
						<Column
							title="操作"
							key="action"
							render={(text, record) => (
								<span>
									<span className="tableList-btn" onClick={this.info.bind(this, record.name)}>邀请 {record.name}</span>
									<Divider type="vertical" />
									<span className="tableList-btn" onClick={this.delectItem.bind(this, record, "data2")}>删除</span>
								</span>
							)}
						/>
					</Table>
				</div>
				<div>
					<div className="content-text">
						<h3>内容展开</h3>
						<p>当表格内容较多不能一次性完全展示时，可以把部分内容折叠</p>
					</div>
					<Table
						columns={this.state.columns3}
						expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
						dataSource={this.state.data3}
					/>
				</div>
				<div>
					<div className="content-text">
						<h3>筛选和排序</h3>
						<p>使用受控属性对筛选和排序状态进行控制。</p>
					</div>
					<Table columns={this.state.columns4} dataSource={this.state.data4} />
				</div>
				<div>
					<div className="content-text">
						<h3>后台分页</h3>
						<p>表格组件的onChange属性对应函数在分页、排序、筛选变化时触发。函数自动传入4个参数。分别代表分页，排序，筛选，当前数据，4个动作的内容，并传入后台。返回数据后再渲染会表格。期间用loading属性控制加载遮罩。可以打开控制台查看4项内容。</p>
					</div>
					<Table
						columns={columns}
						rowKey={record => record.login.uuid}
						dataSource={this.state.data5}
						pagination={this.state.pagination}
						loading={this.state.loading}
						onChange={this.handleTableChange}
					/>
				</div>
			</div>
		);
	}
}

export default TableList;
