import React from 'react';
import { Outlet } from 'react-router-dom';

export const PageLayout = () => {
	return (
		<>
			<div>
				<div style={{display: 'flex'}}>
					<div style={{width: '100%'}}>
						<Outlet/>
					</div>
				</div>
			</div>
		</>
	);
};