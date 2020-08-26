import React, { Component } from "react";
import { RouteComponentProps, Link, Router, useNavigate } from "@reach/router";
import {Row, Menu, Layout, Typography, Popover, Button, Breadcrumb} from "antd";
import { AppstoreTwoTone, AppstoreOutlined } from '@ant-design/icons';
import Websites from "_src/pages/dashboard/websites";
import logo from "_src/logo.svg";
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

	const myHeader = <div
		className="my-header"
		style={{}}
	>
		<div className={"my-header-item"}
			 style={{float: "right", paddingLeft: "10px", paddingTop: "10px"}} >
			<a style={{}} href={"/"}>
				<img src={logo}/>
			</a>
		</div>
		<div className={"my-header-item"}
			 style={{float: "right", margin: "8px 2px", display: "inline-block", direction: "rtl"}}>
			<Button
				icon={<AppstoreTwoTone twoToneColor={"#af9b18"} style={{fontSize: "1.5em"}}/>}
				className=""
				title={"داشبورد"}
				style={{border: "none", fontSize: "1.5em"}}
				onClick={() => {
					navigate('/dashboard', { replace: true });
				}}
			>
				<span className={"my-header-item-title"}>
					داشبورد
				</span>
			</Button>
		</div>
		<div className={"my-header-item"}
			 style={{float: "right", margin: "8px 2px", display: "inline-block", direction: "rtl"}}>
			<Button
				// icon={<AppstoreTwoTone twoToneColor={"#af9b18"} style={{fontSize: "1.5em"}}/>}
				className=""
				title={"سایت‌ها"}
				style={{border: "none", fontSize: "1.5em", padding: "0"}}
				onClick={() => {
					navigate('/dashboard/websites', { replace: true });
				}}
			>
				<i className={"window maximize icon"}
				   style={{fontSize: "1.5em", color: "#af9b18"}}
				/>
				<span className={"my-header-item-title"}
					  style={{verticalAlign: "top", paddingTop: "10px"}}>
					سایت‌ها
				</span>
			</Button>
		</div>
		{/*<div className={"my-header-item"} style={{float: "right", margin: "15px 8px"}}>*/}
		{/*	<div style={{color: "#af9b18", direction: "rtl",*/}
		{/*		display: "inline-block",*/}
		{/*	}}>*/}
		{/*		test*/}
		{/*	</div>*/}
		{/*</div>*/}

		<div style={{float: "left", margin: "12px 5px"}}>
			<div style={{cursor: "pointer", fontSize: "1.2em"}}>
				<Popover
						trigger={"click"}
						placement={"bottomRight"}
						 content={
							<div style={{color: "#af9b18"}}>
								<div style={{cursor: "pointer"}}
									onClick={() => navigate("/logout", { replace: true })}
								>
									<i className={"logout icon"}/>
										 خروج از حساب کاربری
								</div>
							</div>
						 }
				>
					<i className="big user circle icon" style={{color: "#af9b18"}}/>
				</Popover>
			</div>
		</div>
	</div>

	return (
		<>
			{myHeader}
		<Row className="w-screen">

			{/*<Menu*/}
			{/*	theme="dark"*/}
			{/*	mode="horizontal"*/}
			{/*	defaultSelectedKeys={["dashbard"]}*/}
			{/*	className="w-screen"*/}
			{/*>*/}
			{/*	<Menu.Item key="dashbard">*/}
			{/*		Dashboard*/}
			{/*		<Link to="." />*/}
			{/*	</Menu.Item>*/}
			{/*	<Menu.Item key="websites">*/}
			{/*		Websites*/}
			{/*		<Link to="websites" />*/}
			{/*	</Menu.Item>*/}
			{/*	<Menu.Item key="home" onClick={logout}>*/}
			{/*		logout*/}
			{/*	</Menu.Item>*/}
			{/*</Menu>*/}
			<Router>
				<DashboardContent path="/" />
				<Websites path="/websites" />
			</Router>
		</Row>
			</>
	);
};

export default Dashboard;
