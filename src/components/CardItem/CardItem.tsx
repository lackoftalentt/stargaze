import { HighlightOutlined, XOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { useState } from 'react';
import s from './CardItem.module.scss';

export const CardItem = () => {
	
	return (
		<div className={s.card}>
			<div className={s.cardHeader}>
				<h3 className={s.cardTitle}>Task title</h3>
				<Divider style={{ margin: 10 }} />
				<p className={s.cardDescription}>
					Task Description Lorem ipsum dolor, sit amet consectetur adipisicing
					elit. Nostrum, iure et maiores non enim, deleniti natus sequi minus
					magnam vero a repellat sit, adipisci facilis quidem! Impedit fuga
					veniam adipisci.
				</p>
			</div>
			<Divider style={{ margin: 10 }} />

			<div className={s.cardFooter}>
				<button className={s.cardButtons}>
					Delete <XOutlined />{' '}
				</button>
				<button className={s.cardButtons}>
					Edit <HighlightOutlined />{' '}
				</button>
				<section>Priority</section>
			</div>
		</div>
	);
};
