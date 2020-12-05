import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, useNavigate } from '@reach/router';
import Logo from 'src/logo.svg';
import { Dropdown, Menu, Popover } from 'antd';
import { css } from '@emotion/react';
import {
	AppstoreTwoTone,
	HomeTwoTone,
	UnorderedListOutlined,
	DesktopOutlined,
	MobileOutlined
} from '@ant-design/icons';
import Api from 'src/api';

interface TopHeaderProps extends RouteComponentProps {
	url: string;
	loading: boolean;
	displayMode: 'desktop' | 'mobile';
	setDisplayMode: (mode: 'desktop' | 'mobile') => void;
}

const TopHeader = (props: TopHeaderProps) => {
	const { url, loading, setDisplayMode, displayMode } = props;
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
							padding: 0 15px 0 5px;
							height: 32px;
							border-radius: 16px;
							background-color: #eee;
						`}
					>
						{loading && <i className="spinner loading icon" />}
						<code className="ml-2">{url}</code>
					</div>
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
