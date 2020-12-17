import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, Input, Popover } from 'antd';
import { SketchPicker } from 'react-color';
import { BgColorsOutlined } from '@ant-design/icons';

interface IProps extends RouteComponentProps {
	onChange: (color: string) => void;
	color: string;
	placeholder?: string;
}

const ColorInput = (props: IProps) => {
	const { color, onChange, placeholder } = props;
	const colors = [
		'#ffffff',
		'#cccccc',
		'#aaaaaa',
		'#666666',
		'#333333',
		'#000000',
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

	return (
		<div className="color-selector">
			<Input
				dir="ltr"
				className="my-input latin-font"
				placeholder={placeholder}
				value={color}
				suffix={
					<div
						className="color-btn color-show"
						style={{ background: color }}
					/>
				}
				prefix={
					<Popover
						content={
							<SketchPicker
								className="latin-font"
								color={color}
								onChangeComplete={(color) =>
									onChange(color.hex)
								}
							/>
						}
						trigger="click"
					>
						<Button className="color-btn color-picker">
							<BgColorsOutlined style={{ color: 'black' }} />
						</Button>
					</Popover>
				}
			/>
			<div className="colors-row">
				{colors.map((item) => {
					return (
						<div
							role="button"
							key={item}
							className="color-btn"
							style={{ backgroundColor: item }}
							onClick={() => onChange(item)}
						>
							{color === item ? '✓' : ' '}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ColorInput;
