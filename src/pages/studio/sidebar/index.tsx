import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button } from 'antd';
import AddBanner from './AddBanner';

interface IProps extends RouteComponentProps {
	postMessage: (type: string, payload?: any) => void;
	websiteId: string;
}

const Sidebar = (props: IProps) => {
	const { postMessage, websiteId } = props;
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
		<div className="sidebar shadow-lg">
			<div className="sidebar-inner">
				{mode != 'home' && (
					<Button
						className="my-btn"
						onClick={() => {
							unstickSidebar();
							setMode('home');
						}}
					>
						back
					</Button>
				)}
				{mode == 'home' && (
					<>
						<Button
							className="my-btn"
							onClick={() => {
								stickSidebar();
								setMode('add-banner');
							}}
						>
							add banner
						</Button>
						<Button
							title="Enable Inspector"
							type="primary"
							className="m-3"
							onClick={() => postMessage('enable-inspector')}
						>
							Enable Inspector
						</Button>
						<Button
							danger
							title="Disable Inspector"
							className="m-3"
							onClick={() => postMessage('disable-inspector')}
						>
							Disable Inspector
						</Button>
					</>
				)}

				{mode == 'add-banner' && (
					<AddBanner
						previewReaction={previewReaction}
						websiteId={websiteId}
					/>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
