import React, { useState, useEffect } from 'react';
import Markdown from 'ink-markdown';
import axios from 'axios';
import Divider from 'ink-divider';

import Header from '../components/header';
import Select from '../components/select';

const Index = () => {
	const [md, setMd] = useState('');

	useEffect(() => {
		async function getReadme() {
			const readme = await axios.get(
				'https://raw.githubusercontent.com/vadimdemedes/create-pastel-app/master/readme.md'
			);
			setMd(readme.data);
		}
		getReadme();
	}, [md]);
	return (
		<>
			<Header />
			{/* <Divider title={'🚀🚀🚀'} /> */}
			<Select />
		</>
	);
};

export default Index;
