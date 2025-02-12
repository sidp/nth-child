import { useEffect } from 'react';
import favicon from '../utils/favicon';

export function usePatternFavicon(pattern: string) {
	useEffect(() => {
		const icoEl = document.querySelector(
			'head link[rel="icon"][type="image/x-icon"]'
		);
		if (icoEl) {
			icoEl.parentElement?.removeChild(icoEl);
		}

		const iconEl = document.querySelector(
			'head link[rel="icon"][type="image/svg+xml"]'
		);
		if (iconEl) {
			iconEl.setAttribute('href', favicon(pattern));
		}
	}, [pattern]);
}
