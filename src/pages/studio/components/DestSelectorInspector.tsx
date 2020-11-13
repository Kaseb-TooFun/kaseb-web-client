import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import { Switch } from 'antd';

interface DestInspectorProps extends RouteComponentProps {
	setDestSelector: (qs: string) => void;
	destSelector: string;
	postMessageToIframe: (type: string, payload?: string) => void;
}

const DestInspector = (props: DestInspectorProps) => {
	const { setDestSelector, destSelector, postMessageToIframe } = props;
	// const [isInspectorEnable, setIsInspectorEnable] = useState(true);

	window.localStorage.setItem('selectorType', 'dest');

	const onSwitchChange = (value: boolean) => {
		if (value) {
			if (destSelector) postMessageToIframe('disable-inspector');
			// setIsInspectorEnable(false)
		} else {
			postMessageToIframe('enable-inspector');
			// setIsInspectorEnable(true)
			setDestSelector('');
		}
	};

	if (destSelector) {
		onSwitchChange(true);
	} else {
		onSwitchChange(false);
	}

	return (
		<Switch
			onChange={onSwitchChange}
			checked={Boolean(destSelector !== '')}
			loading={Boolean(destSelector === '')}
			checkedChildren="تغییر المان"
			unCheckedChildren="انتخاب المان"
		/>
	);
};

export default DestInspector;
