import React from 'react'
import { Col } from 'antd';
import Card from './card/Card';

const Main = ({ filteredData }) => {

	return (
		<Col span={17} className="gutter-row mainContent" >
			<Card filteredData={filteredData} />
		</Col>

	)
}

export default Main