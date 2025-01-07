import React from 'react';

import { Layout } from 'antd';
import './app.css';
import { FooterComponent } from './components/Footer/Footer';
import { ContentBlock } from './components/Layout/Content';
import { SideBar } from './components/SideBar/SideBar';

const App: React.FC = () => {
	return (
		<Layout>
			<SideBar />
			<Layout style={{ background: 'hsl(218deg 50% 91%)' }}>
				<ContentBlock />
			<FooterComponent />
			</Layout>
		</Layout>
	);
};

export default App;
