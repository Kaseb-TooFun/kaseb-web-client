import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Select, Form, Switch, Button, message, Input } from 'antd';
import Api from '_src/api';
import ColorSelector from '_pages/studio/components/ColorSelector';

interface IProps extends RouteComponentProps {
	previewReaction: (data: any) => void;
	websiteId: string;
}

const AddBanner = (props: IProps) => {
	const { previewReaction, websiteId } = props;
	const [form] = Form.useForm();
	const [data, setData] = useState({
		name: '',
		description: '',
		btnText: '',
		btnColor: '#ff0080',
		bgColor: '#ffbf00',
		url: '',
		template: 'top-banner',
		condition: 'wait-5',
		isCloseable: true
	});
	const [btnLoading, setBtnLoading] = useState(false);
	let timeoutHandler = 0;

	const onFormChange = () => {
		const {
			name,
			description,
			btnText,
			btnColor,
			bgColor,
			url,
			condition,
			template,
			isCloseable
		} = form.getFieldsValue([
			'name',
			'description',
			'btnText',
			'btnColor',
			'bgColor',
			'url',
			'condition',
			'template',
			'isCloseable'
		]);
		setData({
			name,
			template,
			description,
			url,
			btnText,
			btnColor,
			bgColor,
			condition,
			isCloseable
		});
		clearTimeout(timeoutHandler);
		timeoutHandler = window.setTimeout(preview, 1000);
	};

	const preview = () => {
		const {
			name,
			description,
			btnText,
			btnColor,
			bgColor,
			url,
			condition,
			template,
			isCloseable
		} = form.getFieldsValue([
			'name',
			'description',
			'btnText',
			'btnColor',
			'bgColor',
			'url',
			'condition',
			'template',
			'isCloseable'
		]);
		previewReaction({
			type: 'banner',
			data: {
				name,
				description,
				btnText,
				btnColor,
				bgColor,
				url,
				condition,
				template,
				isCloseable
			}
		});
	};

	const onFormSubmit = () => {
		setBtnLoading(true);
		const config = JSON.stringify({
			type: 'banner',
			data: { ...data }
		});
		message.loading('saving configs…');
		Api.config.add(websiteId, config).then((resposnse) => {
			if (resposnse.status == 200) {
				message.success('configs saved successfully');
				// fetchConfigList();
			} else if (resposnse.status == 400) {
				message.warning(resposnse.data.errorMessage);
			} else {
				message.error('faild to save website configs');
			}
		});
		setBtnLoading(false);
	};

	return (
		<div className="mt-3">
			<Button className="my-btn" onClick={preview}>
				preview
			</Button>

			<Form
				form={form}
				layout="vertical"
				initialValues={{
					description: '',
					btnText: 'Press Me',
					btnColor: '#ff0080',
					bgColor: '#ffbf00',
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

				<Form.Item label="Background Color" name="bgColor">
					<Input placeholder="#ffbf00"/>
				</Form.Item>

				<ColorSelector
					defaultColor="#fff"
					onSelect={(color) => {
						form.setFieldsValue({ bgColor: color });
						onFormChange();
					}}
				/>
				<Form.Item label="Button Text" name="btnText">
					<Input placeholder="click me!" />
				</Form.Item>
				<Form.Item label="Button Link" name="url">
					<Input placeholder="https://www.example.com" type="url" />
				</Form.Item>

				<Form.Item label="Button Color" name="btnColor">
					<Input placeholder="#ff0080"/>
				</Form.Item>

				<ColorSelector
					defaultColor="#fff"
					onSelect={(color) => {
						form.setFieldsValue({ btnColor: color });
						onFormChange();
					}}
				/>

				<Form.Item label="Template" name="template">
					<Select onChange={onFormChange}>
						<Select.Option value="top-banner">
							top banner
						</Select.Option>
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
		</div>
	);
};

export default AddBanner;
