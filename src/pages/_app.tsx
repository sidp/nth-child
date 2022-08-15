import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/main.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<Script
					async
					defer
					data-domain="nth-child.simonsson.com"
					src="https://st.simonsson.com/js/index.js"
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
