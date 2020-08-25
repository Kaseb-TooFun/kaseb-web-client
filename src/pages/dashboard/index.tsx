import React, { Component } from "react";
import { RouteComponentProps, Link, Router, useNavigate } from "@reach/router";
import { Row, Menu, Layout, Typography } from "antd";
import Websites from "_pages/dashboard/websites";
import Actions from "_pages/dashboard/actions";
const { Content } = Layout;
const { Title } = Typography;

const DashboardContent = (props: RouteComponentProps) => {
	return (
		<Content className="w-screen pt-10">
			<Row className="justify-center">
				<Title level={2}>Kaseb Dashboard</Title>
			</Row>
		</Content>
	);
};

const Dashboard = (props: RouteComponentProps) => {
	const navigate = useNavigate();

	const logout = () => {
		navigate("/logout", { replace: true });
	};

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
				<Menu.Item key="websites">
					Websites
					<Link to="websites" />
				</Menu.Item>
				<Menu.Item key="home" onClick={logout}>
					logout
				</Menu.Item>
			</Menu>
			<Router>
				<DashboardContent path="/" />
				<Websites path="/websites" />
				<Actions path="/actions/:websiteId" />
			</Router>
		</Row>
	);
};

export default Dashboard;
