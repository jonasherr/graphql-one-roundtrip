import { useQuery } from 'urql';
import { StarButton } from './StarButton';

const REPOSITORY_HEADER_QUERY = `
	query RepositoryHeaderQuery($owner: String!, $name: String!) {
		repository(owner: $owner, name: $name) {
			id
			name
			description
			stargazerCount
			url
			owner {
				login
			}
			viewerHasStarred
		}
	}
`;

interface RepositoryHeaderProps {
	owner: string;
	name: string;
}

export function RepositoryHeader({ owner, name }: RepositoryHeaderProps) {
	const [result] = useQuery({
		query: REPOSITORY_HEADER_QUERY,
		variables: { owner, name },
	});

	if (result.fetching) {
		return <div className="text-gray-600">Loading repository...</div>;
	}

	if (result.error) {
		return (
			<div className="text-red-600">
				Error loading repository: {result.error.message}
			</div>
		);
	}

	const repo = result.data?.repository;

	if (!repo) {
		return <div className="text-gray-600">Repository not found</div>;
	}

	return (
		<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
			<h1 className="text-3xl font-bold text-gray-900 mb-2">{repo.name}</h1>
			<p className="text-gray-700 mb-4">
				{repo.description || 'No description'}
			</p>
			<div className="flex items-center gap-4">
				<div className="flex items-center text-gray-600">
					<svg
						className="w-5 h-5 mr-1"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
					{repo.stargazerCount.toLocaleString()} stars
				</div>
				<StarButton
					repositoryId={repo.id}
					viewerHasStarred={repo.viewerHasStarred}
				/>
			</div>
		</div>
	);
}
