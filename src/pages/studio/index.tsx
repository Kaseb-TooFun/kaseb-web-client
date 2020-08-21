import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useParams, useNavigate } from '@reach/router';
import { Layout, Row, Button, Breadcrumb } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import Sidebar from './sidebar';
import Api from '_src/api';
import logo from "_src/logo.svg";

const { Header, Content } = Layout;

const onInspected = (() => {
	let action = (selector: string) => {};

	const addListener = (listener: (selector: string) => void) => {
		action = listener;
	};

	const run = (selector: string) => {
		action(selector);
		addListener((s) => {});
	};

	return {
		addListener,
		run
	};
})();

const Studio = (props: RouteComponentProps) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isLoaded, setLoaded] = useState(false);
	const navigate = useNavigate();
	const params = useParams();
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const iframeUrl = urlParams.get('url') || '';
	const [href, setHref] = useState('');
	const breadcrumb = href.split('/');
	const [selector, setSelector] = useState('');
	const [destSelector, setDestSelector] = useState('');

	useEffect(() => {
		fetchConfigList();
		window.addEventListener('message', onReciveMessage);

		return () => {
			window.removeEventListener('message', onReciveMessage);
		};
	}, []);

	const fetchConfigList = () => {
		setLoading(true);
		Api.config.getList(params.websiteId).then((response) => {
			if (response.status == 200) {
				setData(response.data.configs);
			}
			setLoading(false);
		});
	};

	const postMessageToIframe = (type: string, payload?: any) => {
		const frame = document.getElementById('my-iframe') as HTMLIFrameElement;
		frame.contentWindow?.postMessage({ type, payload }, iframeUrl);
	};

	const onReciveMessage = (message: MessageEvent) => {
		const { type, payload } = message.data;
		if (process.env.NODE_ENV !== 'production' && type) {
			console.log('messageFromIFrame', { type, payload });
		}
		switch (type) {
			case 'kio-loaded':
				setLoaded(true);
				postMessageToIframe('set-target-origin');
				postMessageToIframe('get-location');
				break;

			case 'set-location':
				setHref(payload);
				break;

			case 'select-item':
				onInspected.run(payload);
				let selectorType = window.localStorage.getItem("selectorType");
				switch (selectorType) {
					case "1": // selector
						setSelector(payload)
						break
					case "2": // destSelector
						setDestSelector(payload)
						break
					default:
						// setSelector(payload)
						break
				}
				postMessageToIframe( 'disable-inspector');
				break;

			default:
				break;
		}
	};

	return (
		<Layout id="studio" className="h-screen">
			<Header className="header">
				<div style={{float: "right"}}>
					<img src={logo}/>
				</div>
				<Button
					type="primary"
					icon={<AppstoreOutlined />}
					className="m-3"
					onClick={() => {
						navigate('/dashboard', { replace: true });
					}}
				/>
				<Breadcrumb>
					{breadcrumb
						.filter(
							(str) =>
								str != '' && str != 'https:' && str != 'http:'
						)
						.map((str, index) => {
							return (
								<Breadcrumb.Item key={index}>
									<a href="#">{str}</a>
								</Breadcrumb.Item>
							);
						})}
				</Breadcrumb>
			</Header>
			<Content className="content h-screen w-screen">
				<iframe id="my-iframe" src={iframeUrl} />
				{isLoaded && (
					<Sidebar
						postMessage={postMessageToIframe}
						websiteId={params.websiteId}
						selector={selector}
						setSelector={setSelector}
						destSelector={destSelector}
						setDestSelector={setDestSelector}
					/>
				)}
			</Content>
		</Layout>
	);
};

export default Studio;
