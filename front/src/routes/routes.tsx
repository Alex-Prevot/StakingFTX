import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

import HomePage from 'pages/home';

const Routes = (): JSX.Element => (
	<BrowserRouter>
		<RouterRoutes>
			<Route path="/" element={<HomePage />}/>
			<Route path="*" element={<Navigate replace to="/" />} />
		</RouterRoutes>
	</BrowserRouter>
);

export default Routes;