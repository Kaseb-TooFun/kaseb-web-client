import React, { useState } from 'react';
import { Button, Row, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RouteComponentProps, Link, useNavigate } from '@reach/router';
import Api, { setAxiosToken } from 'src/api';
import { saveUserToken } from 'src/utils/user';

const formItemLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 8 }
};

const formTailLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 8, offset: 0, md: { offset: 8 } }
};

const SignUp = (props: RouteComponentProps) => {
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);
	const navigate = useNavigate();

	const onFinish = () => {
		setBtnLoading(true);
		const { username, password } = form.getFieldsValue([
			'username',
			'password'
		]);

		Api.auth.signup(username, password).then((resposnse) => {
			if (resposnse.status == 200) {
				saveUserToken(resposnse.data.token);
				setAxiosToken(resposnse.data.token);
				message.success('ثبت نام با موفقیت انجام شد', 1);
				message.loading('در حال انتقال به صفحه پیشخوان', 1).then(
					() => {
						navigate('dashboard', { replace: true });
					},
					() => {}
				);
			} else if (resposnse.status == 404) {
				message.error(resposnse.data.errorMessage);
				setBtnLoading(false);
			} else {
				message.error('ثبت نام به اتمام نرسید. لطفا مجددا تلاش نمایید');
				setBtnLoading(false);
			}
		});
	};

	const onFinishFailed = () => {
		message.error('please fill the form with valid data');
	};

	return (
		<Row className="w-screen h-screen p-5 justify-center items-center">
			{/*<Row justify="center">*/}
			<img
				src="/icons/kaseb.logo.1.png"
				width={'350px'}
				alt="kaseb logo"
			/>
			{/*</Row>*/}
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
							message: 'Please input your email!'
						},
						{
							type: 'email',
							message: 'email not valid'
						}
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
							message: 'Please input your password!'
						}
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
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!'
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (
									!value ||
									getFieldValue('password') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									'The two passwords that you entered do not match!'
								);
							}
						})
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
								className="login-form-button kaseb-btn"
							>
								ثبت نام
							</Button>
							<Link to="../login">
								<span style={{ color: '#af9b18' }}>
									بازگشت به صفحه ورود
								</span>
							</Link>
						</Row>
					)}
				</Form.Item>
			</Form>
		</Row>
	);
};

export default SignUp;
