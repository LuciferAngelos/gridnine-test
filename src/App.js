import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Row } from 'antd';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import { initializeApp } from './redux/appReducer';
import { Preloader } from './components/preloader/Preloader';
import { filterDataFromCompanies, filterFlightsByTransfers, sortByLowingPrice, sortByRisingPrice, sortByTravelDuration } from './helpers/sortingArray';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  const isInitialized = useSelector(state => state.app.initialized)


  const [initialValues, setinitialValues] = useState({
    pickedSorting: '' || 'priceUp',
    checkedFilter: [],
    checkedCompanies: [],
    priceFrom: '',
    priceUpTo: ''
  })


  const dataForFiltering = useSelector(state => state.flightRaces.flights);
  const [dataFromStore, setDataFromStore] = useState(null);

  useEffect(() => {
    dataForFiltering ? setDataFromStore(dataForFiltering) : setDataFromStore(null)
  }, [dataForFiltering])


  //General sorting function 
  //Getting data from aircompanies 
  //and sort by price companies if needed

  const casualFilteredData = useMemo(() => {
    if (dataFromStore) {
      return filterDataFromCompanies(dataFromStore, initialValues.checkedCompanies)
    }
  }, [dataFromStore, initialValues.checkedCompanies])


  //Sort flights by price and travel duration
  const getFilteredDataByPriceAndDuration = useMemo(() => {
    if (casualFilteredData) {
      switch (initialValues.pickedSorting) {
        case ('priceUp'):
          return sortByRisingPrice(casualFilteredData);
        case ('priceDown'):
          return sortByLowingPrice(casualFilteredData);
        case ('flightTime'):
          return sortByTravelDuration(casualFilteredData);
        default:
          return casualFilteredData
      }

    }
  }, [casualFilteredData, initialValues.pickedSorting])

  //Filter flights by transfers
  const getFilteredDataByTransfers = useMemo(() => {
    if (getFilteredDataByPriceAndDuration) {
      switch (initialValues.checkedFilter.join(' ')) {
        case ('oneTransfer'):
          return filterFlightsByTransfers(getFilteredDataByPriceAndDuration, 1);
        case ('noTransfers'):
          return filterFlightsByTransfers(getFilteredDataByPriceAndDuration, 0);
        default:
          return getFilteredDataByPriceAndDuration
      }
    }
  }, [getFilteredDataByPriceAndDuration, initialValues.checkedFilter])

  //filter flights by price from or to or both
  //and final function
  const filteredData = useMemo(() => {
    if (getFilteredDataByTransfers) {
      let sortedArrByPrice = [];

      if (initialValues.priceFrom > 0) {
        sortedArrByPrice = [...getFilteredDataByTransfers.filter(itemToFilter => itemToFilter.flight.price.total.amount >= initialValues.priceFrom)]
      }
      if (initialValues.priceUpTo > 0) {
        sortedArrByPrice = [...getFilteredDataByTransfers.filter(itemToFilter => itemToFilter.flight.price.total.amount <= initialValues.priceUpTo)]
      }
      if (initialValues.priceFrom > 0 && initialValues.priceUpTo > 0) {
        sortedArrByPrice = [...getFilteredDataByTransfers.filter(itemToFilter => itemToFilter.flight.price.total.amount >= initialValues.priceFrom && itemToFilter.flight.price.total.amount <= initialValues.priceUpTo)]
      }
      if (!initialValues.priceFrom && !initialValues.priceUpTo)
        sortedArrByPrice = [...sortedArrByPrice, ...getFilteredDataByTransfers];

      return sortedArrByPrice
    }
  }, [getFilteredDataByTransfers, initialValues.priceFrom, initialValues.priceUpTo])


  return (
    <Layout className='mainApp' style={{ backgroundColor: '#FFF' }}>
      {!isInitialized && <Preloader />}

      <Row justify="space-between" gutter={16} className='mainRow'>
        <Sidebar initialValues={initialValues} handleChangeValues={setinitialValues} filteredData={filteredData} />
        <Main filteredData={filteredData} />
      </Row >

    </Layout>
  )
}

export default App;
