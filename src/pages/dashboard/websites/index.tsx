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
	Popconfirm
} from 'antd';
import { ControlOutlined, DeleteOutlined } from '@ant-design/icons';
const { Column } = Table;
const { Title } = Typography;
import Api from '_src/api';

const WebsiteTable = ({
	data,
	loading,
	fetchWebsiteList
}: {
	data: { id: string; title: string; url: string }[];
	loading: boolean;
	fetchWebsiteList: () => void;
}) => {
	const confirmDelete = (id: string) => {
		message.loading('deleting website…');
		Api.website.remove(id).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success('website deleted successfully');
				fetchWebsiteList();
			} else if (resposnse.status == 400) {
				message.warning(resposnse.data.errorMessage);
			} else {
				message.error('faild to delete website');
			}
		});
	};
	return (
		<Table dataSource={data} loading={loading}>
			<Column title="title" dataIndex="title" key="title" />
			<Column title="url" dataIndex="url" key="url" />
			<Column
				title="Action"
				key="action"
				render={(value) => (
					<>
						<Link to={`${value.id}/actions?url=${value.url}`}>
							<Button
								className="mr-3"
								type="primary"
								icon={<ControlOutlined />}
							>
								Actions
							</Button>
						</Link>
						<Popconfirm
							title="Are you sure delete this website?"
							onConfirm={() => confirmDelete(value.id)}
							okText="Yes"
							cancelText="No"
						>
							<Button icon={<DeleteOutlined />}>Delete</Button>
						</Popconfirm>
					</>
				)}
			/>
		</Table>
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
		message.loading('adding website…');
		Api.website.add(title, url).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success('website saved successfully');
				fetchWebsiteList();
				form.setFieldsValue({
					url: '',
					title: ''
				});
			} else if (resposnse.status == 404) {
				message.error(resposnse.data.errorMessage);
			} else {
				message.error('faild to save website');
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
			<Form.Item label="title" name="title">
				<Input placeholder="website title" />
			</Form.Item>
			<Form.Item label="url" name="url">
				<Input placeholder="http://www.example.com" type="url" />
			</Form.Item>
			<Form.Item shouldUpdate={true}>
				{() => (
					<Button
						type="primary"
						htmlType="submit"
						loading={btnLoading}
						disabled={btnLoading}
					>
						Save
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
		<div className="flex flex-col w-screen pt-10 items-center">
			<Row justify="center">
				<Title level={2}>websites</Title>
			</Row>
			<Card className="w-10/12">
				<WebsiteTable
					data={data}
					loading={loading}
					fetchWebsiteList={fetchWebsiteList}
				/>
				<AddSiteForm fetchWebsiteList={fetchWebsiteList} />
			</Card>
		</div>
	);
};

export default Websites;
