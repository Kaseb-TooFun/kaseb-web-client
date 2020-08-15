import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Select, Form, Switch, Button, message, Input, Steps } from 'antd';
import Api from '_src/api';
import ColorSelector from '_pages/studio/components/ColorSelector';

const { Step } = Steps;
const defaultBtnColor = "#ff0080";
const defaultBgColor = "#ffbf00";
const availableFonts = [
	"Arial",
	"Helvetica",
	"Cursive",
	"Charcoal",
	"Lucida Grande",
	"Tahoma",
	"Trebuchet MS",
	"Verdana",
	"Courier",
	"Monaco",

];

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
		btnColor: defaultBtnColor,
		bgColor: defaultBgColor,
		opacity: 1,
		fontFamily: "Arial",
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
			opacity,
			fontFamily,
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
			'opacity',
			'fontFamily',
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
			opacity,
			fontFamily,
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
			opacity,
			fontFamily,
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
			'opacity',
			'fontFamily',
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
				opacity,
				fontFamily,
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
				message.error('failed to save website configs');
			}
		});
		setBtnLoading(false);
	};

	const [currentStep, setCurrentStep] = useState(0)
	const steps	= [
		{
			title: '',
			content: <>
				<Form.Item label="name" name="name">
					<Input placeholder="name" />
				</Form.Item>
				<Form.Item label="description" name="description">
					<Input placeholder="banner description" />
				</Form.Item>
				<Form.Item label="Font" name="fontFamily">
					<Select onChange={onFormChange} defaultValue={availableFonts[0]}>
						{availableFonts.map((font) => (
							<Select.Option value={font}>
								{font}
							</Select.Option>
						))}
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
			</>
		},
		{
			title: '',
			content: <>
				<Form.Item label="Background Color" name="bgColor">
					<Input placeholder={defaultBgColor}/>
				</Form.Item>

				<ColorSelector
					defaultColor={defaultBgColor}
					onSelect={(color) => {
						form.setFieldsValue({ bgColor: color });
						onFormChange();
					}}
				/>

				<Form.Item label="Opacity" name="opacity">
					<Input defaultValue={1} type="number" step=".05" min={0} max={1}/>
				</Form.Item>
			</>
		},
		{
			title: '',
			content: <>
				<Form.Item label="Button Text" name="btnText">
					<Input placeholder="click me!" />
				</Form.Item>
				<Form.Item label="Button Link" name="url">
					<Input placeholder="https://www.example.com" type="url" />
				</Form.Item>

				<Form.Item label="Button Color" name="btnColor">
					<Input placeholder={defaultBtnColor}/>
				</Form.Item>

				<ColorSelector
					defaultColor={defaultBtnColor}
					onSelect={(color) => {
						form.setFieldsValue({ btnColor: color });
						onFormChange();
					}}
				/>
			</>
		},
		{
			title: '',
			content: <>
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
			</>
		}
	]

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
				<Steps current={currentStep}>
					{steps.map((item, index) => (
						<Step key={index} title={item.title}/>
					))}
				</Steps>

				<div className="steps-content">
					{steps[currentStep].content}
				</div>

				<div className="steps-action">
					<Button onClick={() => setCurrentStep(currentStep-1)}
						disabled={currentStep <= 0}
					>
						Previous
					</Button>
					<Button onClick={() => setCurrentStep(currentStep+1)}
							disabled={currentStep >= (steps.length - 1)}
					>
						Next
					</Button>
				</div>

				<Form.Item shouldUpdate={true} className="btn-save">
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
