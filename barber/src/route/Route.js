import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Welcome from '../components/Welcome/Welcome'
import What from '../components/ChooseType/ChooseType'
import When from '../components/ChooseDate/ChooseDate'
import Confirm from '../components/ConfirmSlot/ConfirmSlot'
import Pagination from '../components/Paginagion/Pagination'
import Admin from '../components/Admin/Admin'


export default function Routes() {
    return (
        <React.Fragment>
            <BrowserRouter>
            <React.Fragment>
                <Route path='/' component={Pagination} />
                <Route path="/" exact component={Welcome} />
                <Route path="/what" exact component={What} />
                <Route path="/when" exact component={When} />
                <Route path="/confirm" exact component={Confirm} />
                <Route path="/admin" exact component={Admin} />
            </React.Fragment>
            </BrowserRouter>
        </React.Fragment>
    )
}
