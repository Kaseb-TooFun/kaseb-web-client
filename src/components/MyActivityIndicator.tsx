import React, { FC, memo } from 'react';
import { css, keyframes } from '@emotion/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  }
`;

const dash = keyframes`
	0% {
	  stroke-dasharray: 1, 200;
	  stroke-dashoffset: 0;
	}
	50% {
	  stroke-dasharray: 90, 200;
	  stroke-dashoffset: -35px;
	}
	100% {
	  stroke-dashoffset: -125px;
	}
`;

interface IMyActivityIndicator {
	size?: 'small' | 'medium' | 'large' | number;
	color?: string;
	speed?: number;
}

const MyActivityIndicator: FC<IMyActivityIndicator> = (props) => {
	const { size = 'small', color = '#fff', speed = 1 } = props;
	let width = typeof size == 'number' ? size : 10;
	let strokeWidth = 5;
	switch (size) {
		case 'small':
			width = 15;
			strokeWidth = 6;
			break;
		case 'medium':
			width = 30;
			break;
		case 'large':
			width = 40;
			break;
		default:
			break;
	}

	return (
		<div
			css={css`
				width: ${width}px;
				height: ${width}px;
			`}
		>
			<svg
				viewBox="25 25 50 50"
				css={css`
					position: absolute;
					width: ${width}px;
					height: ${width}px;
					transform-origin: center;
					will-change: transform;
					animation: ${spin} ${2 / speed}s linear infinite;
				`}
			>
				<circle
					cx="50"
					cy="50"
					r="20"
					css={css`
						fill: none;
						stroke: ${color};
						stroke-width: ${strokeWidth}px;
						stroke-dasharray: 1, 200;
						stroke-dashoffset: 0;
						stroke-linecap: round;
						animation: ${dash} 1.5s ease-in-out infinite;
						will-change: transform;
					`}
				/>
			</svg>
		</div>
	);
};

export default memo(MyActivityIndicator);
