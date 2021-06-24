import React from 'react'
import { Tab } from 'semantic-ui-react'
import ManageDaysOff from './ManageDaysOff'
import ViewDaysOff from './ViewDaysOff'
import Button from '../backToMenuButton/BackButton'

const panes = [
    {
      menuItem: 'Set Days Off',
      render: () => <Tab.Pane attached={false}>
        <ManageDaysOff/>
        </Tab.Pane>,
    },
    {
      menuItem: 'View Days Off',
      render: () => <Tab.Pane attached={false}>
        <ViewDaysOff/>
        </Tab.Pane>,
    }
  ]

  const TabExampleSecondary = () => (
    <React.Fragment>
    <Button/>
    <Tab menu={{ secondary: true }} panes={panes} />
    </React.Fragment>
  )

  export default TabExampleSecondary