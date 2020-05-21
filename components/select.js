import React, { useState, useEffect } from 'react';
import { Color } from 'ink';
import axios from 'axios';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';

const Select = () => {
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
			const baseUrl =
				'https://api.github.com/repos/kentcdodds/testing-node-apps/branches';
			const { data } = await axios.get(baseUrl);

			/**
			 * {
				label: 'First',
				value: 'first',
				},
			 */
			const branches = data.map(({ name }) => ({ label: name, value: name }));
			setBranches(branches);
			setLoading(false);
		}
		getBranches();
	}, []);
	const handleSelect = (item) => {};

	return (
		<>
			{loading && (
				<>
					<Color green>
						<Spinner type="dots" />
					</Color>
					{' Fetching'}
				</>
			)}
			<SelectInput items={branches} onSelect={handleSelect} />
		</>
	);
};

export default Select;
