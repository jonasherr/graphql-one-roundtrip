import { useQuery } from 'urql';
import { IssueItem } from './IssueItem';

const ISSUES_QUERY = `
	query IssuesQuery($owner: String!, $name: String!) {
		repository(owner: $owner, name: $name) {
			issues(first: 5, orderBy: {field: CREATED_AT, direction: DESC}, states: OPEN) {
				nodes {
					id
					title
					number
					state
					createdAt
				}
			}
		}
	}
`;

interface IssueListProps {
	owner: string;
	name: string;
}

export function IssueList({ owner, name }: IssueListProps) {
	const [result] = useQuery({
		query: ISSUES_QUERY,
		variables: { owner, name },
	});

	if (result.fetching) {
		return <div className="text-gray-600">Loading issues...</div>;
	}

	if (result.error) {
		return (
			<div className="text-red-600">
				Error loading issues: {result.error.message}
			</div>
		);
	}

	const issues = result.data?.repository?.issues?.nodes || [];

	return (
		<div className="bg-white rounded-lg shadow-sm p-6">
			<h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Issues</h2>
			{issues.length === 0 ? (
				<p className="text-gray-600">No open issues</p>
			) : (
				<div>
					{issues.map((issue: any) => (
						<IssueItem key={issue.id} issue={issue} />
					))}
				</div>
			)}
		</div>
	);
}
