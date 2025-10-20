import { useParams, Link } from 'react-router-dom';
import { RepositoryHeader } from '../components/RepositoryHeader';
import { IssueList } from '../components/IssueList';

export default function RepositoryPage() {
	const { owner, name } = useParams<{ owner: string; name: string }>();

	if (!owner || !name) {
		return <div className="text-red-600">Invalid repository URL</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<Link
				to="/"
				className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
			>
				← Back to repositories
			</Link>
			<RepositoryHeader owner={owner} name={name} />
			<IssueList owner={owner} name={name} />
		</div>
	);
}
