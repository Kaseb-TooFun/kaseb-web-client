import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import {
	Row,
	Card,
	Select,
	Typography,
	Form,
	Switch,
	Button,
	Input,
} from "antd";
const { Title } = Typography;

const BannerForm = () => {
	const [form] = Form.useForm();
	const onFormChange = () => {
		const {
			description,
			btnText,
			condition,
			isCloseable,
		} = form.getFieldsValue([
			"description",
			"btnText",
			"condition",
			"isCloseable",
		]);
		form.setFieldsValue({
			config: JSON.stringify({
				description,
				btnText,
				condition,
				isCloseable,
			}),
		});
	};
	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{
				description: '',
				btnText: '',
				condition: "wait-5",
				isCloseable: true,
			}}
			onChange={onFormChange}
		>
			<Form.Item label="description" name="description">
				<Input placeholder="banner description" />
			</Form.Item>
			<Form.Item label="Button Text" name="btnText">
				<Input placeholder="click me!" />
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
				<Input.TextArea rows={4} />
			</Form.Item>
			<Form.Item label=" " colon={false}>
				<Button type="primary" htmlType="submit">
					Save
				</Button>
			</Form.Item>
		</Form>
	);
};

const ModalForm = () => {
	return <p>modal content</p>;
};

const Actions = (props: RouteComponentProps) => {
	const [type, setType] = useState("banner");
	return (
		<div className="flex flex-col w-screen pt-10 items-center">
			<Row justify="center">
				<Title level={2}>Actions creator</Title>
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
						<Select.Option value="modal">Modal</Select.Option>
					</Select>
				}
				className="w-10/12"
			>
				{type == "banner" && <BannerForm />}
				{type == "modal" && <ModalForm />}
			</Card>
		</div>
	);
};

export default Actions;
