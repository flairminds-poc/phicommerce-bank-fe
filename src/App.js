import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageLayout } from './layouts/PageLayout';
import { Pages } from './pages';
import FormLayout from './layouts/FormLayout';
import Container from './dragDropLayout/example';
import { DragDrop } from './dragDropLayout';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<PageLayout />}>
						<Route path="/" element={<Pages.Homepage />} />
						<Route path="createForm/addFields" element={<Pages.CreateFields/>} />
						<Route path="createForm" element={<Pages.CreateNewForm/>} />
						<Route path="masterFields" element={<Pages.MasterFields/>} />
						<Route path="/layoutForm" element={<DragDrop/>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
