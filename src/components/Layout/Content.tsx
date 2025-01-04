const { Content } = Layout;
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router';

export const ContentBlock = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
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
	);
};
