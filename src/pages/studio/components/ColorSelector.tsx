import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button } from 'antd';

interface IProps extends RouteComponentProps {
	onSelect: (color: string) => void;
	defaultColor: string;
}

const ColorSelector = (props: IProps) => {
	const [color, setColor] = useState('');
	const colors = [
		'#e63f39',
		'#e96f72',
		'#e54b7f',
		'#8d48ab',
		'#693eb6',
		'#3e50b1',
		'#616fbf',
		'#1f76cd',
		'#16abf0',
		'#29a497',
		'#0cc97a',
		'#8dbf4f',
		'#fcdc0b',
		'#f9be09',
		'#fb9807'
	];

	useEffect(() => {
		const { defaultColor } = props;
		if (colors.indexOf(defaultColor) != -1) {
			setColor(defaultColor);
		} else {
			setColor(colors[0]);
		}
	}, []);

	const onSelect = (item: string) => {
		props.onSelect(item);
		setColor(item);
	};

	return (
		<div className="color-selector">
			{colors.map((item) => {
				return (
					<Button
						className="color-btn"
						style={{ backgroundColor: item }}
						onClick={() => onSelect(item)}
					>
						{color == item ? '✓' : ' '}
					</Button>
				);
			})}
		</div>
	);
};

export default ColorSelector;
