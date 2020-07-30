import React, { useState } from "react";
import { Button, Row, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { RouteComponentProps, Link, useNavigate } from "@reach/router";
import Api from "_src/api";

const formItemLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 8 },
};

const formTailLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 8, offset: 0, md: { offset: 8 } },
};

const SignUp = (props: RouteComponentProps) => {
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);
	const navigate = useNavigate();

	const login = (username: string, password: string) => {
		Api.auth.login(username, password).then((resposnse) => {
			if (resposnse.status == 200) {
				Api.setAuthHeader(resposnse.data.token);
				message.success("successful login", 1);
				message.loading("redirecting to dashboard…", 1).then(
					() => {
						navigate("dashboard", { replace: true });
					},
					() => {}
				);
			} else {
				message.error("username or password is incorrect");
				setBtnLoading(false);
			}
		});
	};

	const onFinish = () => {
		setBtnLoading(true);
		const { username, password } = form.getFieldsValue([
			"username",
			"password",
		]);

		Api.auth.signup(username, password).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success("successful register", 2).then(
					() => login(username, password),
					() => {}
				);
			} else {
				message.error("failed to register");
				setBtnLoading(false);
			}
		});
	};

	const onFinishFailed = () => {
		message.error("please fill the form with valid data");
	};

	return (
		<Row className="w-screen h-screen p-5 justify-center items-center">
			<Form
				name="login-form"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				className="w-full"
			>
				<Form.Item
					{...formItemLayout}
					label="Email"
					name="username"
					validateTrigger="onBlur"
					rules={[
						{
							required: true,
							message: "Please input your email!",
						},
						{
							type: "email",
							message: "email not valid",
						},
					]}
				>
					<Input
						prefix={
							<UserOutlined className="site-form-item-icon" />
						}
					/>
				</Form.Item>

				<Form.Item
					{...formItemLayout}
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password
						prefix={
							<LockOutlined className="site-form-item-icon" />
						}
					/>
				</Form.Item>

				<Form.Item
					{...formItemLayout}
					name="confirm"
					label="Confirm Password"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (
									!value ||
									getFieldValue("password") === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									"The two passwords that you entered do not match!"
								);
							},
						}),
					]}
				>
					<Input.Password
						prefix={
							<LockOutlined className="site-form-item-icon" />
						}
					/>
				</Form.Item>

				<Form.Item {...formTailLayout} shouldUpdate={true}>
					{() => (
						<Row className="justify-between items-center">
							<Button
								type="primary"
								htmlType="submit"
								loading={btnLoading}
								disabled={
									!form.isFieldsTouched(true) ||
									form
										.getFieldsError()
										.filter(({ errors }) => errors.length)
										.length > 0
								}
								className="login-form-button"
							>
								Register
							</Button>
							<Link to="../login">
								<span>back to login</span>
							</Link>
						</Row>
					)}
				</Form.Item>
			</Form>
		</Row>
	);
};

export default SignUp;
