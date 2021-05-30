import React from 'react'
import { Tab } from 'semantic-ui-react'
import Schedule from './Schdule'
import Weekly from './weekly/Weekly'
import moment from 'moment'
import './admin.css'

const now = new Date()
const today = moment(now).format('LL')
let nextDay = new Date(now)   
nextDay.setDate(nextDay.getDate() + 1)
const tomorrow = moment(nextDay).format('LL')

const panes = [
  {
    menuItem: 'TODAY',
    render: () => <Tab.Pane attached={false}>
      <Schedule givenDate={today}/>
      </Tab.Pane>,
  },
  {
    menuItem: 'TOMMOROW',
    render: () => <Tab.Pane attached={false}>
      <Schedule givenDate={tomorrow}/>
      </Tab.Pane>,
  },
  {
    menuItem: 'WEEKLY',
    render: () => <Tab.Pane attached={false}>
       <Weekly givenDate={today} />
      </Tab.Pane>,
  },
]

const TabExampleSecondary = () => (
  <Tab menu={{ secondary: true }} panes={panes} />
)

export default TabExampleSecondary