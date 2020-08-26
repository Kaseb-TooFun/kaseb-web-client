import {RouteComponentProps} from "@reach/router";
import React, {useState} from "react";
import {Button, Form, Input, Switch} from "antd";



const goalTypeOptions = [
	{
		key: "notify",
		name: "notify",
		showName: "اطلاع رسانی",
		img: "", // /icons/goal/goal-notify.png
		icon: "bullhorn", //"bullhorn",
		description: "اطلاع رسانی به تمام مشاهده کننده‌های سایت شما",
		exampleNote: "",
		formNotes: [
			"این هدف زمانی به انجام می‌رسد که اطلاع رسانی توسط کاربر وبسایت دیده شود",
			"نام این هدف را وارد کنید و روی دکمه‌ی ذخیره کلیک کنید",
		],
		formFields: <></>,
	},
	{
		key: "page_visit",
		name: "page_visit",
		showName: "بازدید صفحه",
		img: "", // /icons/goal/goal-pagevisit.png
		icon: "eye", //"eye",
		description: "مشاهده کننده‌های بیشتری صفحه‌ی مشخص شده را مشاهده می‌کنند",
		exampleNote: "مانند: لندینگ کمپین مشخص",
		formNotes: [
			"این هدف زمانی به انجام می‌رسد که کاربر سایت به لینک صفحه مورد نظر شما هدایت شود",
			"نام این هدف و لینک صفحه مورد نظر خود را وارد کنید و روی دکمه‌ی ذخیره کلیک کنید",
		],
		formFields: <></>,
	},
	{
		key: "click",
		name: "click",
		showName: "کلیک روی المان",
		img: "", // /icons/goal/goal-click.png
		icon: "mouse pointer", //"mouse pointer",
		description: "مشاهده کننده‌های  بیشتری روی المان مشخص شده کلیک می‌کنند",
		exampleNote: "مانند: دکمه‌ی دانلود فایل",
		formNotes: [
			"این هدف زمانی به انجام می‌رسد که کاربر روی المان مورد نظر شما (مانند دانلود فایل و...) کلیک کند",
			"نام این هدف را وارد کنید و سپس المان موردنظر خود را در این صفحه انتخاب کنید",
		],
		formFields: <></>,
	},
]


interface GoalTypeOptionsProps extends RouteComponentProps{
	postMessageToIframe: (type: string, payload?: string) => void;
	goalType: string;
	setGoalType: (gt: string) => void;
	name: string;
	setName: (name: string) => void;
	goalSelector: string;
	setGoalSelector: (s: string) => void;
	goalLink: string;
	setGoalLink: (s: string) => void;
}

const AllGoalTypeOptions = (props: GoalTypeOptionsProps) => {
	const { goalType, setGoalType, name, setName, goalSelector, setGoalSelector,
		goalLink, setGoalLink, postMessageToIframe } = props;
	const [primaryGoalType, setPrimaryGoalType] = useState(goalType)
	const [isInspectorEnable, setIsInspectorEnable] = useState(goalSelector === "");


	const goalTypes = goalTypeOptions.map((goalData) => {
		let addedFields;

		if (primaryGoalType === "page_visit") {
			// addedFields: goalLink
			addedFields = <>
				<div className="my-input-label">
					لینک مورد نظر
				</div>
				<Form.Item label={null}>
					<Input className="my-input" placeholder="لینک" type="url"
						   defaultValue={goalLink} id={"goal_form_link"}
					/>
				</Form.Item>
			</>
		} else if (primaryGoalType === "click") {
			// addedFields: goalSelector
			window.localStorage.setItem("selectorType", "goal")
			const onSwitchChange = (value: Boolean) => {
				if (value) {
					setIsInspectorEnable(false)
				} else {
					postMessageToIframe('enable-inspector')
					setIsInspectorEnable(true)
					setGoalSelector('')
				}
			}

			if (goalSelector && isInspectorEnable) {
				setIsInspectorEnable(false)
			}

			if (isInspectorEnable) {
				postMessageToIframe('enable-inspector')
			}

			addedFields = <div>
				<div className="my-input-label" style={{}}>
					 المان هدف
				</div>
				<Switch
					onChange={onSwitchChange}
					checked={!isInspectorEnable}
					// disabled={!Boolean(destSelector)}
					checkedChildren="تغییر المان"
					unCheckedChildren="انتخاب المان"
				/>
			</div>
		}

		let goalForm = <>
			{goalData.formNotes.map((note) => (
				<div style={{textAlign: "right"}}>
					{note}
				</div>
			))}
			<div className="my-input-label" style={{}}>
				نام هدف
			</div>
			<Form.Item label={null}>
				<Input className="my-input" placeholder="نام هدف" id={"goal_form_name"}
					   defaultValue={name}
				/>
			</Form.Item>
			{addedFields}
			<Button
				style={{backgroundColor: "#af9b18", borderRadius: "70px", width: "5rem", height: "2.5rem",
					float: "left"}}
				onClick={() => {
					let goalFieldName = document.getElementById("goal_form_name") as HTMLInputElement
					setName(goalFieldName.value)
					if (primaryGoalType === "page_visit") {
						// save goal link
						let goalFieldLink = document.getElementById("goal_form_link") as HTMLInputElement
						setGoalLink(goalFieldLink.value)
					}
					setGoalType(primaryGoalType)
				}}
			>
				<span style={{color: "white"}}>
					ذخیره
				</span>
			</Button>
		</>

		let isSelected = goalType === goalData.name || (!goalType && primaryGoalType === goalData.name);

		return (
			<>
			<div className="goal-option"
				 onClick={() => {
				 	setPrimaryGoalType(goalData.name)
					 setGoalType('')
				 }}
				 style={{
				 	backgroundColor: isSelected? "#af9b18": "white",
					color: isSelected? "white": "#af9b18"
				 }}
			>
				<div className="goal-option-header">
					{goalData.img?
						<div className="goal-option-header-img">
							<img src={goalData.img} style={{height: "30px"}} />
						</div>
					: goalData.icon?
						<div className="goal-option-header-icon">
							<i className={`big ${goalData.icon} icon`}
								style={{color: !isSelected? "#af9b18": "white"}}
							/>
						</div>
					: null
					}
					<div className="goal-option-header-title">
						{goalData.showName}
					</div>
				</div>
				<div className="goal-option-description">
					{goalData.description}
				</div>
				{goalData.exampleNote?
					<div className="goal-option-example-note">
						{goalData.exampleNote}
					</div>
					: null}
			</div>
				{
					isSelected?
						<div className="goal-option-form"
							style={{
								// display: isSelected? "block": "none",
								padding: "1em",
								marginBottom: "30px"
							}}
						>
							{goalForm}
						</div>
						: null
				}
		</>
		)
	})

	return (
		<div className="goal-option-all">
			{goalTypes}
		</div>
	)
}

export default AllGoalTypeOptions;