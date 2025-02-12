import Document, { Head, Html, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
	render() {
		return (
			<Html>
				<Head />
				<body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
