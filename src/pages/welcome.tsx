import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps, useNavigate } from "@reach/router";
import { Button, Row, Typography, Layout } from "antd";
import { UnlockOutlined } from "@ant-design/icons";
import Api from "_src/api";
const storage = window.localStorage;

const { Content } = Layout;
const { Title } = Typography;

interface IProps extends RouteComponentProps {
	logout?: string;
}

const welcome = (props: IProps) => {
	const [btnLoading, setBtnLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (props.path == "/logout") {
			Api.setAuthHeader("");
			setBtnLoading(false);
		} else {
			const token = storage.getItem("authorization") || "";
			if (token == "") return setBtnLoading(false);

			Api.auth.verify().then((response) => {
				if (response.status == 200) {
					navigate("/dashboard");
				} else if (response.status == 401) {
					navigate("/logout");
				}
				setBtnLoading(false);
			});
		}
	});

	return (
		<Row justify="center" align="middle" style={{ height: "100vh" }}>
			<Content>
				<Row justify="center">
					<Title level={2}>Welcome to Kaseb</Title>
				</Row>
				<Row justify="center">
					<Link to="/login">
						<Button
							type="primary"
							loading={btnLoading}
							disabled={btnLoading}
						>
							login <UnlockOutlined />
						</Button>
					</Link>
				</Row>
			</Content>
		</Row>
	);
};

export default welcome;
