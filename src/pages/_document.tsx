import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

class CustomDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<Script
						defer
						data-domain="nth-child.simonsson.com"
						src="/js/script.js"
					/>
					<Script id="plausible-function">
						{`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
					</Script>
				</Head>
				<body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
