import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Welcome from '../components/Welcome/Welcome'
import What from '../components/ChooseType/ChooseType'
import When from '../components/ChooseDate/ChooseDate'
import Confirm from '../components/ConfirmSlot/ConfirmSlot'
import Pagination from '../components/Paginagion/Pagination'
import Admin from '../components/Admin/Admin'
import Dashboard from '../components/Admin/dashboard/Dashboard'
import DayOffDash from '../components/Admin/manageDaysOff/DayOffDash'
import CustomDate from '../components//Admin/customDate/CustomDate'


export default function Routes() {
    return (
        <React.Fragment>
            <BrowserRouter>
            <React.Fragment>
                <Route path='/user' component={Pagination} />
                <Route path="/" exact component={Welcome} />
                <Route path="/user/what/:page" exact component={What} />
                <Route path="/user/when/:page" exact component={When} />
                <Route path="/user/confirm/:page" exact component={Confirm} />
                <Route path="/admin/week" exact component={Admin} />
                <Route path="/admin/dashboard" exact component={Dashboard} />
                <Route path="/admin/mangedaysoff" exact component={DayOffDash} />
                <Route path="/admin/customdate" exact component={CustomDate} />
            </React.Fragment>
            </BrowserRouter>
        </React.Fragment>
    )
}
