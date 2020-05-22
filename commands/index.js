import React, { useState } from 'react';
import Divider from 'ink-divider';
import Spinner from 'ink-spinner';
import { Color } from 'ink';

import Header from '../components/header';
import Topic from '../components/topic';
import Branch from '../components/branch';
import Readme from '../components/readme';

const Index = () => {
	const [step, setStep] = useState({ index: 0, payload: [] });
	const [loading, setLoading] = useState(false);
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

	// step 2
	const handleBranch = async (branch) => {
		const { value } = branch;
		if (value === 'back') {
			console.log(step.payload);
			back();
			return;
		}
		setStep({ index: 3, payload: step.payload });
		// checkout branch
		// console.log(__dirname);
		await command();
		// process.exit();
	};

	/**
	 * Executes a shell command and return it as a Promise.
	 * @param cmd {string}
	 * @return {Promise<string>}
	 */
	function execCmd(cmd) {
		const exec = require('child_process').exec;
		return new Promise((resolve, reject) => {
			exec(cmd, (error, stdout, stderr) => {
				if (error) {
					console.warn(error);
					reject(error);
				}
				resolve(stdout ? stdout : stderr);
			});
		});
	}

	const command = async () => {
		const baseUrl = `https://github.com/fw-hackathon/${step.payload[0]}`;
		const scripts = [
			`git clone --single-branch --branch ${step.payload[1]} ${baseUrl}`,
			`npm install --prefix ./${step.payload[0]}`,
			`npm run test:exercise:watch --prefix ./${step.payload[0]}`,
		];
		//
		console.log(await execCmd(scripts[0]));
		setLoading(true);
		await execCmd(scripts[1]);
		process.exit();
		// console.log(await execCmd(scripts[2]));
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
			{loading && (
				<>
					<Color green>
						<Spinner type="dots" />
					</Color>
					{' Installing...'}
				</>
			)}
		</>
	);
};

export default Index;
