import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Contents from './Contents'
import EmployeeAgreementList from './EmployeeAgreementList';

const MainPage = () => {
    const [page, setPage] = useState(<EmployeeAgreementList/>);
    return (
    <div className='main'>
        <Sidebar  setPage={setPage}/>
        <Contents page={page}/>
    </div>
  )
}

export default MainPage