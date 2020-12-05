import React, { useRef, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxRootState } from 'src/redux/reducers';
import { setConfig } from 'src/redux/actions/reaction';
import { Select, Form, Switch, Button, message, Input, Divider } from 'antd';
import Api from 'src/api';
import ColorSelector from 'src/pages/studio/components/ColorSelector';
import AllTriggerOptions from 'src/pages/studio/components/TriggerOptions';
import AllReactionTypeOptions from 'src/pages/studio/components/ReactionTypeOptions';
import DestInspector from 'src/pages/studio/components/DestSelectorInspector';
import CssEditor from 'src/pages/studio/components/CssEditor';
import GoalStepContent from 'src/pages/studio/components/GoalStepContent';
import UrlPattersInputs from 'src/pages/studio/components/UrlPatternsInputs';
import { css } from '@emotion/react';

const defaultBgColor = '#0cc97a';
const defaultTitleColor = '#e63f39';
const defaultTextColor = '#1f76cd';
const defaultBtnColor = '#fcdc0b';
const defaultBtnTextColor = '#e63f39';

const darkBaseColor = '#af9b18';

const persianAvailableFonts = [
	{ key: 'kio-IRANSans', showName: 'ایران سنس' },
	{ key: 'kio-Sahel', showName: 'ساحل' },
	{ key: 'kio-Shabnam', showName: 'شبنم' },
	{ key: 'kio-Vazir', showName: 'وزیر' }
];
interface IProps extends RouteComponentProps, ConnectedProps<typeof connector> {
	// configInitialData: {
	// 	id: string;
	// 	name: string;
	// 	goalType: string;
	// 	goalLink: string;
	// 	type: string;
	// 	values: {
	// 		title: string;
	// 		description: string;
	// 		btnText: string;
	// 		btnColor: string;
	// 		bgColor: string;
	// 		titleColor: string;
	// 		textColor: string;
	// 		btnTextColor: string;
	// 		opacity: string;
	// 		fontFamily: string;
	// 		url: string;
	// 		condition: string;
	// 		isCloseable: boolean;
	// 		isRTL: boolean;
	// 		showOnce: boolean;
	// 		customStyle: string;
	// 		template: string;
	// 		effect: string;
	// 		sourceSelector: string;
	// 		destSelector: string;
	// 		once: boolean;
	// 		type: string;
	// 		urlPatterns?: any;
	// 	};
	// };
	// websiteId: string;
	postMessage: (type: string, payload?: any) => void;
	// sourceSelector: string;
	// setSourceSelector: (s: string) => void;
	// destSelector: string;
	// setDestSelector: (s: string) => void;
	// goalSelector: string;
	// setGoalSelector: (s: string) => void;
	// isDemo: boolean;
}

const AddEditReaction = ({ config, setConfig, postMessage }: IProps) => {
	const [step, setStep] = useState(0);

	const previewReaction = (data: any) =>
		postMessage('preview-reaction', data);

	const tabs = [
		{
			key: 'goal',
			title: 'هدف',
			icon: '/icons/sports_soccer-24px.svg'
		},
		{
			key: 'reaction',
			title: 'واکنش',
			icon: '/icons/twotone-closed_caption-24px.svg'
		},
		{
			key: 'goal',
			title:
				// !(reactionType === 'banner' || reactionType === 'modal')
				'استایل',
			// : 'محتوا',
			icon: '/icons/twotone-closed_caption-1.svg'
		},
		{
			key: 'trigger',
			title: 'راه‌انداز',
			icon: '/icons/twotone-closed_caption-2.svg'
		}
	];

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				align-items: center;
				min-height: 0;
				overflow: auto;
			`}
		>
			<Button
				className="my-btn"
				css={{
					borderColor: '#af9b18',
					fontSize: '15px',
					fontWeight: 'normal',
					borderRadius: '15px',
					width: '8rem',
					height: '2rem',
					direction: 'rtl',
					marginBottom: '10px'
				}}
				// onClick={preview}
			>
				<i
					className={'eye icon'}
					style={{ marginLeft: '4px', marginRight: '0' }}
				/>
				پیش‌نمایش
			</Button>

			<div
				css={css`
					display: flex;
					flex-direction: row-reverse;
				`}
			>
				{tabs.map((s, index) => (
					<Button
						onClick={() => setStep(index)}
						disabled={index > step}
						title={s.title}
						css={{
							margin: '2px',
							borderRadius: '10px',
							backgroundColor:
								index === step ? '#f1ebd4' : 'white',
							border: 'none',
							padding: index === step ? '1px 5px' : ''
						}}
					>
						{index === step ? (
							<span style={{ color: '#af9b18' }} className="mr-1">
								{s.title}
							</span>
						) : null}
						<img
							alt="step"
							src={s.icon}
							style={{ display: 'inline-block' }}
						/>
					</Button>
				))}
			</div>
			<div className="steps-content">
				{tabs[step].key == 'goal' && (
					<GoalStepContent
						postMessage={postMessage}
						nextStep={() => setStep(step + 1)}
					/>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state: ReduxRootState) => {
	return {
		config: state.config
	};
};

const connector = connect(mapStateToProps, { setConfig });
export default connector(AddEditReaction);
