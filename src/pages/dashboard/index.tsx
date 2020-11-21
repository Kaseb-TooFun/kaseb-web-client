import React from 'react';
import { RouteComponentProps, Link, Router } from '@reach/router';
import { Row, Layout, Button } from 'antd';
import Websites from 'src/pages/dashboard/websites';
import Actions from 'src/pages/dashboard/actions';
import TopHeader from 'src/pages/components/TopHeader';
const { Content } = Layout;
const darkBaseColor = '#af9b18';

const DashboardContent = (props: RouteComponentProps) => {
	return (
		<Content className="w-screen pt-10">
			<Row className="justify-center">
				<div
					style={{
						borderRadius: '10px',
						border: `1px solid ${darkBaseColor}`,
						padding: '2%',
						width: '90%',
						textAlign: 'center',
						minHeight: '150px',
						marginBottom: '30px',
						paddingTop: '30px',
						backgroundColor: '#fcfaf1'
					}}
				>
					<p className={'dashboard-text'} style={{ fontSize: '2em' }}>
						به پیشخوان مدیریت کاسب خوش آمدید
					</p>
					<p className={'dashboard-text'}>
						جاییکه می‌توانید برای وبسایت‌های خود اهداف تعیین کنید و
						واکنش مناسب را به کاربران نمایش دهید
					</p>
					<p className={'dashboard-text'}>
						در ‌
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
							<span className={'dashboard-link'} style={{}}>
								<i className={'eye icon'} />
								دمو کارگاه واکنش
							</span>
						</a>
						‌ می‌توانید با نحوه ساخت هدف و واکنش آشنا شوید
					</p>
					<p className={'dashboard-text'}>
						مدتی پس از اجرای واکنش در وبسایت‌تان آماری مشابه ‌
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
							<span className={'dashboard-link'} style={{}}>
								<i className={'chart line icon'} />
								دمو آمار
							</span>
						</a>
						‌ در اختیار خواهید داشت
					</p>

					<div style={{ display: 'inline-block' }}>
						<img
							alt="no goal"
							src={`${process.env.PUBLIC_URL}/images/no-goal.png`}
						/>
					</div>

					<div>
						<Link to="/dashboard/websites#add_website">
							<Button className="dashboard-btn" type="primary">
								اضافه کردن وبسایت
								<i className={'plus icon'} />
							</Button>
						</Link>
					</div>
					<div>
						<Link to="/dashboard/websites/">
							<Button className="dashboard-btn" type="primary">
								مدیریت وبسایت‌ها
								<i className={'window maximize icon'} />
							</Button>
						</Link>
					</div>
				</div>
			</Row>
		</Content>
	);
};

const Dashboard = (props: RouteComponentProps) => {
	console.log({ props });
	return (
		<>
			<TopHeader />
			<Row className="w-screen">
				<Router className="w-screen">
					<DashboardContent path="/" />
					<Websites path="websites/" />
					<Actions path="actions/:websiteId" />
				</Router>
			</Row>
		</>
	);
};

export default Dashboard;
