import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import './firebase';
import { BoardPage } from './pages/BoardPage/BoardPage';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';
import { RegisterPage } from './pages/RegisterPage';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path='login' element={<LoginPage />} />
			<Route path='register' element={<RegisterPage />} />
			<Route path='/' element={<App />}>
				<Route index element={<MainPage />} />
				<Route path='board/:id' element={<BoardPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
