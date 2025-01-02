import React from 'react';

import { Layout, theme } from 'antd';
import './app.css';
import { FooterComponent } from './components/Footer';
import { SideBar } from './components/SideBar';

const { Content } = Layout;

const App: React.FC = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout>
			<SideBar />
			<Layout>
				<Content style={{ margin: '20px 16px 0' }}>
					<div
						style={{
							padding: 24,
							minHeight: 740,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						content
					</div>
				</Content>
			<FooterComponent />
			</Layout>
		</Layout>
	);
};

export default App;
