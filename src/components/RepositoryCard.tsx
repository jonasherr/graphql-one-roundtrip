import { useQuery } from 'urql';
import { Link } from 'react-router-dom';

const REPOSITORY_QUERY = `
	query RepositoryCardQuery($owner: String!, $name: String!) {
		repository(owner: $owner, name: $name) {
			id
			name
			description
			stargazerCount
			url
			owner {
				login
			}
		}
	}
`;

interface RepositoryCardProps {
	owner: string;
	name: string;
}

export function RepositoryCard({ owner, name }: RepositoryCardProps) {
	const [result] = useQuery({
		query: REPOSITORY_QUERY,
		variables: { owner, name },
	});

	if (result.fetching) {
		return (
			<div className="bg-white rounded-lg shadow-sm p-6 h-48">
				<div className="text-gray-600">Loading...</div>
			</div>
		);
	}

	if (result.error) {
		return (
			<div className="bg-white rounded-lg shadow-sm p-6 h-48">
				<div className="text-red-600 text-sm">Error loading repository</div>
			</div>
		);
	}

	const repo = result.data?.repository;

	if (!repo) {
		return null;
	}

	return (
		<Link
			to={`/repo/${repo.owner.login}/${repo.name}`}
			className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow block h-48 flex flex-col"
		>
			<h3 className="text-xl font-semibold text-blue-600 mb-2">
				{repo.name}
			</h3>
			<p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-grow">
				{repo.description || 'No description'}
			</p>
			<div className="flex items-center text-gray-600 text-sm">
				<svg
					className="w-4 h-4 mr-1"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
				{repo.stargazerCount.toLocaleString()}
			</div>
		</Link>
	);
}
