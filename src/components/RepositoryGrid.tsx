import { useQuery } from 'urql';
import { RepositoryCard } from './RepositoryCard';

const REPOSITORIES_QUERY = `
	query RepositoriesQuery($login: String!) {
		user(login: $login) {
			repositories(first: 6, orderBy: {field: STARGAZERS, direction: DESC}) {
				nodes {
					name
					owner {
						login
					}
				}
			}
		}
	}
`;

export function RepositoryGrid() {
	const username = import.meta.env.VITE_GITHUB_USERNAME;

	const [result] = useQuery({
		query: REPOSITORIES_QUERY,
		variables: { login: username },
	});

	if (result.fetching) {
		return <div className="text-gray-600">Loading repositories...</div>;
	}

	if (result.error) {
		return (
			<div className="text-red-600">
				Error loading repositories: {result.error.message}
			</div>
		);
	}

	const repositories = result.data?.user?.repositories?.nodes || [];

	if (repositories.length === 0) {
		return <div className="text-gray-600">No repositories found</div>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{repositories.map((repo: any) => (
				<RepositoryCard
					key={`${repo.owner.login}/${repo.name}`}
					owner={repo.owner.login}
					name={repo.name}
				/>
			))}
		</div>
	);
}
