export const CREATE_JOB = 'tegh/jobQueue/CREATE_JOB'

const createJob = ({ job, jobFiles }) => ({
  type: CREATE_JOB,
  payload: {
    job,
    jobFiles,
  },
})

export default createJob
