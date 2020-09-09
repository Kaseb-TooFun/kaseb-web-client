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
	Modal
} from 'antd';
import {
	DeleteOutlined,
	PlusOutlined,
	UnorderedListOutlined
} from '@ant-design/icons';
const { Column } = Table;
const { Title } = Typography;
import Api from '_src/api';
import StatisticsModal from "_pages/dashboard/components/StatisticsModal";

const WebsiteTable = ({
	data,
	loading,
	fetchWebsiteList
}: {
	data: { id: string; title: string; url: string }[];
	loading: boolean;
	fetchWebsiteList: () => void;
}) => {
	const [isVisible, setVisible] = useState(false);
	const [showStatisticsModal, setShowStatisticsModal] = useState(false)
	const [websiteId, setWebsiteId] = useState('');

	const confirmDelete = (id: string) => {
		message.loading('در حال حذف وبسایت', 1);
		Api.website.remove(id).then((response) => {
			if (response.status == 200) {
				message.success('وبسایت با موفقیت حذف شد');
				fetchWebsiteList();
			} else if (response.status == 400) {
				message.warning(response.data.errorMessage);
			} else {
				message.error('حذف وبسایت به اتمام نرسید. لطفا مجددا تلاش نمایید');
			}
		});
	};

	const copy = () => {
		const copyText = document.getElementById(
			'my-script'
		) as HTMLTextAreaElement;
		copyText.select();
		copyText.setSelectionRange(0, 99999); /*For mobile devices*/
		document.execCommand('copy');
	};

	return (
		<>
			<StatisticsModal showModal={showStatisticsModal} setShowModal={setShowStatisticsModal}/>
			<Modal
				title="کد زیر را در هدر سایت خود قرار دهید"
				footer={null}
				visible={isVisible}
				onOk={() => setVisible(false)}
				onCancel={() => setVisible(false)}
			>
				<textarea id="my-script" style={{ width: '100%' }} rows={5}>
					{`<!-- KESEB.XYZ -->
<script src="${document.location.href.replace(
						document.location.pathname,
						`/kio.js?id=${websiteId}`
					)}" defer></script>
<!-- KESEB.XYZ -->`}
				</textarea>
				<Button onClick={copy}>کپی</Button>
			</Modal>
			<Table dataSource={data} loading={loading} direction={'rtl'}>
				<Column title="عنوان" dataIndex="title" key="title" responsive={["lg"]} />
				<Column
					title="آدرس وبسایت"
					// dataIndex="url"
					key="url"
					render={(value) => (
						value.url.substr(0, 60) + (value.url.length>60?'...':'')
					)}
					width={'10px'}
				/>
				<Column
					title=""
					key="action"
					render={(value) => (
						<div>
							<Link to={`/studio/${value.id}`}>
								<Button
									className="mr-3 table-btn"
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
							<Button
								className="mr-3 table-btn"
								type="primary"
								ghost
								onClick={() => {setShowStatisticsModal(true)}}
							>
								آمار
								<i className={"chart line icon"} />
							</Button>
							<Popconfirm
								title="مطمئن هستید که این وبسایت حذف شود؟"
								onConfirm={() => confirmDelete(value.id)}
								okText="Yes"
								cancelText="No"
							>
								<Button className={"table-btn"} danger>
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
	fetchWebsiteList: () => void;
}) => {
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);
	const onFormSubmit = () => {
		setBtnLoading(true);
		const { title, url } = form.getFieldsValue(['title', 'url']);
		message.loading('در حال ذخیره وبسایت', 1);
		Api.website.add(title, url).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success('وبسایت با موفقیت اضافه شد');
				fetchWebsiteList();
				form.setFieldsValue({
					url: '',
					title: ''
				});
			} else if (resposnse.status == 404) {
				message.error(resposnse.data.errorMessage);
			} else {
				message.error('ذخیره وبسایت به اتمام نرسید. لطفا مجددا تلاش نمایید');
			}
		});
		setBtnLoading(false);
	};

	return (
		<Form
			id={"add_website"}
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
					placeholder="http://www.example.com"
					type="url"
					maxLength={2064}
				/>
			</Form.Item>
			<Form.Item shouldUpdate={true}>
				{() => (
					<Button
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

	const fetchWebsiteList = () => {
		Api.website.getList().then((response) => {
			if (response.status == 200) {
				setData(response.data.websites);
			}
			setLoading(false);
		});
	};

	useEffect(() => {
		fetchWebsiteList();
	}, []);

	return (
		<div className="flex flex-col w-screen pt-10 items-center" style={{width: "100%"}}>
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
