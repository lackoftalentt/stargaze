import { Layout, theme } from 'antd';
import React from 'react';
import { Outlet } from 'react-router';
import './app.css';
import { FooterComponent } from './components/Footer/Footer';
import { SideBar } from './components/SideBar/SideBar';
const { Content } = Layout;

const App: React.FC = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<Layout>
			<SideBar />
			<Layout style={{ background: 'hsl(218deg 50% 91%)' }}>
				<Content style={{ margin: '20px 16px 0' }}>
					<div
						style={{
							padding: 24,
							minHeight: '100%',
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<Outlet />
					</div>
				</Content>
				<FooterComponent />
			</Layout>
		</Layout>
	);
};

export default App;
