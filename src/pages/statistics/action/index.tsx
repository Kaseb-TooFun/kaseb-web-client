import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useNavigate, useParams } from '@reach/router';
import { PieChart } from 'react-minimal-pie-chart';
import {
	Line as LineChart,
	defaults as chartJsDefaults
} from 'react-chartjs-2';
import moment from 'jalali-moment';
import { Button, Row, Col, Tabs, Divider } from 'antd';
import TopBarHeader from 'src/pages/components/TopBarHeader';

const darkBaseColor = '#af9b18';
chartJsDefaults.global.defaultFontFamily = 'iranyekan';

const demoCountsStatistics = {
	displayCount: 30640,
	executeCount: 20480,
	conversionRate: 67,
	sessionCount: 10240,
	seenCount: 5120,
	closedCount: 5120,
	clickedCount: 5120,
	desktopToMobilePercent: 65
};

/*  for example
const last30DayStatistics = [
	{
		displayCount: 333,
		executeCount: 305,
		sessionCount: 164,
		seenCount: 113,
		closedCount: 130,
		clickedCount: 140,
	},
	// 30 element
]
 */

function generateLast30Days() {
	const dates = [];
	for (let i = 29; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		dates.push(moment(date).locale('fa').format('dddd DD MMMM YY'));
	}
	return dates;
}

function generateDemoChartData() {
	const demoLastSevenDaysCountsStatistics = [];
	for (let i = 29; i >= 0; i--) {
		const displayCount = Math.floor(Math.random() * 200) + 200;
		const executeCount = Math.floor(
			(Math.random() * displayCount) / 2 + displayCount / 2
		);
		const conversionRate = Math.floor((executeCount / displayCount) * 100);
		const sessionCount = Math.floor(Math.random() * 200) + 100;
		const data = {
			displayCount,
			executeCount,
			conversionRate,
			sessionCount: sessionCount,
			seenCount: Math.floor(
				(Math.random() * sessionCount) / 2 + sessionCount / 2
			),
			closedCount: Math.floor(
				(Math.random() * sessionCount) / 2 + sessionCount / 2
			),
			clickedCount: Math.floor(
				(Math.random() * sessionCount) / 2 + sessionCount / 2
			)
		};
		demoLastSevenDaysCountsStatistics.push(data);
	}
	return demoLastSevenDaysCountsStatistics;
}

type ActionStatisticsProps = RouteComponentProps;

const ActionStatistics = (props: ActionStatisticsProps) => {
	const [counts, setCounts] = useState({
		displayCount: 0,
		executeCount: 0,
		sessionCount: 0,
		seenCount: 0,
		closedCount: 0,
		clickedCount: 0,
		conversionRate: 0,
		desktopToMobilePercent: 0
	});

	const [chartData, setChartData] = useState([]);

	const navigate = useNavigate();
	const params = useParams();
	const configId = params.configId;

	const isDemo = configId === 'demo';
	const [isDataFetched, setIsDataFetched] = useState(false);
	const datesLabel = generateLast30Days();

	useEffect(() => {
		if (isDemo) {
			setCounts(demoCountsStatistics);
			const demoChartData = generateDemoChartData() as [];
			setChartData(demoChartData);
			setIsDataFetched(true);
		} else {
			// todo: fetch api data
		}
	}, []);

	const myHeader = <TopBarHeader />;

	/// display and execute counts

	const displayExecuteCountsDiv = (
		<Row>
			<Col span={24} style={{ float: 'right', direction: 'rtl' }}>
				<div className={'circular-statistics'} style={{}}>
					<div className={'circular-statistics-number'}>
						{counts.displayCount}
					</div>
					<div className={'circular-statistics-title'}>
						دفعات نمایش
					</div>
				</div>
				<div className={'circular-statistics'} style={{}}>
					<div className={'circular-statistics-number'}>
						{counts.executeCount}
					</div>
					<div className={'circular-statistics-title'}>
						دفعات به راه افتادن
					</div>
				</div>
				<div className={'circular-statistics'} style={{}}>
					<div className={'circular-statistics-number'}>
						%{counts.conversionRate}
					</div>
					<div className={'circular-statistics-title'}>
						<i className={'filter icon'} />
						نرخ تبدیل
					</div>
				</div>
			</Col>
		</Row>
	);

	/// display and execute charts

	const displayExecuteChartDataMonth = {
		labels: datesLabel.slice(datesLabel.length - 30, datesLabel.length + 1),
		datasets: [
			{
				label: 'دفعات به راه افتادن',
				fillColor: 'rgba(46,116,170,0.2)',
				strokeColor: 'rgba(46,116,170,1)',
				pointColor: 'rgba(46,116,170,1)',
				pointStrokeColor: 'rgba(46,116,170,1)',
				pointHighlightFill: 'rgba(46,116,170,1)',
				pointHighlightStroke: 'rgba(46,116,170,1)',
				backgroundColor: 'rgba(46,116,170, 0.5)',
				data: chartData
					.slice(datesLabel.length - 30, datesLabel.length + 1)
					.map(
						(dayData: { executeCount: number }) =>
							dayData.executeCount
					)
			},
			{
				label: 'دفعات نمایش',
				fillColor: 'rgba(220,220,220,0.2)',
				strokeColor: 'rgba(220,220,220,1)',
				pointColor: 'rgba(220,220,220,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(220,220,220,1)',
				data: chartData
					.slice(datesLabel.length - 30, datesLabel.length + 1)
					.map(
						(dayData: { displayCount: number }) =>
							dayData.displayCount
					)
			}
		]
	};

	const displayExecuteChartDataWeek = {
		labels: datesLabel.slice(datesLabel.length - 7, datesLabel.length + 1),
		datasets: [
			{
				label: 'دفعات به راه افتادن',
				fillColor: 'rgba(46,116,170,0.2)',
				strokeColor: 'rgba(46,116,170,1)',
				pointColor: 'rgba(46,116,170,1)',
				pointStrokeColor: 'rgba(46,116,170,1)',
				pointHighlightFill: 'rgba(46,116,170,1)',
				pointHighlightStroke: 'rgba(46,116,170,1)',
				backgroundColor: 'rgba(46,116,170, 0.5)',
				data: chartData
					.slice(datesLabel.length - 7, datesLabel.length + 1)
					.map(
						(dayData: { executeCount: number }) =>
							dayData.executeCount
					)
			},
			{
				label: 'دفعات نمایش',
				fillColor: 'rgba(220,220,220,0.2)',
				strokeColor: 'rgba(220,220,220,1)',
				pointColor: 'rgba(220,220,220,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(220,220,220,1)',
				data: chartData
					.slice(datesLabel.length - 7, datesLabel.length + 1)
					.map(
						(dayData: { displayCount: number }) =>
							dayData.displayCount
					)
			}
		]
	};

	const displayExecuteChartDiv = (
		<Row>
			<Col span={24} style={{ float: 'right', direction: 'rtl' }}>
				<Tabs defaultActiveKey={'1'}>
					<Tabs.TabPane tab={'هفت روز گذشته'} key={'1'}>
						<div>
							<LineChart
								data={displayExecuteChartDataWeek}
								// options={options}
								// width="600" height="250"
							/>
						</div>
						<div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
							هفت روز گذشته
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab={'سی روز گذشته'} key={'2'}>
						<div>
							<LineChart
								data={displayExecuteChartDataMonth}
								// options={options}
								// width="600" height="250"
							/>
						</div>
						<div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
							سی روز گذشته
						</div>
					</Tabs.TabPane>
				</Tabs>
			</Col>
		</Row>
	);

	/// desktop-mobile pie chart

	const desktopToMobileData = [
		{
			title: 'دسکتاپ',
			value: counts.desktopToMobilePercent,
			color: darkBaseColor,
			textColor: 'black'
		},
		{
			title: 'موبایل',
			value: 100 - counts.desktopToMobilePercent,
			color: '#f1dd60',
			textColor: 'black'
		}
	];

	const desktopMobileDiv = (
		<Row className={'desktop-to-mobile-statistics justify-center'}>
			<Col span={24} style={{ float: 'left' }}>
				{/*<div className={"desktop-to-mobile-statistics-label"}>*/}
				{/*	<div>*/}
				{/*		%{counts.desktopToMobilePercent}*/}
				{/*		<br/>*/}
				{/*		دسکتاپ*/}
				{/*	</div>*/}
				{/*</div>*/}
				<div className={'desktop-to-mobile-statistics-pie-chart'}>
					<PieChart
						// style={{}}
						// animationDuration={}
						// animationEasing={}
						data={desktopToMobileData}
						label={({ dataEntry }) =>
							`%${dataEntry.value} ${dataEntry.title}`
						}
						labelStyle={(index) => ({
							fill: '#001f48',
							fontSize: '7px',
							fontWeight: 'bold',
							fontFamily: 'iranyekan',
							direction: 'rtl'
						})}
						radius={42}
						labelPosition={80}
						lineWidth={50}
						// lengthAngle={}
						// lineWidth={} paddingAngle={} radius={} viewBoxSize={}
					/>
				</div>
				{/*<div className={"desktop-to-mobile-statistics-label"}>*/}
				{/*	%{100 - counts.desktopToMobilePercent}*/}
				{/*	<br/>*/}
				{/*	موبایل*/}
				{/*</div>*/}
			</Col>
		</Row>
	);

	const sessionCountsDiv = (
		<Row>
			<Col span={24} style={{ float: 'right', direction: 'rtl' }}>
				<div className={'rectangle-statistics'} style={{}}>
					<div className={'rectangle-statistics-number'}>
						{counts.sessionCount}
					</div>
					<div className={'rectangle-statistics-title'}>
						<i className={'address book icon'} />
						نشست(session)
					</div>
				</div>
				<div className={'rectangle-statistics'} style={{}}>
					<div className={'rectangle-statistics-number'}>
						{counts.seenCount}
					</div>
					<div className={'rectangle-statistics-title'}>
						<i className={'eye icon'} />
						مشاهده شده
					</div>
				</div>
				<div className={'rectangle-statistics'} style={{}}>
					<div className={'rectangle-statistics-number'}>
						{counts.closedCount}
					</div>
					<div className={'rectangle-statistics-title'}>
						<i className={'close icon'} />
						بسته شده
					</div>
				</div>
				<div className={'rectangle-statistics'} style={{}}>
					<div className={'rectangle-statistics-number'}>
						{counts.clickedCount}
					</div>
					<div className={'rectangle-statistics-title'}>
						<i className={'mouse pointer icon'} />
						کلیک شده
					</div>
				</div>
			</Col>
		</Row>
	);

	/// session chart
	const sessionChartDataMonth = {
		labels: datesLabel.slice(datesLabel.length - 30, datesLabel.length + 1),
		datasets: [
			{
				label: 'کلیک شده',
				fillColor: 'rgba(46,116,170,0.2)',
				strokeColor: 'rgba(46,116,170,1)',
				pointColor: 'rgba(46,116,170,1)',
				pointStrokeColor: 'rgba(46,116,170,1)',
				pointHighlightFill: 'rgba(46,116,170,1)',
				pointHighlightStroke: 'rgba(46,116,170,1)',
				backgroundColor: 'rgba(46,116,170, 0.5)',
				data: chartData
					.slice(datesLabel.length - 30, datesLabel.length + 1)
					.map(
						(dayData: { clickedCount: number }) =>
							dayData.clickedCount
					)
			},
			{
				label: 'بسته شده',
				fillColor: 'rgba(46,116,170,0.2)',
				strokeColor: 'rgba(46,116,170,1)',
				pointColor: 'rgba(46,116,170,1)',
				pointStrokeColor: 'rgba(46,116,170,1)',
				pointHighlightFill: 'rgba(46,116,170,1)',
				pointHighlightStroke: 'rgba(46,116,170,1)',
				backgroundColor: 'rgba(232,48,48,0.5)',
				data: chartData
					.slice(datesLabel.length - 30, datesLabel.length + 1)
					.map(
						(dayData: { closedCount: number }) =>
							dayData.closedCount
					)
			},
			{
				label: 'مشاهده شده',
				fillColor: 'rgba(46,116,170,0.2)',
				strokeColor: 'rgba(46,116,170,1)',
				pointColor: 'rgba(46,116,170,1)',
				pointStrokeColor: 'rgba(46,116,170,1)',
				pointHighlightFill: 'rgba(46,116,170,1)',
				pointHighlightStroke: 'rgba(46,116,170,1)',
				backgroundColor: 'rgba(100,226,65,0.5)',
				data: chartData
					.slice(datesLabel.length - 30, datesLabel.length + 1)
					.map((dayData: { seenCount: number }) => dayData.seenCount)
			},
			{
				label: 'نشست',
				fillColor: 'rgba(220,220,220,0.2)',
				strokeColor: 'rgba(220,220,220,1)',
				pointColor: 'rgba(220,220,220,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(220,220,220,1)',
				data: chartData
					.slice(datesLabel.length - 30, datesLabel.length + 1)
					.map(
						(dayData: { sessionCount: number }) =>
							dayData.sessionCount
					)
			}
		]
	};

	const sessionChartDataWeek = {
		labels: datesLabel.slice(datesLabel.length - 7, datesLabel.length + 1),
		datasets: [
			{
				label: 'کلیک شده',
				fillColor: 'rgba(46,116,170,0.2)',
				strokeColor: 'rgba(46,116,170,1)',
				pointColor: 'rgba(46,116,170,1)',
				pointStrokeColor: 'rgba(46,116,170,1)',
				pointHighlightFill: 'rgba(46,116,170,1)',
				pointHighlightStroke: 'rgba(46,116,170,1)',
				backgroundColor: 'rgba(46,116,170, 0.5)',
				data: chartData
					.slice(datesLabel.length - 7, datesLabel.length + 1)
					.map(
						(dayData: { clickedCount: number }) =>
							dayData.clickedCount
					)
			},
			{
				label: 'بسته شده',
				fillColor: 'rgba(46,116,170,0.2)',
				strokeColor: 'rgba(46,116,170,1)',
				pointColor: 'rgba(46,116,170,1)',
				pointStrokeColor: 'rgba(46,116,170,1)',
				pointHighlightFill: 'rgba(46,116,170,1)',
				pointHighlightStroke: 'rgba(46,116,170,1)',
				backgroundColor: 'rgba(232,48,48,0.5)',
				data: chartData
					.slice(datesLabel.length - 7, datesLabel.length + 1)
					.map(
						(dayData: { closedCount: number }) =>
							dayData.closedCount
					)
			},
			{
				label: 'مشاهده شده',
				fillColor: 'rgba(46,116,170,0.2)',
				strokeColor: 'rgba(46,116,170,1)',
				pointColor: 'rgba(46,116,170,1)',
				pointStrokeColor: 'rgba(46,116,170,1)',
				pointHighlightFill: 'rgba(46,116,170,1)',
				pointHighlightStroke: 'rgba(46,116,170,1)',
				backgroundColor: 'rgba(100,226,65,0.5)',
				data: chartData
					.slice(datesLabel.length - 7, datesLabel.length + 1)
					.map((dayData: { seenCount: number }) => dayData.seenCount)
			},
			{
				label: 'نشست',
				fillColor: 'rgba(220,220,220,0.2)',
				strokeColor: 'rgba(220,220,220,1)',
				pointColor: 'rgba(220,220,220,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(220,220,220,1)',
				data: chartData
					.slice(datesLabel.length - 7, datesLabel.length + 1)
					.map(
						(dayData: { sessionCount: number }) =>
							dayData.sessionCount
					)
			}
		]
	};

	const sessionChartDiv = (
		<Row>
			<Col span={24} style={{ float: 'right', direction: 'rtl' }}>
				<Tabs defaultActiveKey={'1'}>
					<Tabs.TabPane tab={'هفت روز گذشته'} key={'1'}>
						<div>
							<LineChart
								data={sessionChartDataWeek}
								// options={options}
								// width="600" height="250"
							/>
						</div>
						<div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
							هفت روز گذشته
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab={'سی روز گذشته'} key={'2'}>
						<div>
							<LineChart
								data={sessionChartDataMonth}
								// options={options}
								// width="600" height="250"
							/>
						</div>
						<div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
							سی روز گذشته
						</div>
					</Tabs.TabPane>
				</Tabs>
			</Col>
		</Row>
	);

	return (
		<>
			{myHeader}
			<Row
				className="w-screen pt-10 justify-center"
				style={{ width: '100%' }}
			>
				<div
					style={{
						borderRadius: '10px',
						border: `1px solid ${darkBaseColor}`,
						padding: '2%',
						width: '90%',
						textAlign: 'center',
						minHeight: '350px',
						marginBottom: '30px'
					}}
				>
					{isDataFetched ? (
						<>
							{displayExecuteCountsDiv}
							{displayExecuteChartDiv}
							<Divider
								style={{ backgroundColor: darkBaseColor }}
							/>
							{desktopMobileDiv}
							<Divider
								style={{ backgroundColor: darkBaseColor }}
							/>
							{sessionCountsDiv}
							{sessionChartDiv}
						</>
					) : (
						<div style={{ verticalAlign: 'middle' }}>
							<i className="huge circle notch loading icon" />
							<p style={{ fontSize: '2em', marginTop: '40px' }}>
								در حال دریافت اطلاعات
							</p>
						</div>
					)}
				</div>
			</Row>
		</>
	);
};

export default ActionStatistics;
