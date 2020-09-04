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
import {animationOptions} from "_pages/studio/components/ReactionTypeOptions";
import {triggerOptions} from "_pages/studio/components/TriggerOptions";


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
		message.loading('در حال حذف واکنش', 1);
		Api.config.remove(id, params.websiteId).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success('واکنش با موفقیت حذف شد');
				fetchConfigList();
			} else if (resposnse.status == 400) {
				message.warning(resposnse.data.errorMessage);
			} else {
				message.error('حذف واکنش به اتمام نرسید. لطفا مجددا تلاش نمایید');
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
			{/*<Column title="شناسه" dataIndex="id" key="id" />*/}
			<Column
				title={"نوع هدف"}
				key={"goalType"}
				render={(value) => {
					switch (value.goalType) {
						case "page_visit":
							return "بازدید"
						case "click":
							return "کلیک"
						case "notify":
							return "اطلاع‌رسانی"
						default:
							return value.goalType
					}
				}}
			/>
			<Column
				title={"راه‌انداز - واکنش"}
				key={"reactionShortInfo"}
				render={(value) => {
					let triggerShowName = "", typeShowName= "", typeDetailsShowName = ""
					let configJson = JSON.parse(value.value) as {
						type: string,
						data: {
							template: string,
							effect: string,
							condition: string
						}
					}
					console.log("pnn", configJson)
					switch (configJson.type) {
						case "action":
							typeShowName = "انیمیشن"
							animationOptions.map((ao) => {
								if (ao.name === configJson.data.effect) {
									typeDetailsShowName = ao.showName
								}
							})
							if (typeDetailsShowName === "") typeDetailsShowName = configJson.data.effect
							break
						default:
							typeShowName = "محتوا"
							switch (configJson.data.template) {
								case "bottom-banner":
									typeDetailsShowName = "بنر پایین"
									break
								case "top-banner":
									typeDetailsShowName = "بنر بالا"
									break
								case "modal":
									typeDetailsShowName = "مُدال"
									break
								default:
									typeDetailsShowName = configJson.data.template
									break
							}
							break
					}

					triggerOptions.map((to) => {
						if (configJson.data.condition.includes(to.name)) {
							triggerShowName = to.showName
						}
						if (triggerShowName === "") triggerShowName = configJson.data.template
					})

					return `${triggerShowName} - ${typeShowName} (${typeDetailsShowName})`
				}}
			/>
			<Column
				title=""
				key="action"
				render={(value) => (
					<>
						<Link to={`/studio/${params.websiteId}/edit/${value.id}`}>
							<Button
								className="mr-3 table-btn"
								type="primary"
							>
								 ویرایش
								<EditOutlined />
							</Button>
						</Link>
						<Link to={`/statistics/action/${value.id}`}>
								<Button
									className="mr-3 table-btn"
									type="primary"
									ghost
								>
									آمار
									<i className={"chart line icon"} />
								</Button>
							</Link>
						<Popconfirm
							title="مطمئن هستید که این واکنش حذف شود؟"
							onConfirm={() => confirmDelete(value.id)}
							okText="بله"
							cancelText="خیر"
						>
							<Button className={"table-btn"} danger>
								حذف
								<DeleteOutlined />
							</Button>
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
			<Card className="w-10/12">
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
