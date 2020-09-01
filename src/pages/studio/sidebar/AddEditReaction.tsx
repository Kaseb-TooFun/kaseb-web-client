import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Select, Form, Switch, Button, message, Input, Steps, Divider } from 'antd';
import Api from '_src/api';
import ColorSelector from '_pages/studio/components/ColorSelector';
import AllTriggerOptions from "_pages/studio/components/TriggerOptions";
import AllReactionTypeOptions from "_pages/studio/components/ReactionTypeOptions";
import DestInspector from "_pages/studio/components/DestSelectorInspector"
import CssEditor from "_pages/studio/components/CssEditor"
import AllGoalTypeOptions from "_pages/studio/components/GoalTypeOptions";

const defaultBgColor = "#0cc97a";
const defaultTitleColor = "#e63f39";
const defaultTextColor = "#1f76cd";
const defaultBtnColor = "#fcdc0b";
const defaultBtnTextColor = "#e63f39";

const darkBaseColor = "#af9b18";

const persianAvailableFonts = [
	{key: "kio-IRANSans", showName: "ایران سنس"},
	{key: "kio-Sahel", showName: "ساحل"},
	{key: "kio-Shabnam", showName: "شبنم"},
	{key: "kio-Vazir", showName: "وزیر"},
]

// const availableFonts = [
// 	"IRANSans",
// 	"Sahel",
// 	"Shabnam",
// 	"Vazir",
// 	// "Arial",
// 	// "Helvetica",
// 	// "Cursive",
// 	// "Charcoal",
// 	// "Lucida Grande",
// 	// "Tahoma",
// 	// "Trebuchet MS",
// 	// "Verdana",
// 	// "Courier",
// 	// "Monaco",
// ];

interface IProps extends RouteComponentProps {
	configInitialData: {
		id: string,
		name: string,
		goalType: string,
		goalLink: string,
		type: string,
		values: {
			title: string,
			description: string,
			btnText: string,
			btnColor: string,
			bgColor: string,
			titleColor: string,
			textColor: string,
			btnTextColor: string,
			opacity: string,
			fontFamily: string,
			url: string,
			condition: string,
			isCloseable: boolean,
			isRTL: boolean,
			showOnce: boolean,
			customStyle: string,
			template: string,
			effect: string,
			sourceSelector: string,
			destSelector: string,
			once: boolean,
			type: string,
		}
	}
	previewReaction: (data: any) => void;
	websiteId: string;
	postMessageToIframe: (type: string) => void;
	sourceSelector: string;
	setSourceSelector: (s: string) => void;
	destSelector: string;
	setDestSelector: (s: string) => void;
	goalSelector: string;
	setGoalSelector: (s: string) => void;
	isDemo: boolean,
}

const AddEditReaction = (props: IProps) => {
	const { configInitialData, previewReaction, websiteId, postMessageToIframe,
		sourceSelector, setSourceSelector, destSelector, setDestSelector,
		goalSelector, setGoalSelector, isDemo
	} = props;
	const [configID, setConfigID] = useState(configInitialData.id)
	const [form] = Form.useForm();
	const [reactionType, setReactionType] = useState(configInitialData.type)

	let initialReactionName = '';
	switch (reactionType) {
		case "banner":
		case "modal": {
			initialReactionName = configInitialData.values.template
			break
		}
		case "action": {
			initialReactionName = configInitialData.values.effect
			break
		}
		default: {
			break
		}
	}
	const [reactionName, setReactionName] = useState(initialReactionName)
	const [goalType, setGoalType] = useState(configInitialData.goalType)
	const [goalLink, setGoalLink] = useState(configInitialData.goalLink)
	const [name, setName] = useState(configInitialData.name)

	const [data, setData] = useState({
		title: configInitialData.values.title || '',
		description: configInitialData.values.description || '',
		btnText: configInitialData.values.btnText || '',
		btnColor: configInitialData.values.btnColor || defaultBtnColor,
		bgColor: configInitialData.values.bgColor || defaultBgColor,
		titleColor: configInitialData.values.titleColor || defaultTitleColor,
		textColor: configInitialData.values.textColor || defaultTextColor,
		btnTextColor: configInitialData.values.btnTextColor || defaultBtnTextColor,
		opacity: configInitialData.values.opacity || "1",
		fontFamily: configInitialData.values.fontFamily || persianAvailableFonts[0].key,
		url: configInitialData.values.url || '',
		condition: configInitialData.values.condition || '',
		isCloseable: configInitialData.values.isCloseable || true,
		isRTL: configInitialData.values.isRTL || true,
		showOnce: configInitialData.values.showOnce || true,
		customStyle: configInitialData.values.customStyle || "",
	});
	const [btnLoading, setBtnLoading] = useState(false);
	let timeoutHandler = 0;

	const disableInspector = () => {
		postMessageToIframe('disable-inspector')
	}

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
		// clearTimeout(timeoutHandler);
		// timeoutHandler = window.setTimeout(preview, 1000);
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
				sourceSelector: sourceSelector,
				destSelector: destSelector,
				once: showOnce,
				type: actionType,
			}
		});
	};

	const onFormSubmit = () => {
		if (isDemo) {
			message.warning('در حالت دمو می‌باشید و این واکنش ذخیره نخواهد شد')
		} else {
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
					template: reactionType !== "action" ? reactionName : "",
					effect: reactionType === "action" ? reactionName : "",
					sourceSelector: sourceSelector,
					destSelector: destSelector,
					once: data.showOnce,
					type: actionType,
				},
			});
			// message.loading('در حال ذخیره تنظیمات');
			if (configID === "") {
				Api.config.add(websiteId, config, name, goalType, goalLink, goalSelector).then((response) => {
					if (response.status == 200) {
						message.success('تنظیمات با موفقیت ذخیره شد');
						let cid = response.data["configs"][0].id
						setConfigID(cid)
						// fetchConfigList();
					} else if (response.status == 400) {
						message.warning(response.data.errorMessage);
					} else {
						message.error('تنظیمات ذخیره نشد');
					}
				});
				setBtnLoading(false);
			} else {
				Api.config.update(configID, websiteId, config, name, goalType, goalLink, goalSelector).then((response) => {
					if (response.status == 200) {
						message.success('تنظیمات با موفقیت ذخیره شد');
						// fetchConfigList();
					} else if (response.status == 400) {
						message.warning(response.data.errorMessage);
					} else {
						message.error('تنظیمات ذخیره نشد');
					}
				});
			}
		}
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
			<Input className="my-input" placeholder={defaultBgColor} maxLength={64}/>
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
			<Input className="my-input" placeholder={defaultTitleColor} maxLength={64}/>
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
			<Input className="my-input" placeholder={defaultTextColor} maxLength={64}/>
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
			<Input className="my-input" placeholder={defaultBtnColor} maxLength={64}/>
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
			<Input className="my-input" placeholder={defaultBtnTextColor} maxLength={64}/>
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

	let reactionDetails;
	if (reactionType === "banner" || reactionType === "modal") {
		reactionDetails = <div className="base-color" dir="rtl">
			<h2 className="form-header">محتوا</h2>
			<p className="form-message">
				لطفا محتوای مورد نظر خود که در لایه محتوایی نمایش داده می‌شود یا از کاربر پرسیده می‌شود را تنظیم کنید
			</p>

			<div className="my-input-label">
				عنوان محتوا
			</div>
			<Form.Item label={null} name="title">
				<Input className="my-input" placeholder="عنوان محتوا"
					   defaultValue={data.title} maxLength={32}
				/>
			</Form.Item>

			<div className="my-input-label">
				متن
			</div>
			<Form.Item label={null} name="description">
				<Input.TextArea className="my-input" placeholder="" rows={3} maxLength={1024}/>
			</Form.Item>

			<div className="my-input-label">
				متن دکمه
			</div>
			<Form.Item label={null} name="btnText">
				<Input className="my-input" placeholder="اینجا کلیک کن" maxLength={64}/>
			</Form.Item>

			<div className="my-input-label">
				لینک دکمه
			</div>
			<Form.Item label={null} name="url">
				<Input className="my-input" placeholder="لینک" type="url" maxLength={1024}/>
			</Form.Item>

			{/*TODO: Upload Image*/}

			{/*TODO: get inputs? email, phone, name*/}

			<Divider style={{color: darkBaseColor}}>
				رنگ
			</Divider>

			{colorsDiv}

			<div className="my-input-label">
				فونت محتوا
			</div>
			<Form.Item label={null} name="fontFamily">
				<Select className="my-input"
						onChange={onFormChange}
						defaultValue={persianAvailableFonts[0].key}
				>
					{persianAvailableFonts.map((font) => (
						<Select.Option value={font.key}>
							{font.showName}
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
		reactionDetails = <div className="base-color" dir="rtl">
			<h2 className="form-header">استایل</h2>
			{/*<p className="form-message">*/}
			{/*</p>*/}

			<div className="my-input-label">
				المان مقصد
			</div>
			<div>
				<DestInspector
					destSelector={destSelector}
					setDestSelector={setDestSelector}
					postMessageToIframe={postMessageToIframe}
				/>
			</div>

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

			<Divider style={{color: darkBaseColor}}>
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
			// 1- goal
			title: '',
			showName: "هدف",
			icon: "/icons/sports_soccer-24px.svg",
			content: <div className="base-color" dir="rtl">
				{/*<h2 className="form-header">هدف</h2>*/}
				<p className="form-message">
					براساس نیازخود، نوع هدف موردنظر را انتخاب کنید
				</p>
				<AllGoalTypeOptions
					goalType={goalType}
					setGoalType={setGoalType}
					name={name}
					setName={setName}
					goalSelector={goalSelector}
					setGoalSelector={setGoalSelector}
					goalLink={goalLink}
					setGoalLink={setGoalLink}
					postMessageToIframe={postMessageToIframe}
					onSelectFinished={() => {
						if (currentStep < steps.length-1) setCurrentStep(currentStep+1);
						disableInspector();
						let sidebar = document.getElementById("my_sidebar_form")
						if (sidebar) sidebar.scrollTop = 0
						onFormSubmit()
					}}
				/>
			</div>,
			buttons: <>
				{/*<Button onClick={() => {*/}
				{/*	if (currentStep < steps.length-1) setCurrentStep(currentStep+1);*/}
				{/*	disableInspector();*/}
				{/*	let sidebar = document.getElementById("my_sidebar_form")*/}
				{/*	if (sidebar) sidebar.scrollTop = 0*/}
				{/*}*/}
				{/*}*/}
				{/*	disabled={goalType === "" || name === ""}*/}
				{/*	style={{backgroundColor: darkBaseColor, borderRadius: "70px", width: "12rem", height: "2.5rem"}}*/}
				{/*>*/}
				{/*	<span style={{color: "white", fontSize: "20px"}}>*/}
				{/*		ادامه*/}
				{/*	</span>*/}
				{/*</Button>*/}
			</>
		},
		{
			// 2- select reaction type
			title: '',
			showName: "واکنش",
			icon: "/icons/twotone-closed_caption-24px.svg",
			content: <div className="base-color" dir="rtl">
				{/*<h2 className="form-header">واکنش</h2>*/}
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
					hasAnimation={Boolean(goalType !== "notify")}
					hasContentCard={true}
				/>}
			</div>,
			buttons: <>
				<Button onClick={() => {
					if (currentStep < steps.length-1) setCurrentStep(currentStep+1);
					disableInspector();
					let sidebar = document.getElementById("my_sidebar_form")
					if (sidebar) sidebar.scrollTop = 0
					onFormSubmit()
				}
				}
					disabled={reactionType === ""}
					style={{backgroundColor: darkBaseColor, borderRadius: "70px", width: "12rem", height: "2.5rem"}}
				>
					<span style={{color: "white", fontSize: "20px"}}>
						ادامه
					</span>
				</Button>
			</>,
		},
		{
			// 3- select trigger
			title: '',
			showName: "راه‌انداز",
			icon: "/icons/twotone-closed_caption-2.svg",
			content: <div className="base-color" dir="rtl">
				{/*<h2 className="form-header">راه‌انداز</h2>*/}
				<p className="form-message">
					نوع راه انداز واکنش خود را از لیست زیر انتخاب کنید
				</p>
				{
					<AllTriggerOptions
						onSelectFinished={triggerOptionsOnFinished}
						condition={data.condition}
						selector={sourceSelector}
						setSelector={setSourceSelector}
						postMessageToIframe={postMessageToIframe}
					/>
				}
			</div>,
			buttons: <>
				<Button onClick={() => {
					if (currentStep < steps.length-1) setCurrentStep(currentStep+1);
					disableInspector();
					let sidebar = document.getElementById("my_sidebar_form")
					if (sidebar) sidebar.scrollTop = 0
					onFormSubmit()
				}
				}
					disabled={data.condition === ""}
					style={{backgroundColor: darkBaseColor, borderRadius: "70px", width: "12rem", height: "2.5rem"}}
				>
					<span style={{color: "white", fontSize: "20px"}}>
						ساخت واکنش
					</span>
				</Button>
			</>,
		},
		{
			// 4 - reaction details: content card or animation
			title: '',
			showName: !(reactionType === "banner" || reactionType === "modal")? "استایل": "محتوا",
			icon: "/icons/twotone-closed_caption-1.svg",
			content: reactionDetails,
			buttons: <>
			<Button onClick={() => {
				if (currentStep < steps.length-1) setCurrentStep(currentStep+1);
				disableInspector();
				let sidebar = document.getElementById("my_sidebar_form")
				if (sidebar) sidebar.scrollTop = 0
				onFormSubmit()
			}}
					// disabled={data.condition === ""}
					style={{backgroundColor: darkBaseColor, borderRadius: "70px", width: "19rem", height: "2.5rem"}}
			>
				<span style={{color: "white", fontSize: "20px"}}>
					{(reactionType === "banner" || reactionType === "modal")?
						"ذخیره کارت محتوایی":
						"ذخیره استایل"
					}
				</span>
			</Button>
		</>,
		},
	]

	return (
		<div className="mt-3" style={{textAlign: "center", marginTop: "0"}}>

			<Button className="my-btn"
					style={{borderColor: "#af9b18", fontSize: "15px", fontWeight: "normal",
							borderRadius: "15px", width: "8rem", height: "2rem", direction: "rtl",
							marginBottom: "10px",
					}}
					onClick={preview}
			>
				<i className={"eye icon"} style={{marginLeft: "4px", marginRight: "0"}}/>
				پیش‌نمایش
			</Button>

			<div style={{display: "inline-flex", direction: "rtl"}}>
				<Button className="icon-btn"
						onClick={() => {
							// disableInspector()
							setCurrentStep(currentStep-1)
						}}
						disabled={currentStep == 0}
						title={"مرحله قبل"}
						style={{margin: "3px", border: "none", backgroundColor: "white"}}
				>
					<i className="angle double right icon"/>
				</Button>
				{steps.map((step, index) => {

					return (
						<>
							<Button onClick={() => {
								// disableInspector()
								setCurrentStep(index)
							}}
								disabled={index > currentStep}
								title={step.showName}
								style={{
									margin: "2px",
									borderRadius: "10px",
									backgroundColor: (index === currentStep)? "#f1ebd4": "white",
									border: "none",
									padding: (index === currentStep)? "1px 5px": "",
								}}
							>
								<img src={step.icon} style={{display: "inline-block"}}/>
								{(index === currentStep)?
									<span style={{color: "#af9b18"}}>
										{step.showName}
									</span>
									: null
								}
							</Button>
						</>
					)
				})
				}
				{/*<Steps current={currentStep}>*/}
				{/*	{steps.map((item, index) => (*/}
				{/*		<Step key={index} title={item.title}/>*/}
				{/*	))}*/}
				{/*</Steps>*/}
			</div>


			<div id={"my_sidebar_form"} style={{overflow: "auto", height: "calc(100vh - 150px)"}}>
			<Form
				form={form}
				layout="vertical"
				initialValues={data}
				onChange={onFormChange}
				onSubmitCapture={onFormSubmit}
			>
				<div className="steps-content"
					style={{backgroundColor: "white", borderRadius: "20px", borderWidth: "1px"}}
				>
					{steps[currentStep].content}
				</div>

				<div className="steps-action" style={{textAlign: "center",display: "inherit"}}>
					{steps[currentStep].buttons}
				</div>

			</Form>
			</div>
		</div>
	);
};

export default AddEditReaction;
