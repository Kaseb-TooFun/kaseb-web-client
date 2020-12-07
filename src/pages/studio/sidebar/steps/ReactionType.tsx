import React from 'react';
import { Button, Divider } from 'antd';
import { css } from '@emotion/react';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxRootState } from 'src/redux/reducers';
import { setReactionType } from 'src/redux/actions/reaction';

interface IProps extends ConnectedProps<typeof connector> {
	nextStep: () => void;
}

const ReactionType = ({ config, setReactionType, nextStep }: IProps) => {
	const {
		value: { type }
	} = config;

	return (
		<div className="step-container" dir="rtl">
			<Divider style={{ color: '#af9b18' }}>نوع واکنش</Divider>
			<div
				css={css`
					display: flex;
					justify-content: space-around;
				`}
			>
				<Button
					className={'reaction-btn'}
					style={{
						borderRadius: '70px',
						backgroundColor: type == 'banner' ? '#af9b18' : '#fff'
					}}
					onClick={() => setReactionType('banner')}
				>
					<span
						className="base-color"
						style={{
							fontSize: '15px',
							fontWeight: type == 'banner' ? 'bold' : 'normal',
							color: type == 'banner' ? '#fff' : '#af9b18'
						}}
					>
						بنر
					</span>
				</Button>
				<Button
					className={'reaction-btn'}
					style={{
						borderRadius: '70px',
						backgroundColor: type == 'modal' ? '#af9b18' : '#fff'
					}}
					onClick={() => setReactionType('modal')}
				>
					<span
						className="base-color"
						style={{
							fontSize: '15px',
							fontWeight: type == 'modal' ? 'bold' : 'normal',
							color: type == 'modal' ? '#fff' : '#af9b18'
						}}
					>
						مودال
					</span>
				</Button>
				<Button
					className={'reaction-btn'}
					style={{
						borderRadius: '70px',
						backgroundColor: type == 'action' ? '#af9b18' : '#fff'
					}}
					onClick={() => setReactionType('action')}
				>
					<span
						className="base-color"
						style={{
							fontSize: '15px',
							fontWeight: type == 'action' ? 'bold' : 'normal',
							color: type == 'action' ? '#fff' : '#af9b18'
						}}
					>
						انیمیشن
					</span>
				</Button>
			</div>
			<div
				role="button"
				css={css`
					background-color: rgb(175, 155, 24);
					border-radius: 70px;
					padding: 5px 20px;
					margin-top: 20px;
					color: #fff;
					user-select: none;
					cursor: pointer;
					font-size: 18px;
					color: #fff;
					text-align: center;
				`}
				onClick={nextStep}
			>
				ادامه
			</div>
		</div>
	);
};

const mapStateToProps = (state: ReduxRootState) => {
	return {
		config: state.config
	};
};

const connector = connect(mapStateToProps, { setReactionType });
export default connector(ReactionType);
