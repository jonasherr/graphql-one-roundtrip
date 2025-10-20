interface Issue {
	id: string;
	title: string;
	number: number;
	state: string;
	createdAt: string;
}

interface IssueItemProps {
	issue: Issue;
}

export function IssueItem({ issue }: IssueItemProps) {
	const date = new Date(issue.createdAt).toLocaleDateString();

	return (
		<div className="border-b border-gray-200 py-4 last:border-b-0">
			<div className="flex items-start justify-between">
				<div className="flex-grow">
					<h3 className="text-lg font-medium text-gray-900 mb-1">
						{issue.title}
					</h3>
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<span className="font-mono">#{issue.number}</span>
						<span>•</span>
						<span className={`px-2 py-1 rounded text-xs font-medium ${
							issue.state === 'OPEN'
								? 'bg-green-100 text-green-800'
								: 'bg-purple-100 text-purple-800'
						}`}>
							{issue.state.toLowerCase()}
						</span>
						<span>•</span>
						<span>opened on {date}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
