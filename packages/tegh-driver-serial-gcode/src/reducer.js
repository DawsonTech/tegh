import txParser from './tx_parser.js'

const initializeCollection = (arrayOfIDs, initialValueFn) => {
  return arrayOfIDs.reduce(
    (collection, id) => {
      collection[id] = initialValueFn(id)
      return collection
    },
    {}
  )
}

const initialState = (config) => ({
  targetTemperaturesCountdown: null,
  heaters: initializeCollection(config.heaters, (id) => ({
    id,
    currentTemperature: 0,
    targetTemperature: 0,
    blocking: false,
  })),
  fans: initializeCollection(config.fans, (id) => ({
    id,
    enabled: false,
    speed: 0,
  })),
  ready: false,
  error: null,
  currentLineNumber: 0,
})

const serialGCodeReducer = (config) => (
  state = initialState(config),
  action
) => {
  switch(action.type) {
    case 'SERIAL_RECEIVE':
      console.log(`rx: ${action.data.raw}`, action.data.type)
      if (action.data.temperatures != null) {
        const heaters = {...heaters}
        action.data.temperatures.forEach((k, v) => {
          heaters[k] = {...heaters[k], currentTemperature: v}
        })
        const {targetTemperaturesCountdown} = action.data
        return {
          ...state,
          targetTemperaturesCountdown,
          heaters,
        }
      }
      if (action.data.isError) {
        return {
          ...state,
          ready: false,
          error: action.data,
        }
      }
      return state
    case 'SERIAL_SEND':
      const parsedData = txParser(action)
      const {lineNumber, type, id, changes} = parsedData
      const nextState = {
        ...state,
        currentLineNumber: lineNumber + 1,
      }
      if (type == null) return nextState
      const collectionKey = {
        'HEATER_CONTROL': 'heaters',
        'FAN_CONTROL': 'fans',
      }[type]
      if (collectionKey == null) throw new Error(`Invalid type: ${type}`)
      // update the heater or fan's state.
      return {
        ...nextState,
        [collectionKey]: {
          ...state[collectionKey],
          [id]: {
            ...state[collectionKey][id],
            ...changes,
          },
        },
      }
    case 'PRINTER_READY':
      return {
        ...state,
        ready: true,
        currentLineNumber: 0,
      }
    default:
      return state
  }
}

export default serialGCodeReducer
