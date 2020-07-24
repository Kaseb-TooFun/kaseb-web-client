import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "@reach/router";
import {
	Row,
	Card,
	Select,
	Typography,
	Form,
	Switch,
	Button,
	message,
	Input,
} from "antd";
const { Title } = Typography;
import Api from "_src/api";

const BannerForm = ({ id }: { id: string }) => {
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);
	const onFormChange = () => {
		const {
			description,
			btnText,
			condition,
			template,
			isCloseable,
		} = form.getFieldsValue([
			"description",
			"btnText",
			"condition",
			"template",
			"isCloseable",
		]);
		form.setFieldsValue({
			config: JSON.stringify({
				type: "banner",
				data: {
					template,
					description,
					btnText,
					condition,
					isCloseable,
				},
			}),
		});
	};

	const onFormSubmit = () => {
		setBtnLoading(true);
		const { config } = form.getFieldsValue(["config"]);
		message.loading("saving configs…");
		Api.website.setConfig(id, config).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success("configs saved successfully");
			} else if (resposnse.status == 400) {
				message.warning(resposnse.data.errorMessage);
			} else {
				message.error("faild to save website configs");
			}
		});
		setBtnLoading(false);
	};

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{
				description: "",
				btnText: "",
				template: "top-banner",
				condition: "wait-5",
				isCloseable: true,
			}}
			onChange={onFormChange}
			onSubmitCapture={onFormSubmit}
		>
			<Form.Item label="description" name="description">
				<Input placeholder="banner description" />
			</Form.Item>
			<Form.Item label="Button Text" name="btnText">
				<Input placeholder="click me!" />
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
			<Form.Item label="is closable?" name="isCloseable">
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

const ReactionForm = ({ id }: { id: string }) => {
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);

	const onFormChange = () => {
		const { selector, type, effect } = form.getFieldsValue([
			"selector",
			"type",
			"effect",
		]);
		form.setFieldsValue({
			config: JSON.stringify({
				type: "action",
				data: {
					selector,
					type,
					effect,
				},
			}),
		});
		const el = document.querySelector("#animation-sample");
		if (el) {
			el.className = "";
			el.classList.add("animate__animated", effect);
		}
	};

	const onFormSubmit = () => {
		setBtnLoading(true);
		const { config } = form.getFieldsValue(["config"]);
		message.loading("saving configs…");
		Api.website.setConfig(id, config).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success("configs saved successfully");
			} else if (resposnse.status == 400) {
				message.warning(resposnse.data.errorMessage);
			} else {
				message.error("faild to save website configs");
			}
		});
		setBtnLoading(false);
	};

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{
				selector: "",
				type: "hover",
				effect: "animate__headShake",
			}}
			onChange={onFormChange}
			onSubmitCapture={onFormSubmit}
		>
			<Form.Item label="reaction type" name="type">
				<Select onChange={onFormChange}>
					<Select.Option value="hover">Hover</Select.Option>
				</Select>
			</Form.Item>
			<div
				id="animation-sample"
				style={{
					width: "80px",
					height: "40px",
					backgroundColor: "#ff0080",
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
			<Form.Item label="selector" name="selector">
				<Input placeholder="#main > .item" />
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

const Actions = (props: RouteComponentProps) => {
	const [type, setType] = useState("banner");
	const params = useParams();

	useEffect(() => {
		Api.website.getConfig("www.hexboy.ir");
	}, []);

	return (
		<div className="flex flex-col w-screen pt-10 items-center">
			<Row justify="center">
				<Title level={2}>reactions creator</Title>
			</Row>
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
				{type == "banner" && <BannerForm id={params.websiteId} />}
				{type == "reaction" && <ReactionForm id={params.websiteId} />}
			</Card>
		</div>
	);
};

export default Actions;
