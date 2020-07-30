import React, { useState } from "react";
import { Button, Row, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
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

const Login = (props: RouteComponentProps) => {
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);
	const navigate = useNavigate();

	const onFinish = () => {
		setBtnLoading(true);
		const { email, password } = form.getFieldsValue(["email", "password"]);
		Api.auth.login(email, password).then((resposnse) => {
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

	const onFinishFailed = () => {
		message.error("please fill the form with valid data");
	};

	return (
		<Row className="w-screen p-5 pt-10 justify-center items-center">
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
					name="email"
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
							<MailOutlined className="site-form-item-icon" />
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
								Log in
							</Button>
							<Link to="../sign-up">
								<span>sign up</span>
							</Link>
						</Row>
					)}
				</Form.Item>
			</Form>
		</Row>
	);
};

export default Login;
