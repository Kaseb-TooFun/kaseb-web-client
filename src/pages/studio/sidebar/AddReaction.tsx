import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Select, Form, Switch, Button, message, Input, Steps, Divider } from 'antd';
import { BackwardFilled } from "@ant-design/icons";
import Api from '_src/api';
import ColorSelector from '_pages/studio/components/ColorSelector';
import AllTriggerOptions from "_pages/studio/components/TriggerOptions";
import AllReactionTypeOptions from "_pages/studio/components/ReactionTypeOptions";
import DestInspector from "_pages/studio/components/DestSelectorInspector"
import CssEditor from "_pages/studio/components/CssEditor"

const { Step } = Steps;

const defaultBgColor = "#0cc97a";
const defaultTitleColor = "#e63f39";
const defaultTextColor = "#1f76cd";
const defaultBtnColor = "#fcdc0b";
const defaultBtnTextColor = "#e63f39";

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
	postMessageToIframe: (type: string) => void;
	selector: string;
	setSelector: (s: string) => void;
	destSelector: string;
	setDestSelector: (s: string) => void;
}

const AddReaction = (props: IProps) => {
	const { previewReaction, websiteId, postMessageToIframe,
		selector, setSelector, destSelector, setDestSelector } = props;
	const [form] = Form.useForm();
	const [reactionName, setReactionName] = useState('')
	const [reactionType, setReactionType] = useState('')
	const [data, setData] = useState({
		title: '',
		description: '',
		btnText: '',
		btnColor: defaultBtnColor,
		bgColor: defaultBgColor,
		titleColor: defaultTitleColor,
		textColor: defaultTextColor,
		btnTextColor: defaultBtnTextColor,
		opacity: 1,
		fontFamily: "Arial",
		url: '',
		condition: '',
		isCloseable: true,
		isRTL: true,
		showOnce: true,
		customStyle: "",
	});
	const [btnLoading, setBtnLoading] = useState(false);
	let timeoutHandler = 0;

	const onFormChange = () => {
		const {
			title,
			description,
			btnText,
			btnColor,
			bgColor,
			titleColor,
			textColor,
			btnTextColor,
			opacity,
			fontFamily,
			url,
			condition,
			isCloseable,
			isRTL,
			showOnce,
			customStyle,
		} = form.getFieldsValue([
			'title',
			'description',
			'btnText',
			'btnColor',
			'bgColor',
			'titleColor',
			'textColor',
			'btnTextColor',
			'opacity',
			'fontFamily',
			'url',
			'condition',
			'isCloseable',
			'isRTL',
			'showOnce',
			'customStyle',
		]);
		setData({
			title,
			description,
			url,
			btnText,
			btnColor,
			opacity,
			fontFamily,
			bgColor,
			titleColor,
			textColor,
			btnTextColor,
			condition,
			isCloseable,
			isRTL,
			showOnce,
			customStyle
		});
		clearTimeout(timeoutHandler);
		timeoutHandler = window.setTimeout(preview, 1000);
	};

	const preview = () => {
		const {
			title,
			description,
			btnText,
			btnColor,
			bgColor,
			titleColor,
			textColor,
			btnTextColor,
			opacity,
			fontFamily,
			url,
			condition,
			isCloseable,
			isRTL,
			showOnce,
			customStyle,
		} = form.getFieldsValue([
			'title',
			'description',
			'btnText',
			'btnColor',
			'bgColor',
			'titleColor',
			'textColor',
			'btnTextColor',
			'opacity',
			'fontFamily',
			'url',
			'condition',
			'isCloseable',
			'isRTL',
			'showOnce',
			'customStyle',
		]);
		let actionType = "";
		switch (condition) {
			case "on-click":
				actionType = "click"
				break
			case "on-hover":
				actionType = "hover"
				break
			default:
				break
		}
		previewReaction({
			type: reactionType,
			data: {
				title,
				description,
				btnText,
				btnColor,
				bgColor,
				titleColor,
				textColor,
				btnTextColor,
				opacity,
				fontFamily,
				url,
				condition,
				isCloseable,
				isRTL,
				showOnce,
				customStyle,
				// Add another values
				template: reactionType !== "action"? reactionName: "",
				effect: reactionType === "action"? reactionName: "",
				sourceSelector: selector,
				destSelector: destSelector,
				once: showOnce,
				type: actionType,
			}
		});
	};

	const onFormSubmit = () => {
		setBtnLoading(true);
		let actionType = "";
		switch (data.condition) {
			case "on-click":
				actionType = "click"
				break
			case "on-hover":
				actionType = "hover"
				break
			default:
				break
		}
		const config = JSON.stringify({
			type: reactionType,
			data: {
				...data,
				// Add another values
				template: reactionType !== "action"? reactionName: "",
				effect: reactionType === "action"? reactionName: "",
				sourceSelector: selector,
				destSelector: destSelector,
				once: data.showOnce,
				type: actionType,
			},
		});
		message.loading('در حال ذخیره تنظیمات');
		Api.config.add(websiteId, config).then((response) => {
			if (response.status == 200) {
				message.success('تنظیمات با موفقیت ذخیره شد');
				// fetchConfigList();
			} else if (response.status == 400) {
				message.warning(response.data.errorMessage);
			} else {
				message.error('تنظیمات ذخیره نشد');
			}
		});
		setBtnLoading(false);
	};

	const triggerOptionsOnFinished = (condition: string) => {
		form.setFieldsValue({ condition: condition });
		onFormChange();
	};

	// const colorInputsData = [
	// 	{name: "bgColor", defaultValue: defaultBgColor, label: "رنگ پس زمینه"},
	// 	{name: "titleColor", defaultValue: defaultTitleColor, label: "رنگ عنوان"},
	// 	{name: "textColor", defaultValue: defaultTextColor, label: "رنگ متن"},
	// 	{name: "btnColor", defaultValue: defaultBtnColor, label: "رنگ پس‌زمینه دکمه"},
	// 	{name: "btnTextColor", defaultValue: defaultBtnTextColor, label: "رنگ متن دکمه"},
	// ]

	let colorsDiv = <>
		<div className="my-input-label">
			{"رنگ پس زمینه"}
		</div>
		<Form.Item label={null} name={"bgColor"}>
			<Input className="my-input" placeholder={defaultBgColor}/>
		</Form.Item>
		<ColorSelector
			color={data.bgColor}
			onSelect={(color) => {
				form.setFieldsValue({bgColor: color});
				onFormChange();
			}}
		/>

		<div className="my-input-label">
			{"رنگ عنوان"}
		</div>
		<Form.Item label={null} name={"titleColor"}>
			<Input className="my-input" placeholder={defaultTitleColor}/>
		</Form.Item>
		<ColorSelector
			color={data.titleColor}
			onSelect={(color) => {
				form.setFieldsValue({titleColor: color});
				onFormChange();
			}}
		/>

		<div className="my-input-label">
			{"رنگ متن"}
		</div>
		<Form.Item label={null} name={"textColor"}>
			<Input className="my-input" placeholder={defaultTextColor}/>
		</Form.Item>
		<ColorSelector
			color={data.textColor}
			onSelect={(color) => {
				form.setFieldsValue({textColor: color});
				onFormChange();
			}}
		/>

		<div className="my-input-label">
			{"رنگ پس‌زمینه دکمه"}
		</div>
		<Form.Item label={null} name={"btnColor"}>
			<Input className="my-input" placeholder={defaultBtnColor}/>
		</Form.Item>
		<ColorSelector
			color={data.btnColor}
			onSelect={(color) => {
				form.setFieldsValue({btnColor: color});
				onFormChange();
			}}
		/>

		<div className="my-input-label">
			{"رنگ متن دکمه"}
		</div>
		<Form.Item label={null} name={"btnTextColor"}>
			<Input className="my-input" placeholder={defaultBtnTextColor}/>
		</Form.Item>
		<ColorSelector
			color={data.btnTextColor}
			onSelect={(color) => {
				form.setFieldsValue({btnTextColor: color});
				onFormChange();
			}}
		/>

		{/*{colorInputsData.map((colorData) => {*/}
			{/*	return (*/}
			{/*		<>*/}
			{/*			<div className="my-input-label">*/}
			{/*				{colorData.label}*/}
			{/*			</div>*/}
			{/*			<Form.Item label={null} name={colorData.name}>*/}
			{/*				<Input className="my-input" placeholder={colorData.defaultValue}/>*/}
			{/*			</Form.Item>*/}
			{/*			<ColorSelector*/}
			{/*				defaultColor={data[colorData.name]}*/}
			{/*				onSelect={(color) => {*/}
			{/*					form.setFieldsValue({[colorData.name]: color});*/}
			{/*					onFormChange();*/}
			{/*				}}*/}
			{/*			/>*/}
			{/*		</>*/}
			{/*	)*/}
			{/*})*/}
			{/*}*/}
	</>

	let contentCardForm;
	if (reactionType === "banner" || reactionType === "modal") {
		contentCardForm = <div className="base-color" dir="rtl">
			<h2 className="form-header">محتوا</h2>
			<p className="form-message">
				لطفا محتوای مورد نظر خود که در لایه محتوایی نمایش داده می‌شود یا از کاربر پرسیده می‌شود را تنظیم کنید
			</p>

			<div className="my-input-label">
				عنوان محتوا
			</div>
			<Form.Item label={null} name="title">
				<Input className="my-input" placeholder="عنوان محتوا" defaultValue={data.title}/>
			</Form.Item>

			<div className="my-input-label">
				متن
			</div>
			<Form.Item label={null} name="description">
				<Input.TextArea className="my-input" placeholder="" rows={3}/>
			</Form.Item>

			<div className="my-input-label">
				متن دکمه
			</div>
			<Form.Item label={null} name="btnText">
				<Input className="my-input" placeholder="اینجا کلیک کن" />
			</Form.Item>

			<Form.Item label={null} name="url">
				<Input className="my-input" placeholder="لینک" type="url" />
			</Form.Item>

			{/*TODO: Upload Image*/}

			{/*TODO: get inputs? email, phone, name*/}

			<Divider style={{color: "#af9b18"}}>
				رنگ
			</Divider>

			{colorsDiv}

			<div className="my-input-label">
				فونت محتوا
			</div>
			<Form.Item label={null} name="fontFamily">
				<Select className="my-input"
						onChange={onFormChange}
						defaultValue={availableFonts[0]}
				>
					{availableFonts.map((font) => (
						<Select.Option value={font}>
							{font}
						</Select.Option>
					))}
				</Select>
			</Form.Item>

			<div className="my-input-label">
				جهت متن؟
			</div>
			<Form.Item
				label={null}
				name="isRTL"
				valuePropName="checked"
			>
				<Switch
					onChange={onFormChange}
					defaultChecked={true}
					checkedChildren="راست‌چین"
					unCheckedChildren="چپ‌چین"
				/>
			</Form.Item>

			<div className="my-input-label">
				قابل بسته شدن؟
			</div>
			<Form.Item
				label={null}
				name="isCloseable"
				valuePropName="checked"
			>
				<Switch
					onChange={onFormChange}
					defaultChecked
					checkedChildren="بله"
					unCheckedChildren="خیر"
				/>
			</Form.Item>

			<div className="my-input-label">
				یک بار نمایش برای هر کاربر؟
			</div>
			<Form.Item
				label={null}
				name="showOnce"
				valuePropName="checked"
			>
				<Switch
					onChange={onFormChange}
					defaultChecked={true}
					checkedChildren="یک‌بار"
					unCheckedChildren="مدام"
				/>
			</Form.Item>

			{/*<Form.Item label="Opacity" name="opacity">*/}
			{/*	<Input defaultValue={1} type="number" step=".05" min={0} max={1}/>*/}
			{/*</Form.Item>*/}
		</div>
	} else {
		contentCardForm = <div className="base-color" dir="rtl">
			<h2 className="form-header">استایل</h2>
			{/*<p className="form-message">*/}
			{/*</p>*/}

			<div className="my-input-label">
				المان مقصد
			</div>
			<DestInspector
				destSelector={destSelector}
				setDestSelector={setDestSelector}
				postMessageToIframe={postMessageToIframe}
			/>

			<div className="my-input-label">
				یک بار نمایش برای هر کاربر؟
			</div>
			<Form.Item
				label={null}
				name="showOnce"
				valuePropName="checked"
			>
				<Switch
					onChange={onFormChange}
					defaultChecked={true}
					checkedChildren="یک‌بار"
					unCheckedChildren="مدام"
				/>
			</Form.Item>

			<Divider style={{color: "#af9b18"}}>
				ویرایشگر استایل
			</Divider>

			{/*<div style={}>*/}
				<CssEditor
					value={data.customStyle}
					setValue={(customStyle) => {
						form.setFieldsValue({customStyle})
						onFormChange()
					}}
				/>
			{/*</div>*/}


		</div>
	}

	const [currentStep, setCurrentStep] = useState(0)
	const steps	= [
		{
			// 1- select trigger
			title: '',
			content: <div className="base-color" dir="rtl">
				<h2 className="form-header">راه‌انداز</h2>
				<p className="form-message">
					نوع راه انداز واکنش خود را از لیست زیر انتخاب کنید
				</p>
				{
					<AllTriggerOptions
						onSelectFinished={triggerOptionsOnFinished}
						condition={data.condition}
						selector={selector}
						setSelector={setSelector}
						postMessageToIframe={postMessageToIframe}
					/>
				}
			</div>
		},
		{
			// 2 - select reaction type
			title: '',
			content: <div className="base-color" dir="rtl">
				<h2 className="form-header">واکنش</h2>
				<p className="form-message">
					نوع واکنش خود را انتخاب کنید
				</p>
				<p className="form-message">
					اگر نوع واکنش شما از نوع انیمیشن روی المان می‌باشد نیاز به تعریف کارت محتوا نیست
				</p>
				{<AllReactionTypeOptions
					reactionName={reactionName}
					setReactionName={setReactionName}
					setReactionType={setReactionType}
				/>}
			</div>,
		},
		// {
		// 	// 3 - title and use-inputs
		// 	title: '',
		// 	content: <div className="base-color" dir="rtl">
		//
		// 		<div className="my-input-label">
		// 			عنوان محتوا
		// 		</div>
		// 		<Form.Item label={null} name="title">
		// 			<Input className="my-input" placeholder="عنوان محتوا" defaultValue={data.title}/>
		// 		</Form.Item>
		// 	</div>
		// },
		{
			// 3 - content card
			title: '',
			content: contentCardForm,
		},
		{
			// 4 - goal
			title: '',
			content: <div className="base-color" dir="rtl">
				<h2 className="form-header">هدف</h2>
			</div>
		}
	]

	let stepsAction;
	if (currentStep === -1) {
		// not used
		stepsAction = <>
			<Button onClick={() => {
				setCurrentStep(currentStep-1)
				let sidebar = document.getElementById("my-sidebar")
				if (sidebar) sidebar.scrollTop = 0
			}}
				disabled={currentStep <= 0}
			>
				Previous
			</Button>
			<Button onClick={() => setCurrentStep(currentStep+1)}
					disabled={currentStep >= (steps.length - 1)}
			>
				Next
			</Button>
		</>
	} else if (currentStep === 0) {
		stepsAction = <>
			<Button onClick={() => {
				setCurrentStep(currentStep+1);
				let sidebar = document.getElementById("my-sidebar")
				if (sidebar) sidebar.scrollTop = 0
			}
			}
					disabled={data.condition === ""}
					style={{backgroundColor: "#e4ce3f", borderRadius: "70px", width: "12rem", height: "2.5rem"}}
			>
				<span style={{color: "white", fontSize: "20px"}}>
					ساخت واکنش
				</span>
			</Button>
		</>
	} else if (currentStep === 1) {
		stepsAction = <>
			<Button onClick={() => {
				setCurrentStep(currentStep+1);
				let sidebar = document.getElementById("my-sidebar")
				if (sidebar) sidebar.scrollTop = 0
			}}
					disabled={reactionName === ""}
					style={{backgroundColor: "#e4ce3f", borderRadius: "70px", width: "19rem", height: "2.5rem"}}
			>
				<span style={{color: "white", fontSize: "20px"}}>
					ادامه
				</span>
			</Button>
		</>
	} else if (currentStep === 2) {
		stepsAction = <>
			<Button onClick={() => {
				setCurrentStep(currentStep+1);
				let sidebar = document.getElementById("my-sidebar")
				if (sidebar) sidebar.scrollTop = 0
				onFormSubmit()
			}}
					// disabled={data.condition === ""}
					style={{backgroundColor: "#e4ce3f", borderRadius: "70px", width: "19rem", height: "2.5rem"}}
			>
				<span style={{color: "white", fontSize: "20px"}}>
					{(reactionType === "banner" || reactionType === "modal")?
						"اضافه کردن کارت محتوایی":
						"ذخیره استایل"
					}
				</span>
			</Button>
		</>
	} else if (currentStep === 3) {
		// stepsAction = <>
		// 	<Button onClick={() => {
		// 		setCurrentStep(currentStep+1);
		// 		onFormSubmit()
		// 	}}
		// 			disabled={data.condition.length == 0}
		// 			style={{backgroundColor: "#e4ce3f", borderRadius: "70px", width: "19rem", height: "2.5rem"}}
		// 	>
		// 		<span style={{color: "white", fontSize: "20px"}}>
		// 			ذخیره
		// 		</span>
		// 	</Button>
		// </>
	}

	return (
		<div className="mt-3" style={{textAlign: "center"}}>

			<Button className="my-btn" onClick={preview}>
				پیش‌نمایش
			</Button>

			<Form
				form={form}
				layout="vertical"
				initialValues={{
					title: '',
					description: '',
					btnText: '',
					btnColor: defaultBtnColor,
					bgColor: defaultBgColor,
					titleColor: defaultTitleColor,
					textColor: defaultTextColor,
					btnTextColor: defaultBtnTextColor,
					opacity: 1,
					fontFamily: "Arial",
					url: '',
					condition: '',
					isCloseable: true,
					isRTL: true,
					showOnce: true,
				}}
				onChange={onFormChange}
				onSubmitCapture={onFormSubmit}
			>
				<div style={{display: "inline-flex"}}>
					<Button onClick={() => {setCurrentStep(currentStep-1)}}
							disabled={currentStep == 0}
							title={"مرحله قبل"}
							style={{margin: "5px"}}
					>
						<BackwardFilled />
					</Button>
					<Steps current={currentStep}>
						{steps.map((item, index) => (
							<Step key={index} title={item.title}/>
						))}
					</Steps>
				</div>

				<div className="steps-content">
					{steps[currentStep].content}
				</div>

				<div className="steps-action" style={{textAlign: "center",display: "inherit"}}>
					{stepsAction}
				</div>

			</Form>
		</div>
	);
};

export default AddReaction;
