import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import {Button, Modal} from 'antd';
import { SketchPicker } from "react-color";
import { BgColorsOutlined } from "@ant-design/icons"
import exp from "constants";

interface IProps extends RouteComponentProps {
	setShowModal: (state: boolean) => void;
	showModal: boolean;
}

const StatisticsModal = (props: IProps) => {
	const {showModal, setShowModal} = props;
	return (
		<>
			<Modal
				title="آمار"
				footer={null}
				visible={showModal}
				onOk={() => setShowModal(false)}
				onCancel={() => setShowModal(false)}
			>
				<div>
					<p className={"dashboard-text"}>
						برای مشاهده آمار لازم است چند هفته از اجرای واکنش در وبسایت شما گذشته باشد
					</p>
					<p className={"dashboard-text"}>
						بعد از گذشت این مدت آماری مشابه ‌
						<a style={{color: "#af9b18", padding: "3px 0", textAlign: "right"}}
							href={"/statistics/action/demo"} target={"_blank"} rel={'noopener noreferrer'}
						>
							<span className={"dashboard-link"} style={{}}>
								<i className={"chart line icon"}/>
								  دمو آمار
							</span>
						</a>
						‌ در اختیار خواهید داشت
					</p>
				</div>
			</Modal>
		</>
	)
}

export default StatisticsModal;
