import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxRootState } from 'src/redux/reducers';
import { setConfig } from 'src/redux/actions/reaction';

import AddEditReaction from './AddEditReaction';
import { Button } from 'antd';
import { css } from '@emotion/react';

interface IProps extends RouteComponentProps, ConnectedProps<typeof connector> {
	postMessage: (type: string, payload?: any) => void;
}
const Sidebar = ({ config, postMessage }: IProps) => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

	const preview = () => postMessage('preview-reaction', config);

	return (
		<div
			className={`sidebar shadow-lg ${
				isSidebarCollapsed ? 'sidebar-collapsed mr-3' : ''
			} ml-3`}
		>
			<div
				css={css`
					display: flex;
					position: relative;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 10px 0 5px;
				`}
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
				{isSidebarCollapsed ? null : (
					<Button
						className="my-btn"
						css={css`
							position: absolute;
							border-color: #af9b18;
							font-size: 15px;
							font-weight: normal;
							border-radius: 15px;
							width: 8rem;
							height: 2rem;
							direction: rtl;
							margin-bottom: 10px;
						`}
						onClick={preview}
					>
						<i
							className={'eye icon'}
							style={{ marginLeft: '4px', marginRight: '0' }}
						/>
						پیش‌نمایش
					</Button>
				)}
			</div>
			<div className="sidebar-inner">
				<AddEditReaction postMessage={postMessage} />
			</div>
		</div>
	);
};

const mapStateToProps = (state: ReduxRootState) => {
	return {
		config: state.config
	};
};

const connector = connect(mapStateToProps, { setConfig });
export default connector(Sidebar);
