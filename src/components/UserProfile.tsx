import { gql, useQuery } from "urql";
import { UserStats } from './UserStats';
import { UserLanguages } from './UserLanguages';
import { UserPinnedRepos } from './UserPinnedRepos';

const USER_PROFILE_QUERY = gql`
	query UserProfileQuery {
		viewer {
			id
			login
			name
			avatarUrl
			bio
		}
	}
`;

export function UserProfile() {
	const [result] = useQuery({ query: USER_PROFILE_QUERY });

	if (result.fetching) {
		return <div className="text-gray-600">Loading profile...</div>;
	}

	if (result.error) {
		return (
			<div className="text-red-600">
				Error loading profile: {result.error.message}
			</div>
		);
	}

	const user = result.data?.viewer;

	if (!user) {
		return <div className="text-gray-600">No profile data</div>;
	}

	return (
		<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
			<div className="flex items-start gap-4">
				<img
					src={user.avatarUrl}
					alt={user.login}
					className="w-20 h-20 rounded-full"
				/>
				<div className="flex-grow">
					<h1 className="text-2xl font-bold text-gray-900">
						{user.name || user.login}
					</h1>
					<p className="text-gray-600">@{user.login}</p>
					{user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
					<UserStats />
					<UserLanguages />
					<UserPinnedRepos />
				</div>
			</div>
		</div>
	);
}
