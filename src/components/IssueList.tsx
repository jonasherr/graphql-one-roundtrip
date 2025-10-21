import { type FragmentOf, readFragment } from "../graphql";
import { IssueItem, IssueItemFragment } from "./IssueItem";

export { IssueItemFragment };

interface IssueListProps {
	issues: Array<FragmentOf<typeof IssueItemFragment>>;
}

export function IssueList({ issues }: IssueListProps) {
	return (
		<div className="bg-white rounded-lg shadow-sm p-6">
			<h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Issues</h2>
			{issues.length === 0 ? (
				<p className="text-gray-600">No open issues</p>
			) : (
				<div>
					{issues.map((issueFragment) => {
						const { id } = readFragment(IssueItemFragment, issueFragment);
						return <IssueItem key={id} data={issueFragment} />;
					})}
				</div>
			)}
		</div>
	);
}
