import { initGraphQLTada } from "gql.tada";
import type { introspection } from "./graphql/graphql-env.d.ts";

export const graphql = initGraphQLTada<{
	introspection: introspection;
	scalars: {
		DateTime: string;
		URI: string;
		HTML: string;
		GitObjectID: string;
		GitTimestamp: string;
		X509Certificate: string;
	};
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
