import React, { useState, useEffect } from 'react';
import { Box, Color } from 'ink';
import axios from 'axios';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';

const parseRepos = (repos) => {
	const parse = 'fw-testing-';
	const data = [];
	repos.forEach((repo) => {
		if (repo.name.includes(parse)) {
			repo.label = repo.name.split(parse)[1];
			data.push(repo);
		}
	});
	return data;
};

const Select = ({ handleSelect }) => {
	const [topics, setTopics] = useState([]);
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
		async function getTopics() {
			const baseUrl = 'https://api.github.com/orgs/fw-hackathon/repos';
			const { data } = await axios.get(baseUrl);
			/**
			 * {
				label: 'First',
				value: 'first',
				},
			 */
			const topics = parseRepos(data).map(({ name, label }) => ({
				label,
				value: name,
			}));
			setTopics(topics);
			setLoading(false);
		}
		getTopics();
	}, []);

	return (
		<>
			<Box>
				Welcome to the tutorial, please select which topic you want to learn.
			</Box>
			{loading && (
				<>
					<Color green>
						<Spinner type="dots" />
					</Color>
					{' Fetching'}
				</>
			)}
			<SelectInput items={topics} onSelect={handleSelect} />
		</>
	);
};

export default Select;
