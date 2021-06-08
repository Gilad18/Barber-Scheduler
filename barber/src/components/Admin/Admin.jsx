import React, { useEffect, useState } from 'react'
import { Tab } from 'semantic-ui-react'
import Schedule from './Schdule'
import Weekly from './weekly/Weekly'
import moment from 'moment'
import Button from './backToMenuButton/BackButton'
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
    menuItem: 'Next 7 Days',
    render: () => <Tab.Pane attached={false}>
       <Weekly/>
      </Tab.Pane>,
  },
]

const TabExampleSecondary = () => (
  <React.Fragment>
  <Button/>
  <Tab menu={{ secondary: true }} panes={panes} />
  </React.Fragment>
)

export default TabExampleSecondary