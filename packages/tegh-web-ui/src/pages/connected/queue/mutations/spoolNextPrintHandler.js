import { List } from 'immutable'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const spoolJobFileGraphQL = gql`
  mutation spoolJobFile($input: SpoolJobFileInput!) {
    spoolJobFile(input: $input) {
      id
    }
  }
`

const spoolNextPrintHandler = graphql(spoolJobFileGraphQL, {
  props: ({ mutate, ownProps }) => {
    console.log(ownProps.jobs[0])
    if (ownProps.loading || ownProps.error) return {}

    const jobFiles = List(ownProps.jobs)
      .map(job => job.files)
      .flatten()

    const nextJobFile = jobFiles.find(jobFile => jobFile.hasPrintsQueued)

    return {
      nextJobFile,
      spoolNextPrint: () => {
        if (nextJobFile == null) {
          throw new Error('nothing in the queue to print')
        }
        mutate({
          variables: {
            input: {
              printerID: ownProps.printerID,
              jobFileID: nextJobFile.id,
            },
          },
        })
      },
    }
  },
})

export default spoolNextPrintHandler
