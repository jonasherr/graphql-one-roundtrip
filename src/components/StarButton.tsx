import { useMutation } from 'urql';

const ADD_STAR_MUTATION = `
	mutation AddStarMutation($starrableId: ID!) {
		addStar(input: { starrableId: $starrableId }) {
			clientMutationId
		}
	}
`;

const REMOVE_STAR_MUTATION = `
	mutation RemoveStarMutation($starrableId: ID!) {
		removeStar(input: { starrableId: $starrableId }) {
			clientMutationId
		}
	}
`;

interface StarButtonProps {
	repositoryId: string;
	viewerHasStarred: boolean;
}

export function StarButton({ repositoryId, viewerHasStarred }: StarButtonProps) {
	const [addStarResult, addStar] = useMutation(ADD_STAR_MUTATION);
	const [removeStarResult, removeStar] = useMutation(REMOVE_STAR_MUTATION);

	const isLoading = addStarResult.fetching || removeStarResult.fetching;

	const handleClick = () => {
		if (viewerHasStarred) {
			removeStar({ starrableId: repositoryId });
		} else {
			addStar({ starrableId: repositoryId });
		}
	};

	return (
		<button
			onClick={handleClick}
			disabled={isLoading}
			className={`px-4 py-2 rounded-md font-medium transition-colors ${
				viewerHasStarred
					? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
					: 'bg-blue-600 text-white hover:bg-blue-700'
			} disabled:opacity-50 disabled:cursor-not-allowed`}
		>
			{isLoading ? (
				'Loading...'
			) : (
				<span className="flex items-center gap-2">
					<svg
						className="w-5 h-5"
						fill={viewerHasStarred ? 'currentColor' : 'none'}
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
						/>
					</svg>
					{viewerHasStarred ? 'Unstar' : 'Star'}
				</span>
			)}
		</button>
	);
}
