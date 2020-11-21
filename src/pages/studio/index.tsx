import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useParams, navigate, Link } from '@reach/router';
import { Layout, Breadcrumb, Popover, Dropdown, Menu } from 'antd';
import {
	UnorderedListOutlined,
	DesktopOutlined,
	MobileOutlined
} from '@ant-design/icons';
import Sidebar from './sidebar';
import Api from 'src/api';
import TopHeader from 'src/pages/studio/components/TopHeader';
import { css } from '@emotion/react';

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
	const isDemo = params.websiteId === 'demo';
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
			type: ''
		}
	});
	const [isApiFetched, setIsApiFetched] = useState(Boolean(isDemo || false));
	const [isModuleLoaded, setIsModuleLoaded] = useState(Boolean(false));
	const [pendingMessage, setPendingMessage] = useState(
		!isDemo
			? 'در حال دریافت اطلاعات'
			: 'در حال یافتن کد کاسب در صفحه مورد نظر'
	);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

	const publicUrl = document.location.href.substr(
		0,
		document.location.href.lastIndexOf(document.location.pathname)
	);
	const [iframeUrl, setIframeUrl] = useState(
		!isDemo ? '' : `${publicUrl}/demopage`
	);
	const [href, setHref] = useState(!isDemo ? '' : `${publicUrl}/demopage`);
	// const breadcrumb = href.split('?')[0].split('/');
	const [sourceSelector, setSourceSelector] = useState('');
	const [destSelector, setDestSelector] = useState('');
	const [goalSelector, setGoalSelector] = useState('');
	const [displayMode, setDisplayMode] = useState('desktop');

	const configId = params.configId;

	useEffect(() => {
		if (iframeUrl) window.addEventListener('message', onReceiveMessage);
		else fetchConfigList();

		return () => {
			window.removeEventListener('message', onReceiveMessage);
		};
	}, [iframeUrl]);

	const fetchConfigList = () => {
		if (params.websiteId !== 'demo') {
			Api.website.getWebsite(params.websiteId).then((response) => {
				if (response.status == 200) {
					// setData(response.data.website.configs);
					setIframeUrl(response.data.website.url);
					if (!configId) {
						setPendingMessage(
							'در حال یافتن کد کاسب در صفحه مورد نظر'
						);
					}
				} else {
					setPendingMessage('وبسایت پیدا نشد');
				}
				setIsApiFetched(true);
			});
			if (configId) {
				Api.config
					.getItem(params.websiteId, configId)
					.then((response) => {
						if (response.status == 200) {
							const itemData = response.data as {
								value: string;
								id: string;
								name: string;
								goalType: string;
								goalLink: string;
								goalSelector: string;
							};
							const configValues = JSON.parse(itemData.value) as {
								type: string;
								data: {
									title: string;
									description: string;
									btnText: string;
									btnColor: string;
									bgColor: string;
									titleColor: string;
									textColor: string;
									btnTextColor: string;
									opacity: string;
									fontFamily: string;
									url: string;
									condition: string;
									isCloseable: boolean;
									isRTL: boolean;
									showOnce: boolean;
									customStyle: string;
									///
									template: string;
									effect: string;
									sourceSelector: string;
									destSelector: string;
									once: boolean;
									type: string;
								};
							};
							setSourceSelector(configValues.data.sourceSelector);
							setDestSelector(configValues.data.destSelector);
							setGoalSelector(itemData.goalSelector);
							setConfigInitialData({
								id: itemData.id,
								name: itemData.name,
								goalType: itemData.goalType,
								goalLink: itemData.goalLink,
								goalSelector: itemData.goalSelector,
								type: configValues.type,
								values: configValues.data
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
							});

							setPendingMessage(
								'در حال یافتن کد کاسب در صفحه مورد نظر'
							);
						} else {
							setPendingMessage('واکنش یافت نشد');
						}
						setIsApiFetched(true);
					});
			}
		}
	};

	const postMessageToIframe = (type: string, payload?: any) => {
		const frame = document.getElementById('my-iframe') as HTMLIFrameElement;
		if (iframeUrl)
			frame.contentWindow?.postMessage({ type, payload }, iframeUrl);
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
				const selectorType = window.localStorage.getItem(
					'selectorType'
				);
				switch (selectorType) {
					case 'source':
						setSourceSelector(payload);
						break;
					case 'dest':
						setDestSelector(payload);
						break;
					case 'goal':
						setGoalSelector(payload);
						break;
					default:
						break;
				}
				postMessageToIframe('disable-inspector');
				break;

			default:
				break;
		}
	};

	const extraRightMenuItems = (
		<>
			<div
				className={`my-header-item`}
				style={{ float: 'right', margin: '15px 8px' }}
			>
				<div
					style={{
						color: '#af9b18',
						direction: 'rtl',
						display:
							isApiFetched && isModuleLoaded
								? 'none'
								: 'inline-block'
					}}
				>
					<i className={'big spinner loading icon'} style={{}} />
					<span
						className={'hide-in-mobile'}
						style={{ color: 'black', fontWeight: 'bold' }}
					>
						{pendingMessage}
					</span>
				</div>
			</div>
		</>
	);
	const extraLeftMenuItems = (
		<>
			<div
				className={'my-header-item hide-in-mobile'}
				css={css`
					flex: 1;
					text-align: left;
					display: flex;
					align-items: center;
					padding: 0 20px;
				`}
			>
				<div
					css={css`
						flex: 1;
						display: flex;
						align-items: center;
						padding: 0 15px;
						height: 32px;
						border-radius: 16px;
						background-color: #eee;
					`}
				>
					<code>{href}</code>
				</div>
				{/* <Breadcrumb style={{ fontSize: '1.2em' }}>
					{href
						.split('?')[0]
						.split('/')
						.filter(
							(str) =>
								str != '' && str != 'https:' && str != 'http:'
						)
						.map((str, index) => {
							return (
								<Breadcrumb.Item key={index}>
									<a href="#main">{str}</a>
								</Breadcrumb.Item>
							);
						})}
				</Breadcrumb> */}
			</div>
			<div
				css={css`
					margin-right: 20px;
					display: flex;
					align-items: center;
				`}
			>
				<Dropdown
					overlay={
						<Menu
							title="حالت نمایش"
							css={css`
								text-align: right;
							`}
						>
							<Menu.Item
								onClick={() => {
									setDisplayMode('desktop');
								}}
							>
								<span className="mr-2">دسکتاپ</span>
								<DesktopOutlined />
							</Menu.Item>
							<Menu.Item
								onClick={() => {
									setDisplayMode('mobile');
								}}
							>
								<span className="mr-2">موبایل</span>
								<MobileOutlined />
							</Menu.Item>
						</Menu>
					}
					placement="bottomCenter"
					arrow
				>
					{displayMode === 'desktop' ? (
						<DesktopOutlined
							style={{ fontSize: '1.8em', color: '#af9b18' }}
						/>
					) : (
						<MobileOutlined
							style={{ fontSize: '1.8em', color: '#af9b18' }}
						/>
					)}
				</Dropdown>
			</div>
			{!isDemo && (
				<Link
					to={`/dashboard/actions/${params.websiteId}`}
					css={css`
						display: flex;
						align-items: center;
						margin-right: 20px;
					`}
				>
					<UnorderedListOutlined
						style={{ fontSize: '1.8em', color: '#af9b18' }}
					/>
				</Link>
			)}
		</>
	);

	return (
		<Layout
			id="studio"
			className="h-screen"
			style={{ backgroundColor: 'white' }}
		>
			<TopHeader
				extraRightMenuItems={extraRightMenuItems}
				extraLeftMenuItems={extraLeftMenuItems}
			/>
			<Content className="content h-screen w-screen">
				<div
					className={`iframe-back-${displayMode}-mode ${
						isSidebarCollapsed ? 'studio-iframe-zero-margin' : ''
					}`}
				>
					{isApiFetched && iframeUrl && (
						<iframe
							title="website"
							id="my-iframe"
							src={iframeUrl + '?ignore_saved_reactions=true'}
							className={`iframe-${displayMode}-mode ${
								isSidebarCollapsed
									? 'studio-iframe-full-width'
									: ''
							}`}
						/>
					)}
				</div>
				{isApiFetched && isModuleLoaded && (
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
};

export default StudioAddEdit;
