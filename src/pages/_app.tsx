import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { globalStyles } from "styles/stitchesConfig";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
	uri: "http://localhost:4000",
	cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
	globalStyles();
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}
