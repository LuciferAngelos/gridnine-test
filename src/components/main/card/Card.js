import React, { useEffect, useState } from 'react'
import { Row, Col, Divider } from 'antd';
import { Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { convertDateToDate, convertDateToTime, convertNumberToTime, sortByPortion } from '../../../helpers/sortingArray';

const Card = ({ filteredData }) => {
	const [portion, setPortion] = useState(2);
	const [portionedArray, setPortionedArray] = useState(null)

	useEffect(() => {
		filteredData ? setPortionedArray(sortByPortion(filteredData, portion)) : setPortionedArray(null);
	}, [filteredData, portion, setPortion])

	return (
		<Row className='cardRow'>

			{portionedArray && portionedArray.map(item => {
				return <Col span={24} key={item.flightToken}>
					<Row justify='space-between' style={{ backgroundColor: '#0087c9', padding: ' 10px' }}>
						<Col span={6}>
							{item.flight.carrier.caption}
						</Col>
						<Col span={8} >
							<Row>
								<Col span={24} className='cardHeaderDirection'>
									<h3>{item.flight.price.total.amount} ₽</h3>
								</Col>
								<Col span={24} className='cardHeaderDirection'>
									<p>	Стоимость для одного взрослого пассажира</p>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row justify='center'>
						<Col span={24} style={{ borderBottom: '1px solid #e5e5e5' }} className='styledCol'>
							{item.flight.legs[0].segments[0].departureCity.caption}, {item.flight.legs[0].segments[0].departureAirport.caption}
							<span className='spanAbbreviation'>
								({item.flight.legs[0].segments[0].departureAirport.uid}) &#10141;
								  </span>
							{item.flight.legs[0].segments.length > 1 ? (item.flight.legs[0].segments[1].arrivalAirport.caption) : (item.flight.legs[0].segments[0].arrivalAirport.caption)},&ensp;
							{item.flight.legs[0].segments.length > 1 ? item.flight.legs[0].segments[1].arrivalAirport.caption : item.flight.legs[0].segments[0].arrivalAirport.caption}
							<span className='spanAbbreviation'>({item.flight.legs[0].segments.length > 1 ? item.flight.legs[0].segments[1].arrivalAirport.uid : item.flight.legs[0].segments[0].arrivalAirport.uid})
							</span>
						</Col>
					</Row>
					<Row justify='space-between'>
						<Col span={5} className='styledColHigherPadding styledCol'>{convertDateToTime(item.flight.legs[0].segments[0].departureDate)}
							<span className='spanDate'> &nbsp;
								{convertDateToDate(item.flight.legs[0].segments[0].departureDate)}</span>
						</Col>
						<Col span={5} className='styledColHigherPadding styledCol'><ClockCircleOutlined /> {convertNumberToTime(item.flight.legs[0].segments.length > 1 ? item.flight.legs[0].segments[1].arrivalDate : item.flight.legs[0].segments[0].arrivalDate, item.flight.legs[0].segments[0].departureDate)}  </Col>
						<Col span={5} className='styledColHigherPadding styledCol'>
							<span className="spanDate">
								{convertDateToDate(item.flight.legs[0].segments.length > 1 ? item.flight.legs[0].segments[1].arrivalDate : item.flight.legs[0].segments[0].arrivalDate)} </span>
								&nbsp; {convertDateToTime(item.flight.legs[0].segments.length > 1 ? item.flight.legs[0].segments[1].arrivalDate : item.flight.legs[0].segments[0].arrivalDate)}
						</Col>
					</Row>
					<Divider orientation='center' className='customDivider'>
						{(item.flight.legs[0].segments[0] && item.flight.legs[0].segments[1]) && (item.flight.legs[0].segments[0].aircraft.uid !== item.flight.legs[0].segments[1].aircraft.uid) ? '1 пересадка' : null}
					</Divider>
					<Row>
						<Col span={24} className='styledColHigherPadding styledCol'>Рейс выполняет {item.flight.carrier.caption}</Col>
					</Row>
					<Divider style={{ borderTopColor: '#0084c5', margin: '0', borderTopWidth: '2px' }} />
					<Row justify='center'>
						<Col span={24} style={{ borderBottom: '1px solid #e5e5e5' }} className='styledCol'>
							{item.flight.legs[1].segments[0].departureAirport.caption},
							{item.flight.legs[1].segments[0].departureAirport.caption}
							<span className='spanAbbreviation'>
								({item.flight.legs[1].segments[0].departureAirport.uid}) &#10141;
							</span>
							{item.flight.legs[1].segments.length > 1 ? (item.flight.legs[1].segments[1].arrivalAirport.caption) : (item.flight.legs[1].segments[0].arrivalAirport.caption)},&ensp;
							{item.flight.legs[1].segments.length > 1 ? item.flight.legs[1].segments[1].arrivalAirport.caption : item.flight.legs[1].segments[0].arrivalAirport.caption}
							<span className='spanAbbreviation'>
								({item.flight.legs[1].segments.length > 1 ? item.flight.legs[1].segments[1].arrivalAirport.uid : item.flight.legs[1].segments[0].arrivalAirport.uid})
							</span></Col>
					</Row>
					<Row justify='space-between'>
						<Col span={5} className='styledColHigherPadding styledCol'>{convertDateToTime(item.flight.legs[1].segments[0].departureDate)} <span className='spanDate'>{convertDateToDate(item.flight.legs[1].segments[0].departureDate)}</span></Col>
						<Col span={5} className='styledColHigherPadding styledCol'><ClockCircleOutlined /> {convertNumberToTime(item.flight.legs[1].segments.length > 1 ? item.flight.legs[1].segments[1].arrivalDate : item.flight.legs[1].segments[0].arrivalDate, item.flight.legs[1].segments[0].departureDate)} </Col>
						<Col span={5} className='styledColHigherPadding styledCol'> <span className="spanDate">{convertDateToDate(item.flight.legs[1].segments.length > 1 ? item.flight.legs[1].segments[1].arrivalDate : item.flight.legs[1].segments[0].arrivalDate)}</span> {convertDateToTime(item.flight.legs[1].segments.length > 1 ? item.flight.legs[1].segments[1].arrivalDate : item.flight.legs[1].segments[0].arrivalDate)}
						</Col>
					</Row>
					<Divider orientation='center' className='customDivider'>
						{(item.flight.legs[1].segments[0] && item.flight.legs[1].segments[1]) && (item.flight.legs[1].segments[0].aircraft.uid !== item.flight.legs[1].segments[1].aircraft.uid) ? '1 пересадка' : null}
					</Divider>
					<Row>
						<Col span={24} className='styledColHigherPadding styledCol'>Рейс выполняет {item.flight.carrier.caption}</Col>
					</Row>
					<Button block type='primary' className='chooseBtn' >Выбрать</Button>
				</Col>
			})}

			{(portionedArray && portionedArray.length >= 2) && <button className='loadMoreBtn' onClick={() => setPortion(portion + 10)}>Показать ещё</button>}

			{(portionedArray && portionedArray.length === 0) && <Row justify='center'>
				<Col span={24} style={{ margin: '0 auto' }}>Ничего не найдено! Попробуйте изменить параметры поиска!</Col>
			</Row>}
		</Row>

	)
}

export default Card