import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'urql';
import { client } from './graphql/client';
import HomePage from './pages/HomePage';
import RepositoryPage from './pages/RepositoryPage';

function App() {
	return (
		<Provider value={client}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/repo/:owner/:name" element={<RepositoryPage />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
