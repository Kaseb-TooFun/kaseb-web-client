import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { css } from '@emotion/react';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxRootState } from 'src/redux/reducers';
import { updateConfig, updateReaction } from 'src/redux/actions/reaction';
import { SearchOutlined } from '@ant-design/icons';

interface IProps extends ConnectedProps<typeof connector> {
	postMessage: (type: string, payload?: any) => void;
	nextStep: () => void;
}

function SelectGoal(props: IProps) {
	const { postMessage, config, nextStep } = props;
	const { goalType, name } = config;

	const [link, setLink] = useState('');
	const [waiting, setWaiting] = useState(false);

	const inspectElement = () => {
		setWaiting(true);
		postMessage('enable-inspector');
	};

	const onReceiveMessage = (message: MessageEvent) => {
		const { type, payload } = message.data;
		switch (type) {
			case 'select-item':
				setWaiting(false);
				props.updateReaction({ sourceSelector: payload });
				postMessage('disable-inspector');
				break;

			default:
				break;
		}
	};

	useEffect(() => {
		window.addEventListener('message', onReceiveMessage);

		return () => {
			window.removeEventListener('message', onReceiveMessage);
		};
	}, []);

	return (
		<div className="step-container" dir="rtl">
			<p className="form-message">
				براساس نیازخود، نوع هدف موردنظر را انتخاب کنید
			</p>
			<div
				role="button"
				className={`goal-item ${goalType == 'notify' ? 'active' : ''}`}
				onClick={() => props.updateConfig('goalType', 'notify')}
			>
				<div className="goal-header">
					<i className="goal-icon big bullhorn icon" />
					<span className="goal-title">اطلاع رسانی</span>
				</div>
				<div className="goal-description">
					اطلاع رسانی به تمام مشاهده کننده‌های سایت شما
				</div>
			</div>
			{goalType == 'notify' && (
				<div className="goal-content">
					<p>
						این هدف زمانی به انجام می‌رسد که اطلاع رسانی توسط کاربر
						وبسایت دیده شود
						<br />
						نام این هدف را وارد کنید و روی دکمه‌ی ذخیره کلیک کنید
					</p>
					<div className="my-input-label">نام هدف</div>
					<Input
						className="my-input"
						placeholder="نام هدف"
						defaultValue={name}
						onChange={(e) => {
							props.updateConfig(
								'name',
								e.target.value.substr(0, 64)
							);
						}}
					/>
				</div>
			)}
			<div
				role="button"
				className={`goal-item ${
					goalType == 'page_visit' ? 'active' : ''
				}`}
				onClick={() => props.updateConfig('goalType', 'page_visit')}
			>
				<div className="goal-header">
					<i className="goal-icon big eye icon" />
					<span className="goal-title">بازدید صفحه</span>
				</div>
				<div className="goal-description">
					مشاهده کننده‌های بیشتری صفحه‌ی مشخص شده را مشاهده می‌کنند
					<br />
					مانند: لندینگ کمپین مشخص
				</div>
			</div>
			{goalType == 'page_visit' && (
				<div className="goal-content">
					<p>
						این هدف زمانی به انجام می‌رسد که کاربر سایت به لینک صفحه
						مورد نظر شما هدایت شود
						<br />
						نام این هدف و لینک صفحه مورد نظر خود را وارد کنید و روی
						دکمه‌ی ذخیره کلیک کنید
					</p>
					<div className="my-input-label">نام هدف</div>
					<Input
						className="my-input"
						placeholder="نام هدف"
						defaultValue={name}
						onChange={(e) => {
							props.updateConfig(
								'name',
								e.target.value.substr(0, 64)
							);
						}}
					/>
					<div className="my-input-label">لینک مورد نظر</div>
					<Input
						className="my-input"
						placeholder="لینک"
						defaultValue={link}
						onChange={(e) => {
							setLink(e.target.value.substr(0, 1024));
						}}
					/>
				</div>
			)}
			<div
				role="button"
				className={`goal-item ${goalType == 'click' ? 'active' : ''}`}
				onClick={() => props.updateConfig('goalType', 'click')}
			>
				<div className="goal-header">
					<i className="goal-icon big mouse pointer icon" />
					<span className="goal-title">کلیک روی المان</span>
				</div>
				<div className="goal-description">
					مشاهده کننده‌های بیشتری روی المان مشخص شده کلیک می‌کنند
					<br />
					مانند: دکمه‌ی دانلود فایل
				</div>
			</div>
			{goalType == 'click' && (
				<div className="goal-content">
					<p>
						این هدف زمانی به انجام می‌رسد که کاربر روی المان مورد
						نظر شما (مانند دانلود فایل و...) کلیک کند
						<br />
						نام این هدف را وارد کنید و سپس المان موردنظر خود را در
						این صفحه انتخاب کنید
					</p>
					<div className="my-input-label">نام هدف</div>
					<Input
						className="my-input"
						placeholder="نام هدف"
						defaultValue={name}
						onChange={(e) => {
							props.updateConfig(
								'name',
								e.target.value.substr(0, 64)
							);
						}}
					/>
					<div
						css={css`
							text-align: center;
						`}
					>
						<div className="ml-3">المان هدف</div>
						<div>
							{config.value.data.sourceSelector == '' ? (
								'انتخاب نشده'
							) : (
								<code dir="ltr">
									{config.value.data.sourceSelector}
								</code>
							)}
						</div>
						<Button
							type="dashed"
							icon={<SearchOutlined />}
							onClick={inspectElement}
							loading={waiting}
						>
							<span className="mr-3">انتخاب</span>
						</Button>
					</div>
				</div>
			)}

			<div
				role="button"
				css={css`
					background-color: rgb(175, 155, 24);
					border-radius: 70px;
					padding: 5px 20px;
					margin-top: 10px;
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
}

const mapStateToProps = (state: ReduxRootState) => {
	return {
		config: state.config
	};
};

const connector = connect(mapStateToProps, { updateConfig, updateReaction });
export default connector(SelectGoal);
