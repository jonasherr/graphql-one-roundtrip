import { graphql, type FragmentOf, readFragment } from "../graphql";

export const UserLanguagesFragment = graphql(`
	fragment UserLanguages_user on User {
		repositoryLanguages: repositories(first: 100, ownerAffiliations: OWNER) {
			nodes {
				primaryLanguage {
					name
					color
				}
			}
		}
	}
`);

interface Language {
	name: string;
	color: string;
	count: number;
}

interface UserLanguagesProps {
	data: FragmentOf<typeof UserLanguagesFragment>;
}

export function UserLanguages({ data }: UserLanguagesProps) {
	const user = readFragment(UserLanguagesFragment, data);
	const repositories = user.repositoryLanguages.nodes || [];

	// Aggregate languages
	const languageMap = new Map<string, Language>();

	repositories.forEach((repo: any) => {
		if (repo.primaryLanguage) {
			const { name, color } = repo.primaryLanguage;
			const existing = languageMap.get(name);
			if (existing) {
				existing.count += 1;
			} else {
				languageMap.set(name, { name, color, count: 1 });
			}
		}
	});

	// Sort by count and take top 8
	const topLanguages = Array.from(languageMap.values())
		.sort((a, b) => b.count - a.count)
		.slice(0, 8);

	if (topLanguages.length === 0) {
		return null;
	}

	return (
		<div className="mt-4">
			<h3 className="text-sm font-semibold text-gray-700 mb-2">
				Top Languages
			</h3>
			<div className="flex gap-2 flex-wrap">
				{topLanguages.map((lang) => (
					<div
						key={lang.name}
						className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1.5"
					>
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: lang.color || "#858585" }}
						/>
						<span className="text-sm text-gray-700">{lang.name}</span>
						<span className="text-xs text-gray-500">({lang.count})</span>
					</div>
				))}
			</div>
		</div>
	);
}
