import React, { FC, ReactNode } from 'react';

type ExternalLinksProps = React.HTMLProps<HTMLAnchorElement> & {
	children: ReactNode;
};

const ExternalLink: FC<ExternalLinksProps> = ({ children, ...props }) => (
	<a {...props} className="text-blue-600 dark:text-blue-400 underline">
		{children}
	</a>
);

export default ExternalLink;
