import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, useParams } from '@reach/router';
import { Layout, message } from 'antd';
import Sidebar from './sidebar';
import Api from 'src/api';
import TopHeader from 'src/pages/studio/components/TopHeader';

const { Content } = Layout;

const Studio = (props: RouteComponentProps) => {
	const params = useParams();
	const { configId, websiteId } = params;
	const iRef = useRef<HTMLIFrameElement>(null);
	const [url, setUrl] = useState('');
	const [loading, setLoading] = useState(true);
	const [isModuleLoaded, setIsModuleLoaded] = useState(false);
	const [displayMode, setDisplayMode] = useState<'mobile' | 'desktop'>(
		'desktop'
	);

	const getWebsiteInfo = () => {
		message.loading('دریافت اطلاعات سایت', 0.3);
		Api.website.getWebsite(websiteId).then((response) => {
			if (response.status == 200) {
				setUrl(response.data.website.url || '');
				if (!configId) {
					message.loading('در حال یافتن کد کاسب در صفحه مورد نظر');
				}
			} else {
				message.error('خطلا در دریافت اطلاعات وب سایت');
			}
		});
	};

	useEffect(() => {
		getWebsiteInfo();
	}, []);

	useEffect(() => {
		if (url != '') {
			window.addEventListener('message', onReceiveMessage);
		}

		return () => {
			window.removeEventListener('message', onReceiveMessage);
		};
	}, [url]);

	const postMessageToIframe = (type: string, payload?: any) => {
		if (iRef.current?.src)
			iRef.current?.contentWindow?.postMessage({ type, payload }, url);
	};

	const onReceiveMessage = (message: MessageEvent) => {
		const { type, payload } = message.data;
		if (process.env.NODE_ENV !== 'production' && type) {
			console.log('messageFromIFrame', { type, payload });
		}
		switch (type) {
			case 'kio-loaded':
				postMessageToIframe('set-target-origin');
				postMessageToIframe('get-location');
				setIsModuleLoaded(true);
				break;

			case 'set-location':
				if (payload != url) setUrl(payload);
				break;

			// case 'select-item':
			// 	onInspected.run(payload);
			// 	const selectorType = window.localStorage.getItem(
			// 		'selectorType'
			// 	);
			// switch (selectorType) {
			// 	case 'source':
			// 		setSourceSelector(payload);
			// 		break;
			// 	case 'dest':
			// 		setDestSelector(payload);
			// 		break;
			// 	case 'goal':
			// 		setGoalSelector(payload);
			// 		break;
			// 	default:
			// 		break;
			// }
			// postMessageToIframe('disable-inspector');
			// break;

			default:
				break;
		}
	};

	return (
		<Layout
			id="studio"
			className="h-screen"
			style={{ backgroundColor: 'white' }}
		>
			<TopHeader
				url={url}
				loading={loading}
				displayMode={displayMode}
				setDisplayMode={setDisplayMode}
			/>
			<Content
				className={`content h-screen w-screen ${displayMode}-mode p-3`}
			>
				<div className="iframe-container">
					{url != '' && (
						<div className="iframe-box shadow-lg">
							<iframe
								ref={iRef}
								title="website"
								src={url}
								onLoad={() => setLoading(false)}
							/>
						</div>
					)}
				</div>
				{isModuleLoaded && (
					<Sidebar postMessage={postMessageToIframe} />
				)}
			</Content>
		</Layout>
	);
};

export default Studio;
