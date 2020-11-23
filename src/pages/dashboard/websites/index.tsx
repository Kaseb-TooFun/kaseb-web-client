import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import {
	Row,
	Card,
	message,
	Typography,
	Form,
	Button,
	Input,
	Table,
	Popconfirm,
	Modal,
	Popover
} from 'antd';
import {
	DeleteOutlined,
	PlusOutlined,
	UnorderedListOutlined
} from '@ant-design/icons';
import Api from 'src/api';
import StatisticsModal from 'src/pages/dashboard/components/StatisticsModal';
import { scrollTo } from 'src/utils';
const { Column } = Table;
const { Title } = Typography;

const WebsiteTable = ({
	data,
	loading,
	fetchWebsiteList
}: {
	data: { id: string; title: string; url: string }[];
	loading: boolean;
	fetchWebsiteList: (addNew?: boolean) => void;
}) => {
	const [isVisible, setVisible] = useState(false);
	const [showStatisticsModal, setShowStatisticsModal] = useState(false);
	const [websiteId, setWebsiteId] = useState('');
	const [popoverVisibility, setPopoverVisibility] = useState(true);

	const confirmDelete = (id: string) => {
		message.loading('در حال حذف وبسایت', 1);
		Api.website.remove(id).then((response) => {
			if (response.status == 200) {
				message.success('وبسایت با موفقیت حذف شد');
				fetchWebsiteList();
			} else if (response.status == 400) {
				message.warning(response.data.errorMessage);
			} else {
				message.error(
					'حذف وبسایت به اتمام نرسید. لطفا مجددا تلاش نمایید'
				);
			}
		});
	};

	const copy = (id: string) => {
		const copyText = document.getElementById(id) as
			| HTMLTextAreaElement
			| HTMLInputElement;
		copyText.select();
		copyText.setSelectionRange(0, 99999); /*For mobile devices*/
		document.execCommand('copy');
		message.success('کپی شد');
	};

	return (
		<>
			<StatisticsModal
				showModal={showStatisticsModal}
				setShowModal={setShowStatisticsModal}
			/>
			<Modal
				title="اطلاعات وبسایت"
				footer={null}
				visible={isVisible}
				onOk={() => setVisible(false)}
				onCancel={() => setVisible(false)}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'stretch'
					}}
				>
					<div style={{ marginBottom: 10 }}>
						<Input
							id="website-id"
							readOnly
							addonAfter="شناسه وبسایت"
							value={websiteId}
							contentEditable={false}
						/>
					</div>
					<Button
						className="kaseb-btn"
						onClick={() => copy('website-id')}
						style={{ alignSelf: 'center', color: '#fff' }}
					>
						کپی شناسه
					</Button>
					<div style={{ marginBottom: 10, marginTop: 30 }}>
						<Input.TextArea
							readOnly
							id="head-script"
							value={`<!-- KESEB.XYZ -->
<script src="${document.location.href.substr(
								0,
								document.location.href.lastIndexOf(
									document.location.pathname
								)
							)}/kio.js?id=${websiteId}" defer></script>
<!-- KESEB.XYZ -->`}
							style={{ width: '100%' }}
							autoSize
							contentEditable={false}
						/>
					</div>

					<Button
						className="kaseb-btn"
						onClick={() => copy('head-script')}
						style={{ alignSelf: 'center', color: '#fff' }}
					>
						script کپی
					</Button>
				</div>
			</Modal>
			<Table dataSource={data} loading={loading} direction={'rtl'}>
				<Column
					title="عنوان"
					dataIndex="title"
					key="title"
					responsive={['lg']}
				/>
				<Column
					title="آدرس وبسایت"
					key="url"
					render={(value) =>
						value.url.substr(0, 60) +
						(value.url.length > 60 ? '...' : '')
					}
					width={'10px'}
				/>
				<Column
					title=""
					key="action"
					render={(value) => (
						<div>
							<Link to={`/studio/${value.id}`}>
								<Button
									className="mr-3 table-btn kaseb-btn"
									type="primary"
								>
									واکنش جدید
									<PlusOutlined />
								</Button>
							</Link>
							<Link to={`/dashboard/actions/${value.id}`}>
								<Button
									className="mr-3 table-btn"
									type="primary"
									ghost
								>
									واکنش‌ها
									<UnorderedListOutlined />
								</Button>
							</Link>
							<Popover
								content={
									<div
										role="button"
										onClick={() =>
											setPopoverVisibility(false)
										}
										id="get-code-help"
									>
										برای استفاده از کاسب کد زیر را به
										سایتتان اضافه کنید
									</div>
								}
								trigger="click"
								visible={value.codePopover && popoverVisibility}
								onVisibleChange={setPopoverVisibility}
							>
								<Button
									className="mr-3 table-btn"
									type="default"
									onClick={() => {
										setWebsiteId(value.id);
										setVisible(true);
									}}
								>
									دریافت کد
									<i className="code icon" />
								</Button>
							</Popover>
							<Button
								className="mr-3 table-btn"
								type="primary"
								ghost
								onClick={() => {
									setShowStatisticsModal(true);
								}}
							>
								آمار
								<i className={'chart line icon'} />
							</Button>
							<Popconfirm
								title="مطمئن هستید که این وبسایت حذف شود؟"
								onConfirm={() => confirmDelete(value.id)}
								okText="بله"
								cancelText="خیر"
							>
								<Button className={'table-btn'} danger>
									حذف
									<DeleteOutlined />
								</Button>
							</Popconfirm>
						</div>
					)}
				/>
			</Table>
		</>
	);
};

const AddSiteForm = ({
	fetchWebsiteList
}: {
	fetchWebsiteList: (addNew?: boolean) => void;
}) => {
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);
	const onFormSubmit = () => {
		setBtnLoading(true);
		const { title, url } = form.getFieldsValue(['title', 'url']);

		if (!title || !url) {
			message.error('عنوان و آدرس وبسایت را وارد نمایید', 3);
			setBtnLoading(false);
			return;
		}
		if (url.substr(0, 8) != 'https://') {
			message.error(
				<span dir="rtl">آدرس وبسایت باید با https شروع شود.</span>,
				5
			);
			setBtnLoading(false);
			return;
		}
		message.loading('در حال ذخیره وبسایت', 1);
		Api.website.add(title, url).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success('وبسایت با موفقیت اضافه شد');
				fetchWebsiteList(true);
				form.setFieldsValue({
					url: '',
					title: ''
				});
			} else if (resposnse.status == 404) {
				message.error(resposnse.data.errorMessage);
			} else {
				message.error(
					'ذخیره وبسایت به اتمام نرسید. لطفا مجددا تلاش نمایید'
				);
			}
		});
		setBtnLoading(false);
	};

	return (
		<Form
			form={form}
			layout="horizontal"
			initialValues={{
				title: '',
				url: ''
			}}
			onSubmitCapture={onFormSubmit}
		>
			<Form.Item label="عنوان وبسایت" name="title">
				<Input placeholder="website title" maxLength={64} />
			</Form.Item>
			<Form.Item label="آدرس وبسایت" name="url">
				<Input
					placeholder="https://www.example.com"
					type="url"
					maxLength={2064}
				/>
			</Form.Item>
			<Form.Item shouldUpdate={true}>
				{() => (
					<Button
						className={'kaseb-btn'}
						type="primary"
						htmlType="submit"
						loading={btnLoading}
						disabled={btnLoading}
					>
						ذخیره
					</Button>
				)}
			</Form.Item>
		</Form>
	);
};

const Websites = (props: RouteComponentProps) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const fetchWebsiteList = (addNew = false) => {
		Api.website.getList().then((response) => {
			if (response.status == 200) {
				const websites = response.data.websites;
				setData(
					websites.map((item: any, i: number) => ({
						...item,
						codePopover: i == websites.length - 1 && addNew
					}))
				);
				if (addNew) {
					setTimeout(() => {
						scrollTo('#get-code-help');
					}, 1000);
				}
			}
			setLoading(false);
		});
	};

	useEffect(() => {
		fetchWebsiteList();
	}, []);

	return (
		<div
			className="flex flex-col w-screen pt-10 items-center"
			style={{ width: '100%' }}
		>
			<Row justify="center">
				<Title level={2}>وبسایت‌ها</Title>
			</Row>
			<Card className="w-10/12">
				<AddSiteForm fetchWebsiteList={fetchWebsiteList} />
				<WebsiteTable
					data={data}
					loading={loading}
					fetchWebsiteList={fetchWebsiteList}
				/>
			</Card>
		</div>
	);
};

export default Websites;
