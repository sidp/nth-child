import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/main.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<script
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
