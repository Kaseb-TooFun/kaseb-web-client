import React, { useState } from "react";
import { Button, Row, Form, Input, message, Alert } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { RouteComponentProps, Link, useNavigate } from "@reach/router";
import Api from "../../api";

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
		if (
			email.toLocaleLowerCase() == "admin@demo.com" &&
			password == "demo"
		) {
			message.success("successful login", 2).then(
				() => {
					message.loading("redirecting to dashboard…", 1);
					setTimeout(() => {
						navigate("dashboard", { replace: true });
					}, 1000);
				},
				() => {}
			);
		} else {
			message.error("username or password is incorrect");
			setBtnLoading(false);
		}
		// Api.server.login(email, password).then((resposnse) => {
		// 	if (resposnse.status == 200) {
		// 		message.success("successful login", 2).then(
		// 			() => {
		// 				message.loading("redirecting to dashboard…", 1);
		// 				setTimeout(() => {
		// 					navigate("dashboard", { replace: true });
		// 				}, 1000);
		// 			},
		// 			() => {}
		// 		);
		// 	} else {
		// 		message.error("username or password is incorrect");
		// 		setBtnLoading(false);
		// 	}
		// });
	};

	const onFinishFailed = () => {
		message.error("please fill the form with valid data");
	};

	return (
		<>
			<Alert
				type="info"
				closable
				message="email: admin@demo.com"
				banner
			/>
			<Alert type="info" closable message="password: demo" banner />
			<Row className="w-screen p-5 pt-10 justify-center items-center">
				<Form
					name="login-form"
					form={form}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					className="w-full"
				>
					<Form.Item
						{...formItemLayout}
						label="Email"
						name="email"
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
											.filter(
												({ errors }) => errors.length
											).length > 0
									}
									className="login-form-button"
								>
									Log in
								</Button>
								<Link to="../sign-up">
									<span>back to login</span>
								</Link>
							</Row>
						)}
					</Form.Item>
				</Form>
			</Row>
		</>
	);
};

export default Login;
