import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
	render() {
		return (
			<Html>
				<Head />
				<body className="bg-white dark:bg-black text-slate-900 dark:text-slate-100">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
