import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button } from 'antd';
import AddEditReaction from './AddEditReaction';

interface IProps extends RouteComponentProps {
	configInitialData: {
		id: string;
		name: string;
		goalType: string;
		goalLink: string;
		type: string;
		values: {
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
			template: string;
			effect: string;
			sourceSelector: string;
			destSelector: string;
			once: boolean;
			type: string;
		};
	};
	postMessage: (type: string, payload?: any) => void;
	websiteId: string;
	sourceSelector: string;
	setSourceSelector: (s: string) => void;
	destSelector: string;
	setDestSelector: (s: string) => void;
	goalSelector: string;
	setGoalSelector: (s: string) => void;
	isDemo: boolean;
	isSidebarCollapsed: boolean;
	setIsSidebarCollapsed: (v: boolean) => void;
}

const Sidebar = (props: IProps) => {
	const {
		configInitialData,
		postMessage,
		websiteId,
		sourceSelector,
		setSourceSelector,
		destSelector,
		setDestSelector,
		goalSelector,
		setGoalSelector,
		isDemo,
		isSidebarCollapsed,
		setIsSidebarCollapsed
	} = props;
	// const [mode, setMode] = useState('home');
	const sidebar = document.querySelector(
		'#studio .sidebar'
	) as HTMLDivElement;
	const sidebarInner = document.querySelector(
		'#studio .sidebar-inner'
	) as HTMLDivElement;
	const iframe = document.querySelector('#my-iframe') as HTMLIFrameElement;

	// const stickSidebar = () => {
	// 	const { width } = sidebar.getBoundingClientRect();
	// 	iframe.style.paddingRight = `${width + 40}px`;
	// 	sidebarInner.style.width = `${width + 40}px`;
	// 	sidebar.classList.add('stick');
	// };

	// const unstickSidebar = () => {
	// 	iframe.style.paddingRight = '0px';
	// 	sidebarInner.style.width = 'unset';
	// 	sidebar.classList.remove('stick');
	// };

	const previewReaction = (data: any) =>
		postMessage('preview-reaction', data);

	return (
		<div
			className={`sidebar shadow-lg stick ${
				isSidebarCollapsed ? 'sidebar-collapsed' : ''
			}`}
			id="my-sidebar"
		>
			<div
				role="button"
				style={{
					position: 'fixed',
					right: '0',
					margin: '10px',
					cursor: 'pointer'
				}}
				onClick={() => {
					setIsSidebarCollapsed(!isSidebarCollapsed);
				}}
			>
				<i
					className={`chevron circle ${
						isSidebarCollapsed ? 'down' : 'up'
					} icon`}
					style={{ fontSize: '1.3em' }}
				/>
			</div>
			<div className="sidebar-inner">
				{/*{mode != 'home' && (*/}
				{/*	<Button*/}
				{/*		className="my-btn"*/}
				{/*		style={{borderColor: "#af9b18", fontSize: "15px", fontWeight: "normal",*/}
				{/*				borderRadius: "15px", width: "7rem", height: "2rem", direction: "rtl"}}*/}
				{/*		onClick={() => {*/}
				{/*			// unstickSidebar();*/}
				{/*			setMode('home');*/}
				{/*		}}*/}
				{/*	>*/}
				{/*		<i className={"arrow right icon"} style={{marginLeft: "4px", marginRight: "0"}}/>*/}
				{/*		بازگشت*/}
				{/*	</Button>*/}
				{/*)}*/}
				{/*{mode == 'home' && (*/}
				{/*	<>*/}
				{/*		<Button*/}
				{/*			className="my-btn"*/}
				{/*			style={{borderColor: "#af9b18", fontSize: "20px", fontWeight: "bold",*/}
				{/*				borderRadius: "70px", width: "15rem", height: "3.5rem", direction: "rtl"}}*/}
				{/*			onClick={() => {*/}
				{/*				// stickSidebar();*/}
				{/*				setMode('add-reaction');*/}
				{/*			}}*/}
				{/*		>*/}
				{/*			<img src="/icons/twotone-closed_2caption-24px.svg"*/}
				{/*				 style={{display: "inline-block", marginLeft: "10px"}}*/}
				{/*			/>*/}
				{/*			<span style={{color: "#af9b18"}}>*/}
				{/*				ایجاد واکنش*/}
				{/*			</span>*/}
				{/*		</Button>*/}
				{/*		/!*<Button*!/*/}
				{/*		/!*	title="Enable Inspector"*!/*/}
				{/*		/!*	type="primary"*!/*/}
				{/*		/!*	className="m-3"*!/*/}
				{/*		/!*	onClick={() => postMessage('enable-inspector')}*!/*/}
				{/*		/!*>*!/*/}
				{/*		/!*	Enable Inspector*!/*/}
				{/*		/!*</Button>*!/*/}
				{/*		/!*<Button*!/*/}
				{/*		/!*	danger*!/*/}
				{/*		/!*	title="Disable Inspector"*!/*/}
				{/*		/!*	className="m-3"*!/*/}
				{/*		/!*	onClick={() => postMessage('disable-inspector')}*!/*/}
				{/*		/!*>*!/*/}
				{/*		/!*	Disable Inspector*!/*/}
				{/*		/!*</Button>*!/*/}
				{/*	</>*/}
				{/*)}*/}

				<AddEditReaction
					previewReaction={previewReaction}
					websiteId={websiteId}
					postMessageToIframe={postMessage}
					sourceSelector={sourceSelector}
					setSourceSelector={setSourceSelector}
					destSelector={destSelector}
					setDestSelector={setDestSelector}
					goalSelector={goalSelector}
					setGoalSelector={setGoalSelector}
					configInitialData={configInitialData}
					isDemo={isDemo}
				/>
			</div>
		</div>
	);
};

export default Sidebar;
