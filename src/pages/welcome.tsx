import React, { Component } from 'react';
import { RouteComponentProps, Link } from "@reach/router";
import { Button, Row, Typography, Layout } from 'antd/es';
import { UnlockOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { Title } = Typography;

class App extends Component<RouteComponentProps> {
	render() {
		return (
			<Row justify="center" align="middle" style={{ height: '100vh' }}>
				<Content>
					<Row justify="center">
						<Title level={2}>Welcome to Kaseb</Title>
					</Row>
					<Row justify="center">
						<Link to="login">
							<Button type="primary">
								login <UnlockOutlined />
							</Button>
						</Link>
					</Row>
				</Content>
			</Row>
		);
	}
}

export default App;
