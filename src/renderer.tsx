import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
	return (
		<html lang="ja">
			<head>
				<title>ssssota.dev</title>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link href="/style.css" rel="stylesheet" />
				<Style />
			</head>
			<body>{children}</body>
		</html>
	);
});
