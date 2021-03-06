/* config */
export setConfig, { SET_CONFIG } from './config/actions/setConfig'
export initializeConfig from './config/actions/initializeConfig'
/* devices */
export deviceConnected, { DEVICE_CONNECTED } from './devices/actions/deviceConnected'
export deviceDisconnected, { DEVICE_DISCONNECTED } from './devices/actions/deviceDisconnected'
/* printer */
export driverError, { DRIVER_ERROR } from './printer/actions/driverError'
export estop, { ESTOP } from './printer/actions/estop'
export printerReady, { PRINTER_READY } from './printer/actions/printerReady'
export connectPrinter, { CONNECT_PRINTER } from './printer/actions/connectPrinter'
export printerDisconnected, { PRINTER_DISCONNECTED } from './printer/actions/printerDisconnected'
/* jobQueue */
export createJob, { CREATE_JOB } from './jobQueue/actions/createJob'
// export createLocalFileJob from './jobQueue/actions/createLocalFileJob'
export deleteJob, { DELETE_JOB } from './jobQueue/actions/deleteJob'
/* spool */
export requestDespool, { REQUEST_DESPOOL } from './spool/actions/requestDespool'
export despoolTask, { DESPOOL_TASK } from './spool/actions/despoolTask'
export spoolCommands from './spool/actions/spoolCommands'
export spoolJobFile from './spool/actions/spoolJobFile'
export spoolMacro from './spool/actions/spoolMacro'
export spoolTask, { SPOOL_TASK } from './spool/actions/spoolTask'
