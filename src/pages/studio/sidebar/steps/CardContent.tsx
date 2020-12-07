import React from 'react';
import { Button, Divider } from 'antd';
import { css } from '@emotion/react';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxRootState } from 'src/redux/reducers';
import { setReactionType, updateReaction } from 'src/redux/actions/reaction';

interface IProps extends ConnectedProps<typeof connector> {
	nextStep: () => void;
}

const CardContent = ({
	config,
	setReactionType,
	updateReaction,
	nextStep
}: IProps) => {
	const {
		value: { type, data }
	} = config;

	return (
		<div className="step-container" dir="rtl">
			<Divider style={{ color: '#af9b18' }}>محتوی کارت</Divider>
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

const connector = connect(mapStateToProps, { setReactionType, updateReaction });
export default connector(CardContent);
