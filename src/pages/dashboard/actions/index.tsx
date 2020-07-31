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

const BannerForm = ({
	id,
	fetchConfigList
}: {
	id: string;
	fetchConfigList: () => void;
}) => {
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);
	const onFormChange = () => {
		const {
			name,
			description,
			btnText,
			url,
			condition,
			template,
			isCloseable
		} = form.getFieldsValue([
			'name',
			'description',
			'btnText',
			'url',
			'condition',
			'template',
			'isCloseable'
		]);
		form.setFieldsValue({
			config: JSON.stringify({
				type: 'banner',
				data: {
					name,
					template,
					description,
					url,
					btnText,
					condition,
					isCloseable
				}
			})
		});
	};

	const onFormSubmit = () => {
		setBtnLoading(true);
		const { config } = form.getFieldsValue(['config']);
		message.loading('saving configs…');
		Api.config.add(id, config).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success('configs saved successfully');
				fetchConfigList();
			} else if (resposnse.status == 400) {
				message.warning(resposnse.data.errorMessage);
			} else {
				message.error('faild to save website configs');
			}
		});
		setBtnLoading(false);
	};

	return (
		<Form
			form={form}
			layout="horizontal"
			initialValues={{
				description: '',
				btnText: '',
				template: 'top-banner',
				condition: 'wait-5',
				isCloseable: true
			}}
			onChange={onFormChange}
			onSubmitCapture={onFormSubmit}
		>
			<Form.Item label="name" name="name">
				<Input placeholder="name" />
			</Form.Item>
			<Form.Item label="description" name="description">
				<Input placeholder="banner description" />
			</Form.Item>
			<Form.Item label="Button Text" name="btnText">
				<Input placeholder="click me!" />
			</Form.Item>
			<Form.Item label="Button Link" name="url">
				<Input placeholder="https://www.example.com" type="url" />
			</Form.Item>
			<Form.Item label="Template" name="template">
				<Select onChange={onFormChange}>
					<Select.Option value="top-banner">top banner</Select.Option>
					<Select.Option value="bottom-banner">
						bottom banner
					</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item label="Condition to show" name="condition">
				<Select onChange={onFormChange}>
					<Select.Option value="wait-5">
						Show after 5 seconds
					</Select.Option>
					<Select.Option value="wait-30">
						Show after 30 seconds
					</Select.Option>
					<Select.Option value="wait-60">
						Show after 60 seconds
					</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item
				label="is closable"
				name="isCloseable"
				valuePropName="checked"
			>
				<Switch
					onChange={onFormChange}
					defaultChecked
					checkedChildren="YES"
					unCheckedChildren="NO"
				/>
			</Form.Item>
			<Form.Item name="config">
				<Input.TextArea rows={2} />
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

const ReactionForm = ({
	id,
	fetchConfigList,
	postMessageToIframe
}: {
	id: string;
	fetchConfigList: () => void;
	postMessageToIframe: (type: string, payload?: any) => void;
}) => {
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);

	const onFormChange = () => {
		const { name, selector, type, effect } = form.getFieldsValue([
			'name',
			'selector',
			'type',
			'effect'
		]);
		form.setFieldsValue({
			config: JSON.stringify({
				type: 'action',
				data: {
					name,
					selector,
					type,
					effect
				}
			})
		});
		const el = document.querySelector('#animation-sample');
		if (el) {
			el.className = '';
			el.classList.add('animate__animated', effect);
		}
	};

	const onFormSubmit = () => {
		setBtnLoading(true);
		const { config } = form.getFieldsValue(['config']);
		message.loading('saving configs…');
		Api.config.add(id, config).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success('configs saved successfully');
				fetchConfigList();
			} else if (resposnse.status == 400) {
				message.warning(resposnse.data.errorMessage);
			} else {
				message.error('faild to save website configs');
			}
		});
		setBtnLoading(false);
	};

	return (
		<Form
			form={form}
			layout="horizontal"
			initialValues={{
				selector: '',
				type: 'hover',
				effect: 'animate__headShake'
			}}
			onChange={onFormChange}
			onSubmitCapture={onFormSubmit}
		>
			<Form.Item label="name" name="name">
				<Input placeholder="name" />
			</Form.Item>
			<Form.Item label="reaction type" name="type">
				<Select onChange={onFormChange}>
					<Select.Option value="hover">Hover</Select.Option>
				</Select>
			</Form.Item>
			<div
				id="animation-sample"
				style={{
					width: '80px',
					height: '40px',
					backgroundColor: '#ff0080'
				}}
			/>
			<Form.Item label="reaction animation effect" name="effect">
				<Select onChange={onFormChange}>
					<Select.Option value="animate__headShake">
						Head Shake
					</Select.Option>
					<Select.Option value="animate__flash">Falsh</Select.Option>
					<Select.Option value="animate__bounce">
						Bounce
					</Select.Option>
					<Select.Option value="animate__swing">Swing</Select.Option>
					<Select.Option value="animate__tada">Tada</Select.Option>
					<Select.Option value="animate__wobble">
						Wobble
					</Select.Option>
					<Select.Option value="animate__jello">Jello</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item label="selector">
				<Row gutter={8}>
					<Col span={12}>
						<Form.Item
							name="selector"
							noStyle
							rules={[
								{
									required: true,
									message: 'Please input the captcha you got!'
								}
							]}
						>
							<Input placeholder="#main > .item" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Button
							onClick={() => {
								scrollTo('#my-iframe');
								postMessageToIframe('enable-inspector');
								onInspected.addListener((selector) => {
									form.setFieldsValue({
										selector
									});
									scrollTo('#selector');
									onFormChange();
								});
							}}
						>
							Inspect Element
						</Button>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item name="config">
				<Input.TextArea rows={2} />
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

const onInspected = (() => {
	let action = (selector: string) => {};

	const addListener = (listener: (selector: string) => void) => {
		action = listener;
	};

	const run = (selector: string) => {
		action(selector);
		addListener((s) => {});
	};

	return {
		addListener,
		run
	};
})();

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
	const [type, setType] = useState('banner');
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

	const postMessageToIframe = (type: string, payload?: any) => {
		const frame = document.getElementById('my-iframe') as HTMLIFrameElement;
		frame.contentWindow?.postMessage({ type, payload }, iframeUrl);
	};

	const onReciveMessage = (message: MessageEvent) => {
		if (process.env.NODE_ENV !== 'production') {
			console.log({ messageFromChild: message });
		}
		const { type, payload } = message.data;
		switch (type) {
			case 'kio-loaded':
				postMessageToIframe('set-target-origin');
				break;

			case 'select-item':
				onInspected.run(payload);
				postMessageToIframe('disable-inspector');
				break;

			default:
				break;
		}
	};

	useEffect(() => {
		fetchConfigList();
		window.addEventListener('message', onReciveMessage);

		return () => {
			window.removeEventListener('message', onReciveMessage);
		};
	}, []);

	return (
		<div className="flex flex-col w-screen pt-10 items-center">
			<Row justify="center">
				<Title level={2}>reactions creator</Title>
			</Row>
			<Row justify="center">
				<Title level={3}>{iframeUrl}</Title>
			</Row>
			<Card title="configs" className="w-10/12">
				<ConfigsTable
					data={data}
					loading={loading}
					fetchConfigList={fetchConfigList}
				/>
			</Card>
			<Card
				title="Action Info"
				extra={
					<Select
						defaultValue="banner"
						style={{ width: 120 }}
						onChange={setType}
					>
						<Select.Option value="banner">Banner</Select.Option>
						<Select.Option value="reaction">Reaction</Select.Option>
					</Select>
				}
				className="w-10/12"
			>
				{type == 'banner' && (
					<BannerForm
						id={params.websiteId}
						fetchConfigList={fetchConfigList}
					/>
				)}
				{type == 'reaction' && (
					<ReactionForm
						id={params.websiteId}
						fetchConfigList={fetchConfigList}
						postMessageToIframe={postMessageToIframe}
					/>
				)}
			</Card>
			<Row>
				<Button
					title="Enable Inspector"
					type="primary"
					className="m-3"
					onClick={() => {
						postMessageToIframe('enable-inspector');
					}}
				>
					Enable Inspector
				</Button>
				<Button
					danger
					title="Disable Inspector"
					className="m-3"
					onClick={() => {
						postMessageToIframe('disable-inspector');
					}}
				>
					Disable Inspector
				</Button>
			</Row>
			<iframe
				id="my-iframe"
				src={iframeUrl}
				style={{
					width: '1000px',
					height: '800px',
					border: '1px solid #000'
				}}
			></iframe>
		</div>
	);
};

export default Actions;
