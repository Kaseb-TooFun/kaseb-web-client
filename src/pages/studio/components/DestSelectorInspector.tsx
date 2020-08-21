import {RouteComponentProps} from "@reach/router";
import React, {useState} from "react";
import {Switch} from "antd";


interface DestInspectorProps extends RouteComponentProps {
	setDestSelector: (qs: string) => void;
	destSelector: string;
	postMessageToIframe: (type: string, payload?: string) => void;
}

const DestInspector = (props: DestInspectorProps) => {
	const {setDestSelector, destSelector, postMessageToIframe} = props;
	const [isInspectorEnable, setIsInspectorEnable] = useState(true);

	window.localStorage.setItem("selectorType", "2")


	const onSwitchChange = (value: Boolean) => {
		if (value) {
			setIsInspectorEnable(false)
		} else {
			postMessageToIframe('enable-inspector')
			setIsInspectorEnable(true)
			setDestSelector('')
		}
	}

	if (destSelector && isInspectorEnable) {
		setIsInspectorEnable(false)
	}

	if (isInspectorEnable) {
		postMessageToIframe('enable-inspector')
	}

	return (
		<Switch
			onChange={onSwitchChange}
			checked={!isInspectorEnable}
			// disabled={!Boolean(destSelector)}
			checkedChildren="تغییر المان"
			unCheckedChildren="انتخاب المان"
		/>
	)
}

export default DestInspector;
