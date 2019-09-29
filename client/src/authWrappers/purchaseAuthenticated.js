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

export const PurchaseAuthenticated = (props) => (
  <Route {...props} render={(rest) => (
    props.accountType === 1
    ? <props.component {...rest} {...props} />
    :<div>You are not authorized to view this page</div>
  )}
  />
)

// export const PurchaseAuthenticated = ({ component: Component, accountType: AccountType, ...rest }) => (
//   AccountType !== null ? 
//     <Route {...rest} render={props =>
//       AccountType === 1
//         ? <Component {...props} />
//         // : <Redirect to='/' />
//         : <div>You are not authorized to view this page.</div>

//     }
//     />
//     : <div>Loading...</div>
// )


