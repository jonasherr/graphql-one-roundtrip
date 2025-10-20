import { RepositoryGrid } from "../components/RepositoryGrid";
import { UserProfile } from "../components/UserProfile";

export default function HomePage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<UserProfile />
			<RepositoryGrid />
		</div>
	);
}
