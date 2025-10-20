import { cacheExchange, createClient, fetchExchange } from "urql";

export const client = createClient({
	url: "https://api.github.com/graphql",
	exchanges: [cacheExchange, fetchExchange],
	preferGetMethod: false,
	fetchOptions: () => {
		const token = import.meta.env.VITE_GITHUB_TOKEN;
		if (!token) {
			console.error("VITE_GITHUB_TOKEN is not defined");
		}
		return {
			headers: {
				Authorization: token ? `Bearer ${token}` : "",
				"Content-Type": "application/json",
			},
		};
	},
});
