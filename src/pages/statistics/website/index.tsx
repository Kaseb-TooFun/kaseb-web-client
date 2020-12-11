import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useNavigate, useParams } from '@reach/router';
import { PieChart } from 'react-minimal-pie-chart';
import {
	Line as LineChart,
	defaults as chartJsDefaults
} from 'react-chartjs-2';
import moment from 'moment-jalaali';
import { Button, Row, Col, Tabs, Divider } from 'antd';
import TopHeader from 'src/pages/components/TopHeader';
import Api from 'src/api';

// import fa from "moment/src/locale/fa";
moment.locale('fa');
moment.loadPersian();

const darkBaseColor = '#af9b18';
chartJsDefaults.global.defaultFontFamily = 'iranyekan';

const demoCountsStatistics = {
	clickedCount: 5120,
	closedCount: 5120,
	conversionRate: 67,
	desktopToAllPercent: 65,
	executeCount: 20480,
	pageViewCount: 30640
	// sessionCount: 10240,
	// seenCount: 5120
};

/*  for example
const last30DayStatistics = [
	{
		pageViewCount: 333,
		executeCount: 305,
		closedCount: 130,
		clickedCount: 140,
		conversionRate: 50
	},
	// 30 element
]
 */

function generateLast30Days() {
	const dates = [];
	for (let i = 29; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		const dateString = moment(date).locale('fa').format('dddd jDD jMMMM jYY');
		dates.push(dateString);
	}
	return dates;
}

function generateDemoChartData() {
	const demoLastSevenDaysCountsStatistics = [];
	for (let i = 29; i >= 0; i--) {
		const pageViewCount = Math.floor(Math.random() * 200) + 200;
		const executeCount = Math.floor(
			(Math.random() * pageViewCount) / 2 + pageViewCount / 2
		);
		const conversionRate = Math.floor((executeCount / pageViewCount) * 100);
		const data = {
			pageViewCount,
			executeCount,
			conversionRate,
			closedCount: Math.floor(
				(Math.random() * pageViewCount) / 2 + pageViewCount / 2
			),
			clickedCount: Math.floor(
				(Math.random() * pageViewCount) / 2 + pageViewCount / 2
			)
		};
		demoLastSevenDaysCountsStatistics.push(data);
	}
	return demoLastSevenDaysCountsStatistics;
}

type StatisticsProps = RouteComponentProps;

const Statistics = (props: StatisticsProps) => {
	const [counts, setCounts] = useState({
		clickedCount: 0,
		closedCount: 0,
		conversionRate: 0,
		desktopToAllPercent: 0,
		executeCount: 0,
		pageViewCount: 0
		// displayCount: 0,
		// sessionCount: 0,
		// seenCount: 0
	});

	const [chartData, setChartData] = useState([]);

	const navigate = useNavigate();
	const params = useParams();
	const websiteId = params.websiteId;
	const actionId = params.actionId;

	const isDemo = Boolean(websiteId === 'demo' || actionId === 'demo');
	const [isTotalDataFetched, setIsTotalDataFetched] = useState(false);
	const [isDaysDataFetched, setIsDaysDataFetched] = useState(false);
	const datesLabel = generateLast30Days();

	useEffect(() => {
		if (isDemo) {
			setCounts(demoCountsStatistics);
			setIsTotalDataFetched(true);
			const demoChartData = generateDemoChartData() as [];
			setChartData(demoChartData);
			setIsDaysDataFetched(true);
		} else {
			// todo: fetch api data
			if (actionId) {
				Api.statistics.getActionTotalCounts(websiteId, actionId).then((response) => {
					if (response.status == 200) {
						const totalCounts = response.data.total as {
							clickedCount: number,
							closedCount: number,
							conversionRate: number,
							desktopToAllPercent: number,
							executeCount: number,
							pageViewCount: number
						};
						setCounts(totalCounts);
						setIsTotalDataFetched(true);
					} else {

					}
				});
			} else {
				Api.statistics.getWebsiteTotalCounts(websiteId).then((response) => {
					if (response.status == 200) {
						const totalCounts = response.data.total as {
							clickedCount: number,
							closedCount: number,
							conversionRate: number,
							desktopToAllPercent: number,
							executeCount: number,
							pageViewCount: number
						};
						setCounts(totalCounts);
						setIsTotalDataFetched(true);
					} else {

					}
				});
			}
		}
	}, [isDemo]);

	const myHeader = <TopHeader />;

	const loadingDataDiv = (
		<div style={{ verticalAlign: 'middle' }}>
			<i className="huge grey circle notch loading icon" />
		</div>
	);

	const loadingDataWithMessageDiv = (
		<div style={{ verticalAlign: 'middle' }}>
			<i className="huge grey circle notch loading icon" />
			<p style={{ fontSize: '2.5em', marginTop: '40px' }}>
				در حال دریافت اطلاعات
			</p>
		</div>
	);

	/// display and execute counts
	const displayExecuteCountsDiv = (
		<Row>
			<Col span={24} style={{ float: 'right', direction: 'rtl' }}>
				<div className={'circular-statistics'} style={{}}>
					<div className={'circular-statistics-number'}>
						{counts.pageViewCount}
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

	const pageViewAndExecuteChartDataMonth = {
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
						(dayData: { pageViewCount: number }) =>
							dayData.pageViewCount
					)
			}
		]
	};

	const pageViewAndExecuteChartDataWeek = {
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
						(dayData: { pageViewCount: number }) =>
							dayData.pageViewCount
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
								data={pageViewAndExecuteChartDataWeek}
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
								data={pageViewAndExecuteChartDataMonth}
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

	let desktopToMobileData = [
		{
			title: 'دسکتاپ',
			value: counts.desktopToAllPercent,
			color: darkBaseColor,
			textColor: 'black'
		}
	];
	if (counts.desktopToAllPercent > 0) {
		desktopToMobileData.push({
			title: 'موبایل',
			value: 100 - counts.desktopToAllPercent,
			color: '#f1dd60',
			textColor: 'black'
		});
	}

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
				{/*<div className={'rectangle-statistics'} style={{}}>*/}
				{/*	<div className={'rectangle-statistics-number'}>*/}
				{/*		{counts.sessionCount}*/}
				{/*	</div>*/}
				{/*	<div className={'rectangle-statistics-title'}>*/}
				{/*		<i className={'address book icon'} />*/}
				{/*		نشست(session)*/}
				{/*	</div>*/}
				{/*</div>*/}
				{/*<div className={'rectangle-statistics'} style={{}}>*/}
				{/*	<div className={'rectangle-statistics-number'}>*/}
				{/*		{counts.seenCount}*/}
				{/*	</div>*/}
				{/*	<div className={'rectangle-statistics-title'}>*/}
				{/*		<i className={'eye icon'} />*/}
				{/*		مشاهده شده*/}
				{/*	</div>*/}
				{/*</div>*/}
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
			}
			// {
			// 	label: 'مشاهده شده',
			// 	fillColor: 'rgba(46,116,170,0.2)',
			// 	strokeColor: 'rgba(46,116,170,1)',
			// 	pointColor: 'rgba(46,116,170,1)',
			// 	pointStrokeColor: 'rgba(46,116,170,1)',
			// 	pointHighlightFill: 'rgba(46,116,170,1)',
			// 	pointHighlightStroke: 'rgba(46,116,170,1)',
			// 	backgroundColor: 'rgba(100,226,65,0.5)',
			// 	data: chartData
			// 		.slice(datesLabel.length - 30, datesLabel.length + 1)
			// 		.map((dayData: { seenCount: number }) => dayData.seenCount)
			// },
			// {
			// 	label: 'نشست',
			// 	fillColor: 'rgba(220,220,220,0.2)',
			// 	strokeColor: 'rgba(220,220,220,1)',
			// 	pointColor: 'rgba(220,220,220,1)',
			// 	pointStrokeColor: '#fff',
			// 	pointHighlightFill: '#fff',
			// 	pointHighlightStroke: 'rgba(220,220,220,1)',
			// 	data: chartData
			// 		.slice(datesLabel.length - 30, datesLabel.length + 1)
			// 		.map(
			// 			(dayData: { sessionCount: number }) =>
			// 				dayData.sessionCount
			// 		)
			// }
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
			}
			// {
			// 	label: 'مشاهده شده',
			// 	fillColor: 'rgba(46,116,170,0.2)',
			// 	strokeColor: 'rgba(46,116,170,1)',
			// 	pointColor: 'rgba(46,116,170,1)',
			// 	pointStrokeColor: 'rgba(46,116,170,1)',
			// 	pointHighlightFill: 'rgba(46,116,170,1)',
			// 	pointHighlightStroke: 'rgba(46,116,170,1)',
			// 	backgroundColor: 'rgba(100,226,65,0.5)',
			// 	data: chartData
			// 		.slice(datesLabel.length - 7, datesLabel.length + 1)
			// 		.map((dayData: { seenCount: number }) => dayData.seenCount)
			// },
			// {
			// 	label: 'نشست',
			// 	fillColor: 'rgba(220,220,220,0.2)',
			// 	strokeColor: 'rgba(220,220,220,1)',
			// 	pointColor: 'rgba(220,220,220,1)',
			// 	pointStrokeColor: '#fff',
			// 	pointHighlightFill: '#fff',
			// 	pointHighlightStroke: 'rgba(220,220,220,1)',
			// 	data: chartData
			// 		.slice(datesLabel.length - 7, datesLabel.length + 1)
			// 		.map(
			// 			(dayData: { sessionCount: number }) =>
			// 				dayData.sessionCount
			// 		)
			// }
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
					{
						<>
							{isTotalDataFetched? displayExecuteCountsDiv: loadingDataWithMessageDiv}
							{isDaysDataFetched? displayExecuteChartDiv: <div style={{minHeight: "660px"}}/>}
							<Divider
								style={{ backgroundColor: darkBaseColor }}
							/>
							{isTotalDataFetched? desktopMobileDiv: <div style={{minHeight: "250px"}}/>}
							<Divider
								style={{ backgroundColor: darkBaseColor }}
							/>
							{isTotalDataFetched? sessionCountsDiv: <div style={{minHeight: "170px"}}/>}
							{isDaysDataFetched? sessionChartDiv: <div style={{minHeight: "660px"}}/>}
						</>
					}
				</div>
			</Row>
		</>
	);
};

export default Statistics;
