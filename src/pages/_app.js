import Head from 'next/head';
import Global from '../utils/styles';

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<script
					async
					defer
					data-domain="nth-child.simonsson.com"
					src="https://st.simonsson.com/js/index.js"
				></script>
			</Head>
			<Global />
			<Component {...pageProps} />{' '}
		</>
	);
}
