import React from 'react';
import ReactMarkdown from 'react-markdown';

const markdown = (props) => {
  return (
            <ReactMarkdown
              source={props.source}
              escapeHtml={true}
              disallowedTypes={['Image', 'Heading', 'Hardbreak', 'ThematicBreak']}
            />
  );
}

export default markdown;
