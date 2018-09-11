import { compose, withContext } from 'recompose'
import {
  Grid,
  Typography,
} from 'material-ui'
import Loader from 'react-loader-advanced'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import LiveSubscription from '../components/LiveSubscription'
import PrinterStatusGraphQL from '../components/PrinterStatus.graphql.js'

import App from '../components/App'
import Header from '../components/Header'
import Log from '../components/Log'
import Home from '../components/home/Home'
import XYJogButtons from '../components/jog/XYJogButtons'
import ZJogButtons from '../components/jog/ZJogButtons'
import HeaterControl from '../components/heaters/HeaterControl'

const enhance = compose(
  withContext(
    {
      printerID: PropTypes.string,
    },
    () => ({ printerID: 'test_printer_id'}),
  ),
)

const MANUAL_CONTROL_SUBSCRIPTION = gql`
  subscription($printerID: ID!) {
    live {
      patch { op, path, from, value }
      query {
        printer(id: $printerID) {
          ...PrinterStatus
        }
      }
    }
  }

  # fragments
  ${PrinterStatusGraphQL}
`

const ManualControl = props => (
  <App>
    <LiveSubscription
      variables={{
        printerID: 'test_printer_id'
      }}
      subscription={ MANUAL_CONTROL_SUBSCRIPTION }
    >
      {
        ({data, loading, error}) => {
          if (loading) return <div/>
          if (error) return <div>{ JSON.stringify(error) }</div>
          const { jobs, printer } = data
          const { status } = printer
          const isReady = status === 'READY'
          return (
            <div>
              <Header printer={printer}/>
              <main>
                <Grid
                  container
                  spacing={24}
                >
                  <Loader
                    show={!isReady}
                    message={
                      <Typography variant="display1" style={{color: '#fff'}}>
                        manual controls disabled while {status.toLowerCase()}
                      </Typography>
                    }
                    style={{
                      flex: 1,
                      margin: 12,
                    }}
                    backgroundStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }}
                    contentStyle={{
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Grid item xs={12}>
                      <Home />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <XYJogButtons form='xyJog' />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <ZJogButtons form='zJog' />
                    </Grid>
                  </Loader>
                  <Grid item xs={12}>
                    <HeaterControl
                      id='e0'
                      isExtruder={true}
                      name='Extruder 1'
                      disabled={!isReady}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <HeaterControl
                      id='b'
                      isExtruder={false}
                      name='Bed'
                      disabled={!isReady}
                    />
                  </Grid>
                </Grid>
              </main>
            </div>
          )
        }
      }
    </LiveSubscription>
  </App>
)

export default enhance(ManualControl)