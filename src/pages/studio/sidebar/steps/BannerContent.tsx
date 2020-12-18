import React from 'react';
import { Divider, Input, Radio, Select } from 'antd';
import { css } from '@emotion/react';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxRootState } from 'src/redux/reducers';
import { setReactionType, updateReaction } from 'src/redux/actions/reaction';
import ColorInput from 'src/pages/studio/components/ColorInput';

const { Option } = Select;

interface IProps extends ConnectedProps<typeof connector> {
	nextStep: () => void;
}

const BannerContent = ({
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
			<p className="form-message">
				لطفا محتوای مورد نظر خود را که در بنر نمایش داده می‌شود
			</p>
			<Divider style={{ color: '#af9b18' }}>ویرایش بنر</Divider>
			<div className="my-input-label">توضیحات</div>
			<Input.TextArea
				className="my-input"
				placeholder="توضیحات"
				value={data.description}
				maxLength={1024}
				onChange={(e) => {
					updateReaction({
						description: e.target.value.substr(0, 1024)
					});
				}}
			/>
			<div className="my-input-label">متن دکمه</div>
			<Input
				className="my-input"
				placeholder="متن دکمه"
				value={data.btnText}
				maxLength={64}
				onChange={(e) => {
					updateReaction({ btnText: e.target.value.substr(0, 64) });
				}}
			/>
			<div className="my-input-label">لینک دکمه</div>
			<Input
				className="my-input"
				placeholder="لینک دکمه"
				value={data.url}
				maxLength={1024}
				onChange={(e) => {
					updateReaction({ url: e.target.value.substr(0, 1024) });
				}}
			/>

			<div className="my-input-label">موقعیت بنر</div>
			<Select
				defaultValue={data.fontFamily || 'kio-IRANSans'}
				style={{ width: 120 }}
				onChange={(value) => updateReaction({ fontFamily: value })}
			>
				<Option value="kio-IRANSans">ایران سنس</Option>
				<Option value="kio-Sahel">ساحل</Option>
				<Option value="kio-Shabnam">شبنم</Option>
				<Option value="kio-Vazir">وزیر</Option>
			</Select>

			<br />
			<br />

			<div className="my-input-label">فونت نوشته</div>
			<Select
				defaultValue={data.template || 'top-banner'}
				style={{ width: 120 }}
				onChange={(value) => updateReaction({ template: value })}
			>
				<Option value="top-banner">بالا صفحه</Option>
				<Option value="bottom-banner">پایین صفحه</Option>
			</Select>

			<Divider style={{ color: '#af9b18' }}>رنگ ها</Divider>

			<div className="my-input-label">رنگ زمینه</div>
			<ColorInput
				color={data.bgColor?.toString()}
				onChange={(color) => updateReaction({ bgColor: color })}
				placeholder="رنگ زمینه"
			/>

			<div className="my-input-label">رنگ متن</div>
			<ColorInput
				color={data.textColor?.toString()}
				onChange={(color) => updateReaction({ textColor: color })}
				placeholder="رنگ متن"
			/>

			<div className="my-input-label">رنگ دکمه</div>
			<ColorInput
				color={data.btnColor?.toString()}
				onChange={(color) => updateReaction({ btnColor: color })}
				placeholder="رنگ دکمه"
			/>

			<div className="my-input-label">رنگ نوشته دکمه</div>
			<ColorInput
				color={data.btnTextColor?.toString()}
				onChange={(color) => updateReaction({ btnTextColor: color })}
				placeholder="رنگ نوشته دکمه"
			/>

			<Divider style={{ color: '#af9b18' }}>تنظیمات نمایش</Divider>
			<div className="my-input-label">تعداد نمایش</div>
			<Radio.Group
				value={data.showOnce ? 'true' : 'false'}
				onChange={(e) => {
					updateReaction({ showOnce: e.target.value == 'true' });
				}}
			>
				<Radio.Button value="true">فقط یک بار</Radio.Button>
				<Radio.Button value="false">نامحدود</Radio.Button>
			</Radio.Group>

			<br />
			<br />

			<div className="my-input-label">نوشته</div>
			<Radio.Group
				value={data.isRTL ? 'true' : 'false'}
				onChange={(e) => {
					updateReaction({ isRTL: e.target.value == 'true' });
				}}
			>
				<Radio.Button value="true">راست یه چپ</Radio.Button>
				<Radio.Button value="false">چپ به راست</Radio.Button>
			</Radio.Group>

			<br />
			<br />

			<div className="my-input-label">قابلیت بستن</div>
			<Radio.Group
				value={data.isCloseable ? 'true' : 'false'}
				onChange={(e) => {
					updateReaction({ isCloseable: e.target.value == 'true' });
				}}
			>
				<Radio.Button value="true">دارد</Radio.Button>
				<Radio.Button value="false">ندارد</Radio.Button>
			</Radio.Group>

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
export default connector(BannerContent);
