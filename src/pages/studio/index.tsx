import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useParams, useNavigate } from '@reach/router';
import { Layout, Row, Button, Breadcrumb, Popover } from 'antd';
import { AppstoreTwoTone, AppstoreOutlined } from '@ant-design/icons';
import Sidebar from './sidebar';
import Api from '_src/api';
import logo from "_src/logo.svg";

const { Header, Content } = Layout;

const onInspected = (() => {
	let action = (selector: string) => {};

	const addListener = (listener: (selector: string) => void) => {
		action = listener;
	};

	const run = (selector: string) => {
		action(selector);
		addListener((s) => {});
	};

	return {
		addListener,
		run
	};
})();

const Studio = (props: RouteComponentProps) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isLoaded, setLoaded] = useState(false);
	const navigate = useNavigate();
	const params = useParams();
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const iframeUrl = urlParams.get('url') || '';
	const [href, setHref] = useState('');
	const breadcrumb = href.split('/');
	const [sourceSelector, setSourceSelector] = useState('');
	const [destSelector, setDestSelector] = useState('');
	const [goalSelector, setGoalSelector] = useState('');
	const [displayMode, setDisplayMode] = useState('desktop')
	const [displayModePopoverVisible, setDisplayModePopoverVisible] = useState(false)


	useEffect(() => {
		fetchConfigList();
		window.addEventListener('message', onReciveMessage);

		return () => {
			window.removeEventListener('message', onReciveMessage);
		};
	}, []);

	const fetchConfigList = () => {
		setLoading(true);
		Api.config.getList(params.websiteId).then((response) => {
			if (response.status == 200) {
				setData(response.data.configs);
			}
			setLoading(false);
		});
	};

	const postMessageToIframe = (type: string, payload?: any) => {
		const frame = document.getElementById('my-iframe') as HTMLIFrameElement;
		frame.contentWindow?.postMessage({ type, payload }, iframeUrl);
	};

	const onReciveMessage = (message: MessageEvent) => {
		const { type, payload } = message.data;
		if (process.env.NODE_ENV !== 'production' && type) {
			console.log('messageFromIFrame', { type, payload });
		}
		switch (type) {
			case 'kio-loaded':
				setLoaded(true);
				postMessageToIframe('set-target-origin');
				postMessageToIframe('get-location');
				break;

			case 'set-location':
				setHref(payload);
				break;

			case 'select-item':
				onInspected.run(payload);
				let selectorType = window.localStorage.getItem("selectorType");
				switch (selectorType) {
					case "source":
						setSourceSelector(payload)
						break
					case "dest":
						setDestSelector(payload)
						break
					case "goal":
						setGoalSelector(payload)
						break
					default:
						break
				}
				postMessageToIframe( 'disable-inspector');
				break;

			default:
				break;
		}
	};

	return (
		<Layout id="studio" className="h-screen" style={{backgroundColor: "white"}}>
			<div
				className="my-header"
				style={{}}
			>
				<div className={"my-header-item"}
					 style={{float: "right", paddingLeft: "10px", paddingTop: "10px"}} >
					<a style={{}} href={"/"}>
						<img src={logo}/>
					</a>
				</div>
				<div className={"my-header-item"} style={{float: "right", margin: "15px 7px"}} >
					<div style={{cursor: "pointer"}}>
						<Popover
								trigger={"click"}
								placement={"bottomLeft"}
								// title={"حالت نمایش"}
								style={{color: "#af9b18"}}
								visible={displayModePopoverVisible}
								onVisibleChange={() => {setDisplayModePopoverVisible(!displayModePopoverVisible)}}
								 content={
								 	<div style={{textAlign: "right", fontSize: "1.3em"}}>
										<div style={{color: "black", direction: "rtl"}}>
												 حالت نمایش
										</div>
										<div style={{cursor: "pointer", color: "#af9b18", direction: "rtl"}}
											onClick={() => {
												setDisplayMode('desktop')
												setDisplayModePopoverVisible(false)
											}}
										>
											<i className={"desktop icon"}/>
												 دسکتاپ
										</div>
										<div style={{cursor: "pointer", color: "#af9b18", direction: "rtl"}}
											onClick={() => {
												setDisplayMode('mobile')
												setDisplayModePopoverVisible(false)
											}}
										>
											<i className={"mobile alternate icon"}/>
												  موبایل
										</div>
									</div>
								 }
						>
							<i className={`big ${displayMode === 'desktop'? "desktop": "mobile alternate"} icon`}
							   style={{color: "#af9b18"}}
							   title={"حالت نمایش"}
							/>
						</Popover>
					</div>
				</div>
				<div className={"my-header-item"} style={{float: "right", margin: "15px 8px"}}>
					<div style={{color: "#af9b18", direction: "rtl",
						display: isLoaded? "none": "inline-block",
					}}>
						<i className={"big spinner loading icon"} style={{}}/>
						<span className={"my-header-item-title"}
							style={{color: "black", fontWeight: "bold"}}
						>
						  در حال یافتن کد کاسب در صفحه مورد نظر
						</span>
					</div>
				</div>

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
				<div style={{margin: "8px 4px", display: "inline-block"}}>
					<Button
						icon={<AppstoreTwoTone twoToneColor={"#af9b18"} style={{fontSize: "1.5em"}}/>}
						className=""
						title={"داشبورد"}
						style={{border: "none", fontSize: "1.5em"}}
						onClick={() => {
							navigate('/dashboard', { replace: true });
						}}
					/>
				</div>
				<div className={"my-header-item-title"}
					style={{display: "inline-block", margin: "8px 4px"}}>
					<Breadcrumb style={{fontSize: "1.2em"}}>
						{breadcrumb
							.filter(
								(str) =>
									str != '' && str != 'https:' && str != 'http:'
							)
							.map((str, index) => {
								return (
									<Breadcrumb.Item key={index}>
										<a href="#">{str}</a>
									</Breadcrumb.Item>
								);
							})}
					</Breadcrumb>
				</div>
			</div>
			{/*<Header className="header">*/}
			{/*	<div style={{float: "right"}}>*/}
			{/*		<img src={logo}/>*/}
			{/*	</div>*/}
			{/*	<Button*/}
			{/*		type="primary"*/}
			{/*		icon={<AppstoreOutlined />}*/}
			{/*		className="m-3"*/}
			{/*		onClick={() => {*/}
			{/*			navigate('/dashboard', { replace: true });*/}
			{/*		}}*/}
			{/*	/>*/}
			{/*	<Breadcrumb>*/}
			{/*		{breadcrumb*/}
			{/*			.filter(*/}
			{/*				(str) =>*/}
			{/*					str != '' && str != 'https:' && str != 'http:'*/}
			{/*			)*/}
			{/*			.map((str, index) => {*/}
			{/*				return (*/}
			{/*					<Breadcrumb.Item key={index}>*/}
			{/*						<a href="#">{str}</a>*/}
			{/*					</Breadcrumb.Item>*/}
			{/*				);*/}
			{/*			})}*/}
			{/*	</Breadcrumb>*/}
			{/*</Header>*/}
			<Content className="content h-screen w-screen">
				<div className={`iframe-back-${displayMode}-mode`}>
					<iframe id="my-iframe" src={iframeUrl} className={`iframe-${displayMode}-mode`}/>
				</div>
				{isLoaded && (
					<Sidebar
						postMessage={postMessageToIframe}
						websiteId={params.websiteId}
						sourceSelector={sourceSelector}
						setSourceSelector={setSourceSelector}
						destSelector={destSelector}
						setDestSelector={setDestSelector}
						goalSelector={goalSelector}
						setGoalSelector={setGoalSelector}
					/>
				)}
			</Content>
		</Layout>
	);
};

export default Studio;
