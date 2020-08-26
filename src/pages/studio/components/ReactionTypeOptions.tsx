import {RouteComponentProps} from "@reach/router";
import {Button, Divider} from "antd";
import React from "react";


const animationOptions = [
	{name: "kio-a-flash", showName: "فلاش"},
	{name: "kio-a-pulse", showName: "تپش"},
	{name: "kio-a-bounce", showName: "پرش"},
	{name: "kio-a-shakeX", showName: "تکان افقی"},
	{name: "kio-a-swing", showName: "تاب"},
	{name: "kio-a-shakeY", showName: "تکان عمودی"},
	{name: "kio-a-rubberBand", showName: "کشش"},
	{name: "kio-a-wobble", showName: "تلو تلو"},
	{name: "kio-a-tada", showName: "تادا"},
	// {name: "x8", showName: "جنبش"},
	// {name: "x10", showName: "فوکوس"},
	// {name: "x11", showName: "حرکت به"},
]

const bannerOptions = [
	{name: "top-banner", showName: "بنر بالا"},
	// {name: "middle-banner", showName: "بنر وسط"},
	{name: "bottom-banner", showName: "بنر پایین"},
]

const modalOptions = [
	{name: "modal", showName: "مُدال"},
]

interface ReactionOptionProps extends RouteComponentProps {
	reactionType: string;
	reactionName: string;
	reactionData: {name: string, showName: string};
	setReactionType: (reactionType: string) => void;
	setReactionName: (reactionName: string) => void;
}


const ReactionOption = (props: ReactionOptionProps) => {
	const {reactionType, reactionName, reactionData, setReactionType, setReactionName} = props;

	let isSelected = Boolean(reactionName) && reactionName === reactionData.name;
	return (
		<div className="reaction-option" dir="rtl">
			<Button
				className={"reaction-btn"}
				style={{
					borderRadius: "70px",
					backgroundColor: isSelected? "#af9b18": "white",
					width: "97%"
				}}
				onClick={() => {
					setReactionType(reactionType);
					setReactionName(reactionData.name)
				}}
			>
				<span className="base-color"
					style={{
						fontSize: "15px",
						fontWeight: reactionName === reactionData.name? "bold": "normal",
						color: isSelected? "white": "#af9b18",
					}}>
					{reactionData.showName}
				</span>
			</Button>
		</div>
	);
}


/////

interface AllReactionTypeProps extends RouteComponentProps {
	reactionName: string;
	setReactionType: (reactionType: string) => void;
	setReactionName: (reactionName: string) => void;
	hasAnimation: boolean;
	hasContentCard: boolean;
}

const AllReactionTypeOptions = (props: AllReactionTypeProps) => {
	const {reactionName, setReactionType, setReactionName, hasAnimation, hasContentCard} = props;
	let animationDivs;
	if (hasAnimation) {
		animationDivs = <>
			<Divider style={{color: "#af9b18"}}>
				انیمیشن روی المان
			</Divider>
			{animationOptions.map((reactionData) => (
				<ReactionOption
					reactionType={"action"}
					reactionName={reactionName}
					reactionData={reactionData}
					setReactionType={setReactionType}
					setReactionName={setReactionName}
				/>
			))}
		</>
	}

	let contentCardDivs;
	if (hasContentCard) {
		contentCardDivs = <>
			<Divider style={{color: "#af9b18"}}>
				لایه محتوایی
			</Divider>
			{bannerOptions.map((reactionData) => (
				<ReactionOption
					reactionType={"banner"}
					reactionName={reactionName}
					reactionData={reactionData}
					setReactionType={setReactionType}
					setReactionName={setReactionName}
				/>
			))}
			{modalOptions.map((reactionData) => (
				<ReactionOption
					reactionType={"modal"}
					reactionName={reactionName}
					reactionData={reactionData}
					setReactionType={setReactionType}
					setReactionName={setReactionName}
				/>
			))}
		</>
	}
	return (<>
		{animationDivs}
		{contentCardDivs}
	</>)
}

export default AllReactionTypeOptions;

