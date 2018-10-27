import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withStyles,
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  FormControlLabel,
  TextField,
  MenuItem,
  Switch,
} from '@material-ui/core'
import gql from 'graphql-tag'

import withLiveData from '../../shared/higherOrderComponents/withLiveData'

const CONFIG_SUBSCRIPTION = gql`
  subscription ConfigSubscription($printerID: ID!) {
    live {
      patch { op, path, from, value }
      query {
        printers {
          id
        }
      }
    }
  }
`

const styles = theme => ({
  title: {
    paddingTop: theme.spacing.unit * 3,
  },
  fieldsGrid: {
    padding: theme.spacing.unit * 2,
  },
})

const enhance = compose(
  withStyles(styles, { withTheme: true }),
  withProps(ownProps => ({
    subscription: CONFIG_SUBSCRIPTION,
    variables: {
      printerID: ownProps.match.params.printerID,
    },
  })),
  withLiveData,
  withProps(({ singularPrinter }) => ({
    printer: singularPrinter[0],
  })),
)

const ControllerConfigPage = ({ classes, config }) => (
  <main>
    <Grid container className={classes.fieldsGrid}>
      <Grid item xs={12}>
        <TextField
          required
          label="Name"
          margin="normal"
          fullWidth
        />
        <TextField
          required
          select
          label="Serial Port"
          margin="normal"
          fullWidth
        >
          {['Arduino_1', 'Arduino_2'].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          select
          label="Baud Rate"
          margin="normal"
          fullWidth
        >
          {['Arduino_1', 'Arduino_2'].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>

    <List>
      <ListItem>
        <FormControlLabel
          label="Simulate Attached Controller"
          control={
            <Switch />
          }
        />
      </ListItem>
    </List>

  </main>
)

export const Component = withStyles(styles, { withTheme: true })(
  ControllerConfigPage,
)
export default enhance(ControllerConfigPage)