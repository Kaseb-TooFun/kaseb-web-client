import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button } from 'antd';
import AddReaction from './AddReaction';

interface IProps extends RouteComponentProps {
	postMessage: (type: string, payload?: any) => void;
	websiteId: string;
	selector: string;
	setSelector: (s: string) => void;
	destSelector: string;
	setDestSelector: (s: string) => void;
}

const Sidebar = (props: IProps) => {
	const { postMessage, websiteId, selector, setSelector, destSelector, setDestSelector } = props;
	const [mode, setMode] = useState('home');
	const sidebar = document.querySelector(
		'#studio .sidebar'
	) as HTMLDivElement;
	const sidebarInner = document.querySelector(
		'#studio .sidebar-inner'
	) as HTMLDivElement;
	const iframe = document.querySelector('#my-iframe') as HTMLIFrameElement;

	const stickSidebar = () => {
		const { width } = sidebar.getBoundingClientRect();
		iframe.style.paddingRight = `${width + 40}px`;
		sidebarInner.style.width = `${width + 40}px`;
		sidebar.classList.add('stick');
	};

	const unstickSidebar = () => {
		iframe.style.paddingRight = '0px';
		sidebarInner.style.width = 'unset';
		sidebar.classList.remove('stick');
	};

	const previewReaction = (data: any) =>
		postMessage('preview-reaction', data);

	return (
		<div className="sidebar shadow-lg" id="my-sidebar">
			<div className="sidebar-inner">
				{mode != 'home' && (
					<Button
						className="my-btn"
						onClick={() => {
							unstickSidebar();
							setMode('home');
						}}
					>
						بازگشت
					</Button>
				)}
				{mode == 'home' && (
					<>
						<Button
							className="my-btn"
							style={{borderColor: "#af9b18", fontSize: "20px", fontWeight: "bold", borderRadius: "70px", width: "15rem", height: "3.5rem"}}
							onClick={() => {
								stickSidebar();
								setMode('add-reaction');
							}}
						>
							<span style={{color: "#af9b18"}}>
								ایجاد واکنش
							</span>
						</Button>
						{/*<Button*/}
						{/*	title="Enable Inspector"*/}
						{/*	type="primary"*/}
						{/*	className="m-3"*/}
						{/*	onClick={() => postMessage('enable-inspector')}*/}
						{/*>*/}
						{/*	Enable Inspector*/}
						{/*</Button>*/}
						{/*<Button*/}
						{/*	danger*/}
						{/*	title="Disable Inspector"*/}
						{/*	className="m-3"*/}
						{/*	onClick={() => postMessage('disable-inspector')}*/}
						{/*>*/}
						{/*	Disable Inspector*/}
						{/*</Button>*/}
					</>
				)}

				{mode == 'add-reaction' && (
					<AddReaction
						previewReaction={previewReaction}
						websiteId={websiteId}
						postMessageToIframe={postMessage}
						selector={selector}
						setSelector={setSelector}
						destSelector={destSelector}
						setDestSelector={setDestSelector}
					/>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
