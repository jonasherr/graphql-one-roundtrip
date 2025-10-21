import { Link, useParams } from "react-router-dom";
import { useQuery } from "urql";
import { IssueItemFragment, IssueList } from "../components/IssueList";
import {
	RepositoryHeader,
	RepositoryHeaderFragment,
} from "../components/RepositoryHeader";
import { graphql } from "../graphql";

const RepositoryPageQuery = graphql(
	`
	query RepositoryPageQuery($owner: String!, $name: String!) {
		repository(owner: $owner, name: $name) @_unmask {
			...RepositoryHeader_repository
			issues(first: 5, orderBy: {field: CREATED_AT, direction: DESC}, states: OPEN) {
				nodes {
					...IssueItem_issue
				}
			}
		}
	}
`,
	[RepositoryHeaderFragment, IssueItemFragment],
);

export default function RepositoryPage() {
	const { owner, name } = useParams<{ owner: string; name: string }>();

	const [result] = useQuery({
		query: RepositoryPageQuery,
		variables: { owner: owner || "", name: name || "" },
		pause: !owner || !name,
	});

	if (!owner || !name) {
		return <div className="text-red-600">Invalid repository URL</div>;
	}

	if (result.fetching) {
		return (
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<Link
					to="/"
					className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
				>
					← Back to repositories
				</Link>
				<div className="text-gray-600">Loading...</div>
			</div>
		);
	}

	if (result.error) {
		return (
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<Link
					to="/"
					className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
				>
					← Back to repositories
				</Link>
				<div className="text-red-600">Error: {result.error.message}</div>
			</div>
		);
	}

	const repository = result.data?.repository;
	const issues =
		repository?.issues?.nodes?.filter((node) => node != null) || [];

	if (!repository) {
		return (
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<Link
					to="/"
					className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
				>
					← Back to repositories
				</Link>
				<div className="text-gray-600">Repository not found</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<Link
				to="/"
				className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
			>
				← Back to repositories
			</Link>
			<RepositoryHeader data={repository} />
			<IssueList issues={issues} />
		</div>
	);
}
