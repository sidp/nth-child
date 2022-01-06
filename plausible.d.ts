type PlausibleEvent = 'Changed pattern';

type PlausibleArgs = [PlausibleEvent, () => void] | [PlausibleEvent];

type plausible = {
	(...args: PlausibleArgs): void;
	q?: PlausibleArgs[];
};

interface Window {
	plausible?: plausible;
}
