import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageLayout } from './layouts/PageLayout';
import { Pages } from './pages';
import  {DragDrop}  from './dragDropLayout';
import { data } from './data';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
	const [layout ,setlayout]=useState()
	useEffect(() => {
	  setlayout(data)
	}, [data])

	console.log(layout);
	
	
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<PageLayout />}>
						<Route path="/" element={<Pages.Homepage />} />
						<Route path="createForm/addFields" element={<Pages.CreateFields/>} />
						<Route path="createForm" element={<Pages.CreateNewForm/>} />
						<Route path="masterFields" element={<Pages.MasterFields/>} />
						<Route path="/layoutForm" element={<DragDrop Layout={layout} setLayout={setlayout}/>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
