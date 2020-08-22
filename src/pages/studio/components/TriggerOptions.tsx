import {RouteComponentProps} from "@reach/router";
import React, { useState, useEffect } from 'react';
import {Button, message, Select, Switch} from "antd";


const triggerOptions = [
	{name: 'idle', showName:'بیکار'},
	{name: 'wait', showName:'تایمر'},
	{name: 'on-click', showName:'کلیک'},
	{name: 'on-hover', showName:'هاور'},
	{name: 'on-load', showName:'ورود به صفحه'},
	// {name: 'ongoing', showName:'حرکت به سمت'},
]


interface TriggerOptionProps extends RouteComponentProps {
	trigger: { name: string, showName: string };
	onSelectFinished: (condition: string) => void;
	primaryConditionType: string
	setPrimaryConditionType: (condition: string) => void;
	condition: string;
	setSelector: (qs: string) => void;
	selector: string;
	postMessageToIframe: (type: string) => void;
}


const TriggerOption = (props: TriggerOptionProps) => {
	const {trigger, onSelectFinished, primaryConditionType, setPrimaryConditionType,
		condition, setSelector, selector, postMessageToIframe} = props;

	const [isInspectorEnable, setIsInspectorEnable] = useState(true);
	let addedOptions;
	let onClick;

	switch (trigger.name) {
		case "on-load": {
			onClick = () => {
				setPrimaryConditionType(trigger.name);
				onSelectFinished(trigger.name)
				postMessageToIframe('disable-inspector')
			};
			break
		}
		case "idle":
		case "wait": {
			onClick = () => {
				setPrimaryConditionType(trigger.name);
				postMessageToIframe( 'disable-inspector')
				onSelectFinished(`${trigger.name}-5`)
			};
			break
		}
		case "on-click":
		case "on-hover": {
			onClick = () => {
				setPrimaryConditionType(trigger.name);
				postMessageToIframe( 'enable-inspector')
				onSelectFinished(trigger.name)
			};
			break
		}
	}

	if (primaryConditionType === trigger.name || (!primaryConditionType && condition.includes(trigger.name))) {
		switch (trigger.name) {
			case "idle":
			case "wait": {
				onClick = () => {
					setPrimaryConditionType(trigger.name)
					postMessageToIframe('disable-inspector')
				};
				const onWaitChange = (value: string) => {
					onSelectFinished(`${trigger.name}-${value}`);
				}
				addedOptions = <Select
					defaultValue={condition.substr(trigger.name.length+1) || "5"}
					dropdownStyle={{direction: "rtl"}}
					onChange={onWaitChange}
				>
					<Select.Option value="5">
						۵ ثانیه
					</Select.Option>
					<Select.Option value="10">
						۱۰ ثانیه
					</Select.Option>
					<Select.Option value="20">
						۲۰ ثانیه
					</Select.Option>
					<Select.Option value="30">
						۳۰ ثانیه
					</Select.Option>
					<Select.Option value="60">
						۶۰ ثانیه
					</Select.Option>
				</Select>
				break
			}
			case "on-hover":
			case "on-click": {
				if (!isInspectorEnable && !selector) {
					setIsInspectorEnable(true)
				}
				onClick = () => {
					setPrimaryConditionType(trigger.name)
					onSelectFinished(trigger.name)
				};
				const onSwitchChange = (value: Boolean) => {
					if (value) {
						setIsInspectorEnable(false)
					} else {
						postMessageToIframe('enable-inspector')
						setIsInspectorEnable(true)
						setSelector('')
					}
				}
				if (selector && isInspectorEnable) {
					setIsInspectorEnable(false)
				}

				// if (querySelector === "") {
				// 	// message.info('المان مورد نظر را انتخاب کنید')
				// } else {
				// 	onSelectFinished(trigger.name);
				// 	// message.success('المان با موفقیت انتخاب شد')
				// }

				addedOptions = <Switch
					onChange={onSwitchChange}
					checked={!isInspectorEnable}
					// disabled={!Boolean(querySelector)}
					checkedChildren="تغییر المان"
					unCheckedChildren="انتخاب المان"
				/>
				break
			}
			case "on-load":
			{
				onClick = () => {
					setPrimaryConditionType(trigger.name);
					onSelectFinished(trigger.name)
				};
				break
			}
		}
	}

	let isSelected = (
		primaryConditionType && primaryConditionType.includes(trigger.name)
	) || (
		condition && condition.includes(trigger.name)
	);
	return (
		<div className="trigger-option" dir="rtl">
			<Button
				className={"trigger-btn"}
				style={{
					borderRadius: "70px",
					backgroundColor: isSelected? "#af9b18": "white",
				}}
				onClick={onClick}
			>
				<span className="base-color"
					style={{
						fontSize: "15px",
						fontWeight: primaryConditionType === trigger.name? "bold": "normal",
						color: isSelected? "white": "#af9b18",
					}}>
					{trigger.showName}
				</span>
			</Button>
			<div className={"trigger-btn"}>
			 {addedOptions}
			</div>
		</div>
	);
}

///////////


interface AllTriggerOptionsProps extends RouteComponentProps {
	onSelectFinished: (condition: string) => void;
	condition: string;
	setSelector: (qs: string) => void;
	selector: string;
	postMessageToIframe: (type: string, payload?: string) => void;
}


const AllTriggerOptions = (props: AllTriggerOptionsProps) => {
	const {onSelectFinished, condition, selector, setSelector, postMessageToIframe} = props;
	const [primaryConditionType, setPrimaryConditionType] = useState('');

	window.localStorage.setItem("selectorType", "1")

	return (<>
		<div>
			{triggerOptions.map((trigger) => (
					<TriggerOption
						trigger={trigger}
						onSelectFinished={onSelectFinished}
						primaryConditionType={primaryConditionType}
						setPrimaryConditionType={setPrimaryConditionType}
						condition={condition}
						selector={selector}
						setSelector={setSelector}
						postMessageToIframe={postMessageToIframe}
					/>
				)
				)
			}
		</div>
	</>)

}

export default AllTriggerOptions;
