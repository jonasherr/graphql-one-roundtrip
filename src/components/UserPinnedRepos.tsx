import { Link } from "react-router-dom";
import { type FragmentOf, graphql, readFragment } from "../graphql";

export const UserPinnedReposFragment = graphql(`
	fragment UserPinnedRepos_user on User {
		pinnedItems(first: 6, types: REPOSITORY) {
			nodes {
				... on Repository {
					id
					name
					description
					stargazerCount
					owner {
						id
						__typename
						login
					}
				}
			}
		}
	}
`);

interface UserPinnedReposProps {
	data: FragmentOf<typeof UserPinnedReposFragment>;
}

export function UserPinnedRepos({ data }: UserPinnedReposProps) {
	const user = readFragment(UserPinnedReposFragment, data);
	const pinnedRepos =
		user.pinnedItems.nodes?.filter(
			(node) => node != null && node.__typename === "Repository",
		) || [];

	if (pinnedRepos.length === 0) {
		return null;
	}

	return (
		<div className="mt-4">
			<h3 className="text-sm font-semibold text-gray-700 mb-2">
				Pinned Repositories
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				{pinnedRepos.map(
					(repo) =>
						repo?.__typename === "Repository" && (
							<Link
								key={repo.id}
								to={`/repo/${repo.owner.login}/${repo.name}`}
								className="bg-gray-50 border border-gray-200 rounded-md p-3 hover:border-blue-400 transition-colors"
							>
								<div className="flex items-start justify-between">
									<h4 className="text-sm font-semibold text-blue-600 truncate">
										{repo.name}
									</h4>
									<div className="flex items-center text-xs text-gray-600 ml-2">
										<svg
											className="w-3 h-3 mr-1"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
										{repo.stargazerCount}
									</div>
								</div>
								{repo.description && (
									<p className="text-xs text-gray-600 mt-1 line-clamp-2">
										{repo.description}
									</p>
								)}
							</Link>
						),
				)}
			</div>
		</div>
	);
}
