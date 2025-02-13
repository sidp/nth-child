import React, { ReactNode } from 'react';

type ExternalLinksProps = React.HTMLProps<HTMLAnchorElement> & {
	children: ReactNode;
};

export function ExternalLink({ children, ...props }: ExternalLinksProps) {
	return (
		<a {...props} className="text-blue-600 dark:text-blue-400 underline">
			{children}
		</a>
	);
}
