import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, useNavigate } from '@reach/router';
import Logo from 'src/logo.svg';
import { Popover } from 'antd';
import { AppstoreTwoTone, HomeTwoTone } from '@ant-design/icons';
import Api from 'src/api';
import { css } from '@emotion/react';

interface TopHeaderProps extends RouteComponentProps {
	extraLeftMenuItems?: JSX.Element;
}

const TopHeader = (props: TopHeaderProps) => {
	const { extraLeftMenuItems } = props;

	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = window.localStorage.getItem('authorization') || '';
		if (token) {
			Api.auth.verify().then((response) => {
				if (response.status == 200) {
					setIsAuthenticated(true);
				}
			});
		}
	}, []);

	return (
		<div className="my-header">
			<Link to="/dashboard">
				<Logo />
			</Link>
			<div
				css={css`
					flex: 1;
					display: flex;
					justify-content: flex-end;
					padding: 0 20px 0 0;
				`}
			>
				{extraLeftMenuItems}
				<Link
					to="/dashboard/websites"
					css={css`
						display: flex;
						align-items: center;
					`}
				>
					<AppstoreTwoTone
						twoToneColor={'#af9b18'}
						style={{ fontSize: '1.8em' }}
					/>
				</Link>
				<Link
					to="/dashboard"
					css={css`
						display: flex;
						align-items: center;
						margin-left: 20px;
					`}
				>
					<HomeTwoTone
						twoToneColor={'#af9b18'}
						style={{ fontSize: '1.8em' }}
					/>
				</Link>
			</div>
			<div style={{ cursor: 'pointer', fontSize: '1.2em' }}>
				<Popover
					trigger={'click'}
					placement={'bottomRight'}
					content={
						<>
							<a
								style={{
									color: '#af9b18',
									padding: '3px 0',
									textAlign: 'right'
								}}
								href={'/studio/demo'}
								target={'_blank'}
								rel={'noopener noreferrer'}
							>
								<div style={{ cursor: 'pointer' }}>
									دمو کارگاه واکنش
									<i className={'eye icon'} />
								</div>
							</a>
							<a
								style={{
									color: '#af9b18',
									padding: '3px 0',
									textAlign: 'right'
								}}
								href={'/statistics/action/demo'}
								target={'_blank'}
								rel={'noopener noreferrer'}
							>
								<div style={{ cursor: 'pointer' }}>
									دمو آمار واکنش
									<i className={'chart line icon'} />
								</div>
							</a>
							<div
								style={{
									color: '#af9b18',
									padding: '3px 0',
									textAlign: 'right'
								}}
							>
								<div
									role="button"
									style={{ cursor: 'pointer' }}
									onClick={() =>
										navigate(
											isAuthenticated
												? '/logout'
												: '/login',
											{ replace: true }
										)
									}
								>
									{isAuthenticated
										? 'خروج از حساب کاربری'
										: 'ورود به حساب کاربری'}
									<i
										className={`${
											isAuthenticated
												? 'logout'
												: 'sign-in'
										} icon`}
									/>
								</div>
							</div>
						</>
					}
				>
					<i
						className="big user circle icon"
						style={{ color: '#af9b18' }}
					/>
				</Popover>
			</div>
		</div>
	);
};

export default TopHeader;
