import { graphql, type FragmentOf } from '../graphql';
import { UserStats, UserStatsFragment } from './UserStats';
import { UserLanguages, UserLanguagesFragment } from './UserLanguages';
import { UserPinnedRepos, UserPinnedReposFragment } from './UserPinnedRepos';

export const UserProfileFragment = graphql(`
	fragment UserProfile_user on User @_unmask {
		id
		login
		name
		avatarUrl
		bio
		...UserStats_user
		...UserLanguages_user
		...UserPinnedRepos_user
	}
`, [UserStatsFragment, UserLanguagesFragment, UserPinnedReposFragment]);

interface UserProfileProps {
	data: FragmentOf<typeof UserProfileFragment>;
}

export function UserProfile({ data }: UserProfileProps) {
	return (
		<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
			<div className="flex items-start gap-4">
				<img
					src={data.avatarUrl}
					alt={data.login}
					className="w-20 h-20 rounded-full"
				/>
				<div className="flex-grow">
					<h1 className="text-2xl font-bold text-gray-900">
						{data.name || data.login}
					</h1>
					<p className="text-gray-600">@{data.login}</p>
					{data.bio && <p className="text-gray-700 mt-2">{data.bio}</p>}
					<UserStats data={data} />
					<UserLanguages data={data} />
					<UserPinnedRepos data={data} />
				</div>
			</div>
		</div>
	);
}
