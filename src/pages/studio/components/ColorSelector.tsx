import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, Popover } from 'antd';
import { SketchPicker } from "react-color";
import { BgColorsOutlined } from "@ant-design/icons"

interface IProps extends RouteComponentProps {
	onSelect: (color: string) => void;
	color: string;
}

const ColorSelector = (props: IProps) => {
	const { color } = props;
	// const [color, setColor] = useState(defaultColor);
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
	}, []);

	const onSelect = (item: string) => {
		props.onSelect(item);
		// setColor(item);
	};

	const colorPicker = <SketchPicker
		  color={color}
		  onChangeComplete={(color) => {onSelect(color.hex)}}
	/>;
	const colorPickerPopover = <Popover placement="right" content={colorPicker} trigger="click">
        <Button className="color-btn">
			<BgColorsOutlined style={{color: "black"}}/>
		</Button>
      </Popover>

	return (
		<div className="color-selector">
			{colors.map((item) => {
				return (
					<Button
						className="color-btn"
						style={{ backgroundColor: item }}
						onClick={() => onSelect(item)}
					>
						{color === item ? '✓' : ' '}
					</Button>
				);
			})}
			{colorPickerPopover}
			<Button className="color-btn color-show" style={{backgroundColor: color}}>{' '}</Button>
		</div>
	);
};

export default ColorSelector;
