import React, { useState, useEffect } from 'react';
import Markdown from 'ink-markdown';
import axios from 'axios';
import Divider from 'ink-divider';

const BACK = 'back';

const Readme = ({ topic, branch }) => {
	const [md, setMd] = useState('');

	useEffect(() => {
		async function getReadme() {
			const readme = await axios.get(
				`https://raw.githubusercontent.com/fw-hackathon/${topic}/${branch}/README.md`
			);
			setMd(readme.data);
		}
		if (branch === BACK) {
			setMd('');
			return;
		}
		if (topic && branch) {
			getReadme();
		}
	}, [branch]);
	return (
		<>
			<Divider title={''} padding={2} />
			<Markdown>{md}</Markdown>
		</>
	);
};

export default Readme;
