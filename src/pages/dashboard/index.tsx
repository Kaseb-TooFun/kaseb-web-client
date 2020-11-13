import React, { Component, useEffect, useState } from 'react';
import {
	RouteComponentProps,
	Link,
	Router,
	useNavigate,
	navigate
} from '@reach/router';
import {
	Row,
	Menu,
	Layout,
	Typography,
	Popover,
	Button,
	message,
	Modal
} from 'antd';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Websites from 'src/pages/dashboard/websites';
import Api from 'src/api';
import Actions from 'src/pages/dashboard/actions';
import TopBarHeader from 'src/pages/components/TopBarHeader';
const { Content } = Layout;
const { Title } = Typography;
const darkBaseColor = '#af9b18';

const DashboardContent = (props: RouteComponentProps) => {
	// const [websites, setWebsites] = useState([])
	// const [isApiFetched, setIsApiFetched] = useState(false)
	// const [isVisible, setVisible] = useState(false);
	// const [websiteId, setWebsiteId] = useState('');

	useEffect(() => {
		// fetchWebsites()
	}, []);

	// const fetchWebsites = () => {
	// 	Api.website.getList().then((response) => {
	// 		if (response.status === 200) {
	// 			console.log(response.data)
	// 			setWebsites(response.data.websites)
	// 			setIsApiFetched(true)
	// 		} else {
	// 			message.error("در دریافت اطلاعات مشکلی پیش آمد. لطفا مجددا تلاش نمایید")
	// 		}
	// 	})
	// }
	// const copy = () => {
	// 	const copyText = document.getElementById(
	// 		'my-script'
	// 	) as HTMLTextAreaElement;
	// 	copyText.select();
	// 	copyText.setSelectionRange(0, 99999); /*For mobile devices*/
	// 	document.execCommand('copy');
	// };

	// 	const codeModal = <Modal
	// 			title="Script"
	// 			footer={null}
	// 			visible={isVisible}
	// 			onOk={() => setVisible(false)}
	// 			onCancel={() => setVisible(false)}
	// 		>
	// 			<textarea id="my-script" style={{ width: '100%' }} rows={5}>
	// 				{`<!-- KESEB.XYZ -->
	// <script src="${document.location.href.replace(
	// 					document.location.pathname,
	// 					`/kio.js?id=${websiteId}`
	// 				)}" defer></script>
	// <!-- KESEB.XYZ -->`}
	// 			</textarea>
	// 			<Button onClick={copy}>کپی</Button>
	// 		</Modal>

	const toWebsitesButtons = (
		<>
			<div style={{ marginBottom: '10px' }}>
				<Link to="/dashboard/websites#add_website">
					<Button className="mr-3 dashboard-btn" type="primary">
						اضافه کردن وبسایت
						<i className={'plus icon'} />
					</Button>
				</Link>
			</div>
			<div>
				<Link to="/dashboard/websites/">
					<Button className="mr-3 dashboard-btn" type="primary">
						مدیریت وبسایت‌ها
						<i className={'window maximize icon'} />
					</Button>
				</Link>
			</div>
		</>
	);

	return (
		<Content className="w-screen pt-10">
			<Row className="justify-center">
				{/*<Title level={2}>Kaseb Dashboard</Title>*/}

				{/*{codeModal}*/}

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
							// style={{width: "100%"}}
							alt="no goal"
							src={'/images/no-goal.png'}
						/>
					</div>

					{toWebsitesButtons}

					{/*{isApiFetched ?*/}
					{/*	<>*/}
					{/*		{*/}
					{/*			(websites.length === 0) ?*/}
					{/*				<div style={{fontSize: "1.5em", paddingBottom: "15px"}}>*/}
					{/*					هنوز سایتی اضافه نکرده‌اید*/}
					{/*				</div>*/}
					{/*				:*/}
					{/*				<div style={{display: "grid"}}>*/}
					{/*					{websites.slice(0, 5).map((website: {url: string, id: string}) => {*/}
					{/*						return (*/}
					{/*							<div style={{*/}
					{/*								borderRadius: "10px",*/}
					{/*								// border: `1px solid ${darkBaseColor}`,*/}
					{/*								padding: "10px 15px",*/}
					{/*								marginBottom: "5px",*/}
					{/*								display: "block",*/}
					{/*							}}*/}
					{/*								 className={"dashboard-website-row"}*/}
					{/*							>*/}
					{/*								<div*/}
					{/*									style={{float: "left", fontSize: "1.2em", display: "inline-block"}}*/}
					{/*								>*/}
					{/*									{website.url.substr(0, 60) + (website.url.length>60?'...':'')}*/}
					{/*								</div>*/}

					{/*								<div style={{float: "right", fontSize: "1.2em", display: "inline-block", textAlign: "right"}}>*/}
					{/*									<Link to={`/studio/${website.id}`}>*/}
					{/*										<Button*/}
					{/*											className="mr-3 table-btn"*/}
					{/*											type="primary"*/}
					{/*										>*/}
					{/*											ساخت هدف و واکنش*/}
					{/*											<PlusOutlined />*/}
					{/*										</Button>*/}
					{/*									</Link>*/}
					{/*									<Link to={`/dashboard/actions/${website.id}`}>*/}
					{/*										<Button*/}
					{/*											className="mr-3 table-btn"*/}
					{/*											type="default"*/}
					{/*										>*/}
					{/*											 مدیریت هدف‌ها و واکنش‌ها*/}
					{/*											<UnorderedListOutlined />*/}
					{/*										</Button>*/}
					{/*									</Link>*/}
					{/*									<Button*/}
					{/*										className="mr-3 table-btn"*/}
					{/*										type="default"*/}
					{/*										onClick={() => {*/}
					{/*											setWebsiteId(website.id);*/}
					{/*											setVisible(true);*/}
					{/*										}}*/}
					{/*									>*/}
					{/*										دریافت کد*/}
					{/*										<i className="code icon" />*/}
					{/*									</Button>*/}
					{/*								</div>*/}
					{/*							</div>*/}
					{/*						)*/}
					{/*					})}*/}
					{/*				</div>*/}
					{/*		}*/}

					{/*		{toWebsitesButtons}*/}
					{/*	</>*/}
					{/*	:*/}
					{/*	<div style={{verticalAlign: "middle"}}>*/}
					{/*		<i className="huge circle notch loading icon"/>*/}
					{/*	</div>*/}
					{/*}*/}
				</div>
			</Row>
		</Content>
	);
};

const Dashboard = (props: RouteComponentProps) => {
	const myHeader = <TopBarHeader />;
	return (
		<>
			{myHeader}
			<Row className="w-screen" style={{ width: '100%' }}>
				<Router style={{ width: '100%' }}>
					<DashboardContent path="/" />
					<Websites path="/websites" />
					<Actions path="/actions/:websiteId" />
				</Router>
			</Row>
		</>
	);
};

export default Dashboard;
