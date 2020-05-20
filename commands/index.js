import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Text } from "ink";
import Markdown from "ink-markdown";
import dedent from "dedent";
import axios from "axios";

/// Hello world command
const markdown = dedent`
# create-pastel-app [![Build Status](https://travis-ci.org/vadimdemedes/create-pastel-app.svg?branch=master)](https://travis-ci.org/vadimdemedes/create-pastel-app)

> Generate a starter [Pastel](https://github.com/vadimdemedes/pastel) app


## Usage

This helper tool scaffolds out basic project structure for Pastel apps and lets you avoid the boilerplate and get to building beautiful CLIs in no time.

\`\`\`js
console.log('jiso');
\`\`\`

![](media/demo.gif)


## License

MIT © [Vadim Demedes](https://vadimdemedes.com)
`;

const Hello = () => {
  const [md, setMd] = useState("");

  useEffect(() => {
    async function getReadme() {
      const readme = await axios.get(
        "https://raw.githubusercontent.com/vadimdemedes/create-pastel-app/master/readme.md"
      );
      setMd(readme.data);
    }
    getReadme();
  }, [md]);
  return <Markdown>{md}</Markdown>;
};

export default Hello;
