import React from 'react'
import { Col } from 'antd';
import { Formik, Field, Form, } from 'formik';
import { uniqueFiltered } from '../../helpers/sortingArray';



const CompareInputs = ({ initialValues }) => {

	if (initialValues.priceUpTo < initialValues.priceFrom) {
		return (<span style={{ color: 'red' }}>Alarm! Сумма ОТ должна быть меньше суммы ДО!</span>)
	}
	return null
}

const Sidebar = ({ initialValues, handleChangeValues, filteredData }) => {

	return (
		<Col span={6} className="gutter-row">
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					handleChangeValues(values)
				}}
			>
				{({ values, handleChange, submitForm }) => (
					<Form style={{ height: '100vh' }}>
						<div className='aside-block-header' id="my-radio-group">Сортировать</div>
						<div role="group" aria-labelledby="my-radio-group">
							<label>
								<Field onChange={e => {
									handleChange(e);
									setTimeout(() => {
										submitForm();
									});
								}} type="radio" name="pickedSorting" value="priceUp" />
								&ensp;- по возрастанию цены
            </label>
							<label>
								<Field onChange={e => {
									handleChange(e);
									setTimeout(() => {
										submitForm();
									});
								}} type="radio" name="pickedSorting" value="priceDown" />
								&ensp;- по убыванию цены
            </label>
							<label>
								<Field onChange={e => {
									handleChange(e);
									setTimeout(() => {
										submitForm();
									});
								}} type="radio" name="pickedSorting" value="flightTime" />
               &ensp;- по времени в пути
            </label>
						</div>

						<div className='aside-block-header' id="checkbox-group-filter">Фильтровать</div>
						<div role="group" aria-labelledby="checkbox-group-filter">
							<label>
								<Field onChange={e => {
									handleChange(e);
									setTimeout(() => {
										submitForm();
									});
								}} type="checkbox" name="checkedFilter" value="oneTransfer" />
               &ensp;- 1 пересадка
            </label>
							<label>
								<Field onChange={e => {
									handleChange(e);
									setTimeout(() => {
										submitForm();
									});
								}} type="checkbox" name="checkedFilter" value="noTransfers" />
               &ensp;- без пересадок
            </label>

						</div>

						<div className='aside-block-header'>Цена</div>
						<div>
							<label htmlFor="priceFrom" style={{ marginBottom: '1rem' }}>От &ensp;
							<Field onBlur={e => {
									handleChange(e);
									setTimeout(() => {
										submitForm();
									});
								}} type='number' id="priceFrom" name="priceFrom" placeholder="0" />
							</label>
							<label htmlFor="priceUpTo">До &ensp;
							<Field onBlur={e => {
									handleChange(e);
									setTimeout(() => {
										submitForm();
									});
								}} type='number' id="priceUpTo" name="priceUpTo" placeholder="0" />
							</label>
							<CompareInputs initialValues={initialValues} />
						</div>

						<div className='aside-block-header' id="checkbox-group-a-comps">Авиакомпании</div>
						<div className='limitedDiv' role="group" aria-labelledby="checkbox-group-a-comps">
							{filteredData && uniqueFiltered(filteredData).map((item, idx) =>
								<label key={idx} >
									<Field onChange={e => {
										handleChange(e);
										setTimeout(() => {
											submitForm();
										});
									}} type="checkbox" name="checkedCompanies" value={item.flightToken} />
								&ensp;- {item.flight.carrier.caption} от {item.flight.price.total.amount}
								</label>
							)}
						</div>
					</Form>
				)}

			</Formik>

		</Col >

	)
}

export default Sidebar