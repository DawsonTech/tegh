import { CssBaseline } from 'material-ui'
import { Provider as ReduxProvider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { withStyles } from 'material-ui'

import Routes from './Routes'

import createTeghReduxStore from './createTeghReduxStore'

// import createTeghApolloClient from '.createTeghApolloClient'

// import Drawer from '../components/Drawer'
// const client = createTeghApolloClient()
// <ApolloProvider client={ client }>

// <div>
//   <div className={ classes.appFrame }>
//     <Drawer />
//     <div className={ classes.flex }>
//       { children }
//     </div>
//   </div>
// </div>

// const styles = theme => ({
//   appFrame: {
//     position: 'relative',
//     display: 'flex',
//     width: '100%',
//     height: '100%',
//     minHeight: '100vh',
//   },
//   flex: {
//     flex: 1,
//   },
// })

const store = createTeghReduxStore()

const Index = ({ children, classes }) => (
  <CssBaseline>
    <ReduxProvider store={ store }>
      <Routes />
    </ReduxProvider>
  </CssBaseline>
)

const wrapper = document.getElementById("tegh-app")
ReactDOM.render(<Index/>, wrapper)
