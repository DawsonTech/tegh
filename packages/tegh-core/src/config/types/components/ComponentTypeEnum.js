import { List } from 'immutable'

export const CONTROLLER = 'CONTROLLER'
export const AXIS = 'AXIS'
export const TOOLHEAD = 'TOOLHEAD'
export const BUILD_PLATFORM = 'BUILD_PLATFORM'
export const FAN = 'FAN'

const ComponentTypeEnum = List([
  CONTROLLER,
  AXIS,
  TOOLHEAD,
  BUILD_PLATFORM,
  FAN,
])

export default ComponentTypeEnum
