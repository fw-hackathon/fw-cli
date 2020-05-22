import React, { useState } from 'react';
import Divider from 'ink-divider';

import Header from '../components/header';
import Topic from '../components/topic';
import Branch from '../components/branch';
import Readme from '../components/readme';

const Index = () => {
	const [step, setStep] = useState({ index: 0, payload: [] });

	// go back
	const back = () => {
		// let payload = [...step.payload];
		// payload.pop();
		// payload.pop();
		// setStep({ index: step.index - 2, payload });
		setStep({ index: 0, payload: [] });
	};

	// step 0
	const handleTopic = (topic) => {
		const { value } = topic;
		setStep({ index: 1, payload: [...step.payload, value] });
	};

	// step 1
	const handleBranch = (branch) => {
		const { value } = branch;
		if (value === 'back') {
			console.log(step.payload);
			back();
		}

		// checkout branch
	};

	const handleBranchHighlight = (branch) => {
		const { value } = branch;
		if (step.payload.length === 1) {
			setStep({ index: 2, payload: [...step.payload, value] });
		} else if (step.payload.length === 2) {
			const originPayload = [...step.payload];
			originPayload.pop();
			setStep({ index: 2, payload: [...originPayload, value] });
		}
	};

	return (
		<>
			<Header />
			{step.index === 0 && <Topic handleSelect={handleTopic} />}
			{(step.index === 1 || step.index === 2) && (
				<>
					<Branch
						topic={step.payload[0]}
						handleSelect={handleBranch}
						handleHighlight={handleBranchHighlight}
					/>
				</>
			)}
			{step.index === 2 && (
				<Readme topic={step.payload[0]} branch={step.payload[1]} />
			)}
			<Divider title={'🚀🚀🚀'} />
		</>
	);
};

export default Index;
