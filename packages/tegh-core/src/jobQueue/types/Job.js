// @flow
import uuid from 'uuid'
import { Record } from 'immutable'

import type { RecordOf } from 'immutable'

export type JobT = RecordOf<{
  id: string,
  name: string,
  createdAt: ?number,
  quantity: number,
}>

const JobRecord = Record({
  id: null,
  name: null,
  createdAt: null,
  quantity: 1,
})

const Job = attrs => JobRecord({
  id: uuid.v4(),
  createdAt: new Date().toISOString(),
  ...attrs,
})

export const MockJob = attrs => Job({
  name: 'test.ngc',
  ...attrs,
})


export default Job
