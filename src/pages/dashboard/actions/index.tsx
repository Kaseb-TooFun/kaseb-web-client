import React, { useState, useEffect } from 'react';
import {Link, RouteComponentProps, useParams} from '@reach/router';
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
import { ControlOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
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
				message.error('failed to delete config');
			}
		});
	};
	return (
		<Table dataSource={data} loading={loading} style={{width: "100%"}}>
			<Column
				title="نام"
				key="name"
				render={(value) => {
					try {
						return value.name;
					} catch (error) {
						return '-';
					}
				}}
			/>
			<Column title="شناسه" dataIndex="id" key="id" />
			<Column
				title=""
				key="action"
				render={(value) => (
					<>
						<Link to={`/studio/${params.websiteId}/edit/${value.id}`}>
							<Button
								className="mr-3"
								type="primary"
								icon={<EditOutlined />}
							>
								 ویرایش
							</Button>
						</Link>
						<Popconfirm
							title="Are you sure delete this config?"
							onConfirm={() => confirmDelete(value.id)}
							okText="Yes"
							cancelText="No"
						>
							<Button icon={<DeleteOutlined />}>حذف</Button>
						</Popconfirm>
					</>
				)}
			/>
		</Table>
	);
};

const Actions = (props: RouteComponentProps) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const params = useParams();
	const [iframeUrl, setIframeUrl] = useState('')

	const fetchConfigList = () => {
		setLoading(true);
		Api.website.getWebsite(params.websiteId).then((response) => {
			if (response.status == 200) {
				setData(response.data.website.configs);
				setIframeUrl(response.data.website.url)
			}
			setLoading(false);
		});
	};


	useEffect(() => {
		fetchConfigList();
	}, []);

	return (
		<div className="flex flex-col w-screen pt-10 items-center">
			<Row className="w-10/12" style={{display: "block"}}>
				<Title style={{display: "inline-block", float: "left"}} level={3}>
					{iframeUrl}
				</Title>
				<Link to={`/studio/${params.websiteId}`}
					style={{display: "inline-block", float: "right"}}
				>
					<Button
						className="mr-3"
						type="primary"
						icon={<PlusOutlined />}
					>
						  واکنش جدید
					</Button>
				</Link>
			</Row>
			<Card title="configs" className="w-10/12">
				<ConfigsTable
					data={data}
					loading={loading}
					fetchConfigList={fetchConfigList}
				/>
			</Card>
			{/*<Card*/}
			{/*	title="Action Info"*/}
			{/*	extra={*/}
			{/*		<Select*/}
			{/*			defaultValue="banner"*/}
			{/*			style={{ width: 120 }}*/}
			{/*			onChange={setType}*/}
			{/*		>*/}
			{/*			<Select.Option value="banner">Banner</Select.Option>*/}
			{/*			<Select.Option value="reaction">Reaction</Select.Option>*/}
			{/*		</Select>*/}
			{/*	}*/}
			{/*	className="w-10/12"*/}
			{/*>*/}
				{/*{type == 'banner' && (*/}
				{/*	<BannerForm*/}
				{/*		id={params.websiteId}*/}
				{/*		fetchConfigList={fetchConfigList}*/}
				{/*	/>*/}
				{/*)}*/}
				{/*{type == 'reaction' && (*/}
				{/*	<ReactionForm*/}
				{/*		id={params.websiteId}*/}
				{/*		fetchConfigList={fetchConfigList}*/}
				{/*		postMessageToIframe={postMessageToIframe}*/}
				{/*	/>*/}
				{/*)}*/}
			{/*</Card>*/}
			{/*<Row>*/}
			{/*	<Button*/}
			{/*		title="Enable Inspector"*/}
			{/*		type="primary"*/}
			{/*		className="m-3"*/}
			{/*		onClick={() => {*/}
			{/*			postMessageToIframe('enable-inspector');*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		Enable Inspector*/}
			{/*	</Button>*/}
			{/*	<Button*/}
			{/*		danger*/}
			{/*		title="Disable Inspector"*/}
			{/*		className="m-3"*/}
			{/*		onClick={() => {*/}
			{/*			postMessageToIframe('disable-inspector');*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		Disable Inspector*/}
			{/*	</Button>*/}
			{/*</Row>*/}
			<iframe
				id="my-iframe"
				src={iframeUrl}
				style={{
					width: '90%',
					height: '600px',
					border: '1px solid #000',
					margin: "1px"
				}}
			/>

		</div>
	);
};

export default Actions;
