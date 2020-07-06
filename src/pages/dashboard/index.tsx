import React, { Component } from "react";
import { RouteComponentProps, Link, Router } from "@reach/router";
import { Row, Menu, Layout, Typography } from "antd";
import Actions from "_pages/dashboard/actions";
const { Content } = Layout;
const { Title } = Typography;

const DashboardContent = (props: RouteComponentProps) => {
	return (
		<Content className="w-screen pt-10">
			<Row className="justify-center">
				<Title level={2}>KasebIO Dashboard</Title>
			</Row>
		</Content>
	);
};

class Dashboard extends Component<RouteComponentProps> {
	render() {
		return (
			<Row className="w-screen">
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={["dashbard"]}
					className="w-screen"
				>
					<Menu.Item key="dashbard">
						Dashboard
						<Link to="." />
					</Menu.Item>
					<Menu.Item key="actions">
						Actions
						<Link to="actions" />
					</Menu.Item>
					<Menu.Item key="home">
						logout
						<Link to="../" />
					</Menu.Item>
				</Menu>
				<Router>
					<DashboardContent path="/" />
					<Actions path="/actions" />
				</Router>
			</Row>
		);
	}
}

export default Dashboard;
