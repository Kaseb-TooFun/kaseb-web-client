import React, { Component } from "react";
import { RouteComponentProps, Link, Router, useNavigate } from "@reach/router";
import {Row, Menu, Layout, Typography, Popover, Button, Breadcrumb} from "antd";
import { AppstoreTwoTone, AppstoreOutlined } from '@ant-design/icons';
import Websites from "_src/pages/dashboard/websites";
import logo from "_src/logo.svg";
import Actions from "_pages/dashboard/actions";
import TopBarHeader from "_pages/components/TopBarHeader";
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

	const myHeader = <TopBarHeader/>
	return (
		<>
			{myHeader}
			<Row className="w-screen">
				<Router>
					<DashboardContent path="/" />
					<Websites path="/websites" />
					<Actions path="/actions/:websiteId" />
				</Router>
			</Row>
		</>
	);
};

export default Dashboard;
