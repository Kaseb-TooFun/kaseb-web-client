import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Input } from 'antd';
import { Button } from 'antd';

interface UrlPatternsInputsProps extends RouteComponentProps {
	urlPatterns: string[];
	setUrlPatterns: (arr: string[]) => void;
}

const UrlPattersInputs = (props: UrlPatternsInputsProps) => {
	const { urlPatterns, setUrlPatterns } = props;

	// handle input change
	const handleInputChange = (e: any, index: number) => {
		const value = e.target.value as string;
		const list = [...urlPatterns];
		list[index] = value;
		setUrlPatterns(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...urlPatterns];
		list.splice(index, 1);
		setUrlPatterns(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setUrlPatterns([...urlPatterns, '']);
	};

	return (
		<>
			<div className="">
				{urlPatterns.map((upt: string, i: number) => {
					return (
						<div className="box">
							<Input
								className="my-input"
								style={{ textAlign: 'left', direction: 'ltr' }}
								placeholder={'Enter address or RegEx pattern'}
								maxLength={64}
								value={upt}
								onChange={(e) => handleInputChange(e, i)}
							/>

							<div className="btn-box">
								{urlPatterns.length !== 1 && (
									<Button
										className=""
										danger
										style={{ margin: '5px' }}
										onClick={() => handleRemoveClick(i)}
									>
										<i className={'red close icon'} />
										حذف
									</Button>
								)}
								{urlPatterns.length - 1 === i && (
									<Button
										onClick={handleAddClick}
										style={{
											margin: '5px',
											display: 'block'
										}}
									>
										<i className={'blue plus icon'} />
										افزودن
									</Button>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default UrlPattersInputs;
