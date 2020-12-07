import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import AddEditReaction from './AddEditReaction';

interface IProps extends RouteComponentProps {
	postMessage: (type: string, payload?: any) => void;
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
