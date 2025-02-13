import { ReactNode, useEffect, useState } from 'react';

export function Notice({ children }: { children: ReactNode }) {
	return (
		<p className="px-4 py-3 mb-8 text-yellow-950 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-950">
			{children}
		</p>
	);
}

export function DelayedNotice({
	children,
	delay = 500,
}: {
	children: ReactNode;
	delay?: number;
}) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setVisible(true);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [delay]);

	return visible ? <Notice>{children}</Notice> : null;
}
