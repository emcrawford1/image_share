import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from "react-router-dom";



export const PhotoAuthenticated = (props) => (
  <Route {...props} render={(rest) => (
    props.accountType === 0
      ? <props.component {...rest} {...props} />
      // : <Redirect to='/' />
      :<div>You are not authorized to view this page{console.log("Account Type: " + JSON.stringify(props))}</div>

  )}
  />
)

export const PurchaseAuthenticated = ({ component: Component, accountType: AccountType, ...rest }) => (
  AccountType !== null ? 
    <Route {...rest} render={props =>
      AccountType === 1
        ? <Component {...props} />
        // : <Redirect to='/' />
        : <div>You are not authorized to view this page.</div>

    }
    />
    : <di>Loading..</di>
)

// export const PhotoAuthenticated = ({ component: Component, accountType: AccountType, ...rest }) => (
//   AccountType !== null ?
//     <Route {...rest} render={props =>
//       AccountType === 0
//         ? <Component {...props} />
//         // : <Redirect to='/' />
//         : <div>You are not authorized to view this page.</div>
//     }
//     />
//     : <di>Loading..</di>
// )
// export const PhotoAuthenticated = ({component: Component, ...props}) => (
//   // <div>{console.log(props)}</div>
//   <Route render={routeProps => (
//     props.accountType === 0
//       ? <Component {...routeProps} {...props} />
//       // : <Redirect to='/' />
//       :<div>You are not authorized to view this page.{console.log("The props are: " + props.accountType)}</div>
//   )}
//   />

// )


