import { all } from 'redux-saga/effects'
import serialMiddleware from 'serial-middleware'
import SerialPort from 'serialport'
import _ from 'lodash'

// import config from './config.js'
import reducer from './reducer.js'
import rxSaga from './rx_saga.js'
import txSaga from './tx_saga.js'
import serialErrorHandlerSaga from './serial_error_handler_saga'
import rxParser from './rx_parser.js'

// export { config }
export { reducer }

export const saga = (config) => function*() {
  yield all([
    rxSaga,
    txSaga,
    serialErrorSaga,
  ])
}

export const middleware = (config) => {
  const { path } = config.driver.serialPort
  const serialOpts = _.without(config.driver.serialPort, ['path'])
  const serialPort = new SerialPort(path, serialOpts)
    .pipe(new SerialPort.parsers.Readline())
    .pipe(rxParser())

  return [
    serialMiddleware(serialPort),
  ]
}
