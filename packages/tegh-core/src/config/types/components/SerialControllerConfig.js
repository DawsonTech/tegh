import { Record, Map } from 'immutable'
import uuid from 'uuid/v4'

import { CONTROLLER } from './ComponentTypeEnum'

export const SerialControllerConfigFactory = Record({
  id: null,
  type: CONTROLLER,
  interface: 'SERIAL',
  name: null,
  serialPortID: null,
  baudRate: null,
  simulate: false,
  extendedConfig: Map(),
})

const SerialControllerConfig = ({
  id = uuid(),
  ...props
} = {}) => {
  if (props.interface != null && props.interface !== 'SERIAL') {
    throw new Error(`Unsupported controller interface: ${props.interface}`)
  }
  return SerialControllerConfigFactory({
    ...props,
    id,
    extendedConfig: Map(props.extendedConfig),
  })
}

export default SerialControllerConfig
