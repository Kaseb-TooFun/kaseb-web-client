import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button } from 'antd';
import AddEditReaction from './AddEditReaction';

interface IProps extends RouteComponentProps {
	// configInitialData: {
	// 	id: string;
	// 	name: string;
	// 	goalType: string;
	// 	goalLink: string;
	// 	type: string;
	// 	values: {
	// 		title: string;
	// 		description: string;
	// 		btnText: string;
	// 		btnColor: string;
	// 		bgColor: string;
	// 		titleColor: string;
	// 		textColor: string;
	// 		btnTextColor: string;
	// 		opacity: string;
	// 		fontFamily: string;
	// 		url: string;
	// 		condition: string;
	// 		isCloseable: boolean;
	// 		isRTL: boolean;
	// 		showOnce: boolean;
	// 		customStyle: string;
	// 		template: string;
	// 		effect: string;
	// 		sourceSelector: string;
	// 		destSelector: string;
	// 		once: boolean;
	// 		type: string;
	// 	};
	// };
	postMessage: (type: string, payload?: any) => void;
	// websiteId: string;
	// sourceSelector: string;
	// setSourceSelector: (s: string) => void;
	// destSelector: string;
	// setDestSelector: (s: string) => void;
	// goalSelector: string;
	// setGoalSelector: (s: string) => void;
	// isDemo: boolean;
	// isSidebarCollapsed: boolean;
	// setIsSidebarCollapsed: (v: boolean) => void;
}

const Sidebar = ({ postMessage }: IProps) => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

	return (
		<div
			className={`sidebar shadow-lg ${
				isSidebarCollapsed ? 'sidebar-collapsed mr-3' : ''
			} ml-3`}
		>
			<div
				role="button"
				className="collapse-btn"
				onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
			>
				<i
					className={`chevron circle ${
						isSidebarCollapsed ? 'down' : 'up'
					} large icon`}
				/>
			</div>
			<div className="sidebar-inner">
				<AddEditReaction postMessage={postMessage} />
			</div>
		</div>
	);
};

export default Sidebar;
