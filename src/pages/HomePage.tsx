import { useQuery } from "urql";
import { RepositoryCardFragment } from "../components/RepositoryCard";
import { RepositoryGrid } from "../components/RepositoryGrid";
import { UserProfile, UserProfileFragment } from "../components/UserProfile";
import { graphql } from "../graphql";

const HomePageQuery = graphql(
	`
	query HomePageQuery($login: String!) {
		viewer @_unmask {
			...UserProfile_user
		}
		user(login: $login) {
			id
			__typename
			repositories(first: 6, orderBy: {field: STARGAZERS, direction: DESC}) {
				nodes {
					...RepositoryCard_repository
				}
			}
		}
	}
`,
	[UserProfileFragment, RepositoryCardFragment],
);

export default function HomePage() {
	const username = import.meta.env.VITE_GITHUB_USERNAME;
	const [result] = useQuery({
		query: HomePageQuery,
		variables: { login: username },
	});

	if (result.fetching) {
		return (
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				<div className="text-gray-600">Loading...</div>
			</div>
		);
	}

	if (result.error) {
		return (
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				<div className="text-red-600">Error: {result.error.message}</div>
			</div>
		);
	}

	const viewer = result.data?.viewer;
	const repositories =
		result.data?.user?.repositories?.nodes?.filter((node) => node != null) ||
		[];

	if (!viewer) {
		return (
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				<div className="text-gray-600">No user data</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<UserProfile data={viewer} />
			<RepositoryGrid repositories={repositories} />
		</div>
	);
}
