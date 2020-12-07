import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxRootState } from 'src/redux/reducers';
import { setConfig } from 'src/redux/actions/reaction';
import { Button } from 'antd';
import { css } from '@emotion/react';

import Trigger from './steps/Trigger';
import Animation from './steps/Animation';
import SelectGoal from './steps/SelectGoal';
import CardContent from './steps/CardContent';
import ReactionType from './steps/ReactionType';
import BannerContent from './steps/BannerContent';
interface IProps extends RouteComponentProps, ConnectedProps<typeof connector> {
	postMessage: (type: string, payload?: any) => void;
}

const AddEditReaction = ({ config, postMessage }: IProps) => {
	const [step, setStep] = useState(0);

	const nextStep = () => setStep(step + 1);

	const preview = () => postMessage('preview-reaction', config);

	const tabs = [
		{
			key: 'goal',
			title: 'هدف',
			icon: '/icons/sports_soccer-24px.svg'
		},
		{
			key: 'reaction-type',
			title: 'نوع واکنش',
			icon: '/icons/twotone-closed_caption-24px.svg'
		},
		{
			key: 'style',
			title: 'استایل',
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
				onClick={preview}
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
					justify-content: space-around;
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
							border: 'none',
							...(index === step
								? {
										background: '#f1ebd4'
								  }
								: {
										background: '#f5f5f5'
								  })
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
					<SelectGoal postMessage={postMessage} nextStep={nextStep} />
				)}

				{tabs[step].key == 'reaction-type' && (
					<ReactionType nextStep={nextStep} />
				)}

				{tabs[step].key == 'style' && config.value.type == 'action' && (
					<Animation nextStep={nextStep} />
				)}
				{tabs[step].key == 'style' && config.value.type == 'banner' && (
					<BannerContent nextStep={nextStep} />
				)}
				{tabs[step].key == 'style' && config.value.type == 'modal' && (
					<CardContent nextStep={nextStep} />
				)}

				{tabs[step].key == 'trigger' && <Trigger nextStep={nextStep} />}
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
