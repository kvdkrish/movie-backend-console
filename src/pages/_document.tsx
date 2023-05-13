import { Html, Head, Main, NextScript } from "next/document";
import { darkTheme } from "styles/stitchesConfig";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Main />
				<div id="portal" className={darkTheme} />
				<NextScript />
			</body>
		</Html>
	);
}
