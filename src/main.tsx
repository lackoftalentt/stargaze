import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import './firebase';
import { BoardPage } from './pages/BoardPage/BoardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='login' element={<LoginPage />} />
				<Route path='register' element={<RegisterPage />} />
				<Route path='/' element={<App />}>
					<Route index element={<BoardPage />} />
					<Route path='huesos' element={<BoardPage />} />
					<Route path='tsukumi' element={<BoardPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
