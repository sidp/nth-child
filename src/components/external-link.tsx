import React, { FC } from 'react';

type ExternalLinksProps = React.HTMLProps<HTMLAnchorElement>;

const ExternalLink: FC<ExternalLinksProps> = ({ children, ...props }) => (
	<a {...props} className="text-blue-600 dark:text-blue-400 underline">
		{children}
	</a>
);

export default ExternalLink;
