import { type FragmentOf } from '../graphql';
import { RepositoryCard, RepositoryCardFragment } from './RepositoryCard';

interface RepositoryGridProps {
	repositories: Array<FragmentOf<typeof RepositoryCardFragment>>;
}

export function RepositoryGrid({ repositories }: RepositoryGridProps) {
	if (repositories.length === 0) {
		return <div className="text-gray-600">No repositories found</div>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{repositories.map((repo) => (
				<RepositoryCard
					key={repo.id}
					data={repo}
				/>
			))}
		</div>
	);
}
