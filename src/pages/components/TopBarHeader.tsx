import React, {useEffect, useState} from "react";
import {RouteComponentProps, useNavigate} from "@reach/router";
import logo from "_src/logo.svg";
import {Button, Popover} from "antd";
import { AppstoreTwoTone, AppstoreOutlined } from '@ant-design/icons';
import Api from "_src/api";


interface TopBarHeaderProps extends RouteComponentProps{
	hasDefaultRightMenuItems?: boolean
	extraRightMenuItems?: any,
	extraLeftMenuItems?: any,
}

const TopBarHeader = (props: TopBarHeaderProps) => {
	const {
		hasDefaultRightMenuItems=true,
		extraRightMenuItems=<></>,
		extraLeftMenuItems=<></>,
	} = props

	const navigate = useNavigate()
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const token = window.localStorage.getItem("authorization") || "";
		if (token) {
			Api.auth.verify().then((response) => {
				if (response.status == 200) {
					setIsAuthenticated(true)
				}
			})
		}
	}, [])

	const logoItem = <div
		className={"my-header-item"}
		style={{float: "right", paddingLeft: "10px", paddingTop: "10px"}}
	>
		<a style={{}} href={"/"}>
			<img src={logo}/>
		</a>
	</div>

	let defaultRightMenuItems;
	if (hasDefaultRightMenuItems) {
		defaultRightMenuItems = <>
			<div className={"my-header-item"}
				 style={{float: "right", margin: "8px 2px", display: "inline-block", direction: "rtl"}}
			>
				<Button
					icon={<AppstoreTwoTone twoToneColor={"#af9b18"} style={{fontSize: "1.5em"}}/>}
					className=""
					title={"دشبرد"}
					style={{border: "none", fontSize: "1.5em"}}
					onClick={() => {
						navigate('/dashboard', { replace: true });
					}}
				>
					<span className={"my-header-item-title"}>
						دشبرد
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
		</>
	}

	const profilePopoverItem = <div
		className={"my-header-item"}
		style={{float: "left", margin: "12px 5px"}}
	>
			<div style={{cursor: "pointer", fontSize: "1.2em"}}>
				<Popover
						trigger={"click"}
						placement={"bottomRight"}
						 content={
						 	<>
								<a style={{color: "#af9b18", padding: "3px 0", textAlign: "right"}}
									href={"/studio/demo"} target={"_blank"} rel={'noopener noreferrer'}
								>
									<div style={{cursor: "pointer"}}>
											  دمو کارگاه واکنش
										<i className={"eye icon"}/>
									</div>
								</a>
								<a style={{color: "#af9b18", padding: "3px 0", textAlign: "right"}}
									href={"/statistics/action/demo"} target={"_blank"} rel={'noopener noreferrer'}
								>
									<div style={{cursor: "pointer"}}>
											  دمو آمار هدف-واکنش
										<i className={"chart line icon"}/>
									</div>
								</a>
								<div style={{color: "#af9b18", padding: "3px 0", textAlign: "right"}}>
									<div style={{cursor: "pointer"}}
										onClick={() => navigate(
											isAuthenticated? "/logout": "/login",
											{ replace: true }
											)}
									>
										{isAuthenticated? "خروج از حساب کاربری": "ورود به حساب کاربری"}
										<i className={`${isAuthenticated? "logout": "sign-in"} icon`}/>
									</div>
								</div>
							</>
						 }
				>
					<i className="big user circle icon" style={{color: "#af9b18"}}/>
				</Popover>
			</div>
		</div>

	const myHeader = <div
		className="my-header"
		style={{}}
	>
		{logoItem}
		{defaultRightMenuItems}
		{extraRightMenuItems}

		{profilePopoverItem}
		{extraLeftMenuItems}

	</div>

	return (<>
		{myHeader}
	</>)
}

export default TopBarHeader;
