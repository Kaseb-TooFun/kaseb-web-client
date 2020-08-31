import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useParams, useNavigate } from '@reach/router';
import { Layout, Row, Button, Breadcrumb, Popover } from 'antd';
import { AppstoreTwoTone, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Sidebar from './sidebar';
import Api from '_src/api';
import TopBarHeader from "_pages/components/TopBarHeader";

const { Content } = Layout;

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

const StudioAddEdit = (props: RouteComponentProps) => {
	// const [data, setData] = useState([]);
	const params = useParams();
	const isDemo = params.websiteId === "demo"
	const [configInitialData, setConfigInitialData] = useState({
		id: '',
		name: '',
		goalType: '',
		goalLink: '',
		goalSelector: '',
		type: '',
		values: {
			title: '',
			description: '',
			btnText: '',
			btnColor: '',
			bgColor: '',
			titleColor: '',
			textColor: '',
			btnTextColor: '',
			opacity: '',
			fontFamily: '',
			url: '',
			condition: '',
			isCloseable: true,
			isRTL: true,
			showOnce: true,
			customStyle: '',
			template: '',
			effect: '',
			sourceSelector: '',
			destSelector: '',
			once: true,
			type: '',
		}
	})
	const [isApiFetched, setIsApiFetched] = useState(Boolean(isDemo || false));
	const [isModuleLoaded, setIsModuleLoaded] = useState(Boolean( false));
	const [pendingMessage, setPendingMessage] = useState(
		!isDemo?
		'در حال دریافت اطلاعات':
		'در حال یافتن کد کاسب در صفحه مورد نظر'
	)
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
	const navigate = useNavigate();
	const [iframeUrl, setIframeUrl] = useState(
		!isDemo? '': `${window.location.origin}/demopage`
	)
	const [href, setHref] = useState(
		!isDemo? '': `${window.location.origin}/demopage`
	);
	// const breadcrumb = href.split('?')[0].split('/');
	const [sourceSelector, setSourceSelector] = useState('');
	const [destSelector, setDestSelector] = useState('');
	const [goalSelector, setGoalSelector] = useState('');
	const [displayMode, setDisplayMode] = useState('desktop')
	const [displayModePopoverVisible, setDisplayModePopoverVisible] = useState(false)

	let configId = params.configId;

	useEffect(() => {
		if (iframeUrl)
			window.addEventListener('message', onReceiveMessage);
		else
			fetchConfigList();

		return () => {
			window.removeEventListener('message', onReceiveMessage);
		};
	}, [iframeUrl]);

	const fetchConfigList = () => {
		if (params.websiteId !== "demo") {
			Api.website.getWebsite(params.websiteId).then((response) => {
				if (response.status == 200) {
					// setData(response.data.website.configs);
					setIframeUrl(response.data.website.url);
					if (!configId) {
						setPendingMessage('در حال یافتن کد کاسب در صفحه مورد نظر')
					}
				} else {
					setPendingMessage('سایت پیدا نشد')
				}
				setIsApiFetched(true);
			});
			if (configId) {
				Api.config.getItem(params.websiteId, configId).then((response) => {
					if (response.status == 200) {
						let itemData = response.data as {
							value: string,
							id: string,
							name: string,
							goalType: string,
							goalLink: string,
							goalSelector: string,
						};
						let configValues = JSON.parse(itemData.value) as {
							type: string,
							data: {
								title: string,
								description: string,
								btnText: string,
								btnColor: string,
								bgColor: string,
								titleColor: string,
								textColor: string,
								btnTextColor: string,
								opacity: string,
								fontFamily: string,
								url: string,
								condition: string,
								isCloseable: boolean,
								isRTL: boolean,
								showOnce: boolean,
								customStyle: string,
								///
								template: string,
								effect: string,
								sourceSelector: string,
								destSelector: string,
								once: boolean,
								type: string,
							}
						};
						setSourceSelector(configValues.data.sourceSelector)
						setDestSelector(configValues.data.destSelector)
						setGoalSelector(itemData.goalSelector)
						setConfigInitialData({
							id: itemData.id,
							name: itemData.name,
							goalType: itemData.goalType,
							goalLink: itemData.goalLink,
							goalSelector: itemData.goalSelector,
							type: configValues.type,
							values: configValues.data,
							// title: configValues.title,
							// description: configValues.description,
							// btnText: configValues.,
							// btnColor: '',
							// bgColor: '',
							// titleColor: '',
							// textColor: '',
							// btnTextColor: '',
							// opacity: '',
							// fontFamily: '',
							// url: '',
							// condition: '',
							// isCloseable: true,
							// isRTL: true,
							// showOnce: true,
							// customStyle: '',
							// template: '',
							// effect: '',
							// sourceSelector: '',
							// destSelector: '',
							// once: true,
							// type: '',
							// }
						})

						setPendingMessage('در حال یافتن کد کاسب در صفحه مورد نظر')
					} else {
						setPendingMessage('واکنش یافت نشد')
					}
					setIsApiFetched(true);
				})
			}
		}
	};

	const postMessageToIframe = (type: string, payload?: any) => {
		const frame = document.getElementById('my-iframe') as HTMLIFrameElement;
		if (iframeUrl) frame.contentWindow?.postMessage({ type, payload }, iframeUrl);
	};

	const onReceiveMessage = (message: MessageEvent) => {
		const { type, payload } = message.data;
		if (process.env.NODE_ENV !== 'production' && type) {
			console.log('messageFromIFrame', { type, payload });
		}
		switch (type) {
			case 'kio-loaded':
				postMessageToIframe('set-target-origin');
				postMessageToIframe('get-location');
				setIsModuleLoaded(true);
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

	let myHeader0 = <div
				className="my-header"
				style={{}}
			>

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
	const extraRightMenuItems = <>
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
		<div className={`my-header-item`} style={{float: "right", margin: "15px 8px"}}>
			<div style={{color: "#af9b18", direction: "rtl",
				display: (isApiFetched && isModuleLoaded )? "none": "inline-block",
			}}>
				<i className={"big spinner loading icon"} style={{}}/>
				<span className={"hide-in-mobile"}
					style={{color: "black", fontWeight: "bold"}}
				>
					{pendingMessage}
				</span>
			</div>
		</div>

	</>
	const extraLeftMenuItems = <>
		<div className={"my-header-item"}
			 style={{margin: "8px 4px", display: "inline-block"}}>
			<Button
				icon={<AppstoreTwoTone twoToneColor={"#af9b18"} style={{fontSize: "1.5em"}}/>}
				className=""
				title={"دشبرد"}
				style={{border: "none", fontSize: "1.5em"}}
				onClick={() => {
					navigate('/dashboard', { replace: true });
				}}
			/>
		</div>
		{!isDemo && (
			<div className={"my-header-item"}
				style={{margin: "8px 4px", display: "inline-block"}}>
				<Button
					// icon={<UnorderedListOutlined twoToneColor={"#af9b18"} style={{fontSize: "1.5em"}}/>}
					className=""
					title={"واکنش‌ها"}
					style={{border: "none", fontSize: "1.8em", padding: "0",}}
					onClick={() => {
						navigate(`/dashboard/actions/${params.websiteId}`, { replace: true });
					}}
				>
					<i className={"list icon"} style={{color: "#af9b18"}}/>
				</Button>
		</div>
		)}
		<div className={"my-header-item hide-in-mobile"}
			style={{display: "inline-block", margin: "8px 4px"}}>
			<Breadcrumb style={{fontSize: "1.2em"}}>
				{href.split('?')[0].split('/')
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
	</>
	const myHeader = <TopBarHeader
		hasDefaultRightMenuItems={false}
		extraRightMenuItems={extraRightMenuItems}
		extraLeftMenuItems={extraLeftMenuItems}
	/>

	return (
		<Layout id="studio" className="h-screen" style={{backgroundColor: "white"}}>
			{myHeader}
			<Content className="content h-screen w-screen">
				<div className={`iframe-back-${displayMode}-mode ${isSidebarCollapsed? "studio-iframe-zero-margin": ""}`}>
					{(isApiFetched && iframeUrl) &&
						<iframe
							id="my-iframe"
							src={iframeUrl + '?ignore_saved_reactions=true'}
							className={`iframe-${displayMode}-mode ${isSidebarCollapsed? "studio-iframe-full-width": ""}`}
						/>
					}
				</div>
				{(isApiFetched && isModuleLoaded) && (
					<Sidebar
						postMessage={postMessageToIframe}
						websiteId={params.websiteId}
						sourceSelector={sourceSelector}
						setSourceSelector={setSourceSelector}
						destSelector={destSelector}
						setDestSelector={setDestSelector}
						goalSelector={goalSelector}
						setGoalSelector={setGoalSelector}
						configInitialData={configInitialData}
						isDemo={isDemo}
						isSidebarCollapsed={isSidebarCollapsed}
						setIsSidebarCollapsed={setIsSidebarCollapsed}
					/>
				)}
			</Content>
		</Layout>
	);
}

export default StudioAddEdit;
