import React, { useState, useEffect } from 'react';
import { Box, Color, Text } from 'ink';
import axios from 'axios';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import Divider from 'ink-divider';

const Branch = ({ topic, handleSelect, handleHighlight }) => {
	const [branches, setBranches] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		/**
		 * 	{
				"name": "master",
				"commit": {
				"sha": "b71ca551ba164f5f049eeafd8bbd0605c1325227",
				"url": "https://api.github.com/repos/kentcdodds/testing-node-apps/commits/b71ca551ba164f5f049eeafd8bbd0605c1325227"
				},
				"protected": false
 			 },
		 */
		async function getBranches() {
			const baseUrl = `https://api.github.com/repos/fw-hackathon/${topic}/branches`;
			const { data } = await axios.get(baseUrl);

			/**
			 * {
				label: 'First',
				value: 'first',
				},
			 */
			const branches = data.map(({ name }) => ({ label: name, value: name }));
			const back = { label: '⏮  back to topics', value: 'back' };
			setBranches([...branches, back]);
			setLoading(false);
		}
		getBranches();
	}, []);

	return (
		<>
			<Box>💰 Please select which lesson you want to start challenging.</Box>
			<Divider title={''} padding={2} />
			{loading && (
				<>
					<Color green>
						<Spinner type="dots" />
					</Color>
					{' Fetching'}
				</>
			)}
			{branches.length === 1 && (
				<Box>
					<Color red>No Lesson Yet...</Color>
					<Text>please go back to topics</Text>
				</Box>
			)}
			<SelectInput
				items={branches}
				onSelect={handleSelect}
				onHighlight={handleHighlight}
			/>
		</>
	);
};

export default Branch;
