import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useParams } from '@reach/router';
import {
	Row,
	Col,
	Card,
	Select,
	Typography,
	Form,
	Switch,
	Button,
	message,
	Input,
	Table,
	Popconfirm
} from 'antd';
import { ControlOutlined, DeleteOutlined } from '@ant-design/icons';
const { Column } = Table;
const { Title } = Typography;
import Api from '_src/api';
import { scrollTo } from '_src/utils';


const ConfigsTable = ({
	data,
	loading,
	fetchConfigList
}: {
	data: { id: string; title: string; url: string }[];
	loading: boolean;
	fetchConfigList: () => void;
}) => {
	const params = useParams();
	const confirmDelete = (id: string) => {
		message.loading('deleting website…');
		Api.config.remove(id, params.websiteId).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success('config deleted successfully');
				fetchConfigList();
			} else if (resposnse.status == 400) {
				message.warning(resposnse.data.errorMessage);
			} else {
				message.error('faild to delete config');
			}
		});
	};
	return (
		<Table dataSource={data} loading={loading}>
			<Column
				title="name"
				key="name"
				render={(value) => {
					try {
						return JSON.parse(value.value).data.name;
					} catch (error) {
						return 'no-name';
					}
				}}
			/>
			<Column title="id" dataIndex="id" key="id" />
			<Column
				title="Action"
				key="action"
				render={(value) => (
					<Popconfirm
						title="Are you sure delete this config?"
						onConfirm={() => confirmDelete(value.id)}
						okText="Yes"
						cancelText="No"
					>
						<Button icon={<DeleteOutlined />}>Delete</Button>
					</Popconfirm>
				)}
			/>
		</Table>
	);
};

const Actions = (props: RouteComponentProps) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const params = useParams();
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const iframeUrl = urlParams.get('url') || '';

	const fetchConfigList = () => {
		setLoading(true);
		Api.config.getList(params.websiteId).then((response) => {
			if (response.status == 200) {
				setData(response.data.configs);
			}
			setLoading(false);
		});
	};

	useEffect(() => {
		fetchConfigList();
	}, []);

	return (
		<div className="flex flex-col w-screen pt-10 items-center">
			<Row justify="center">
				<Title level={2}>{iframeUrl}</Title>
			</Row>
			<Card title="configs" className="w-10/12">
				<ConfigsTable
					data={data}
					loading={loading}
					fetchConfigList={fetchConfigList}
				/>
			</Card>
		</div>
	);
};

export default Actions;
