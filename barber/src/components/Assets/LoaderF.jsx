import React from 'react'
import { Dimmer, Loader} from 'semantic-ui-react'
import './assets.css'

export default function LoaderF() {
    return (
        <div className="loaderWeekely">
          <Dimmer active>
            <Loader size='huge' indeterminate>Loading, Please wait</Loader>
          </Dimmer>
        </div>
    )
}
