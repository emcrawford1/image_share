import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PurchaserLandingPage from "./pages/PurchaserLandingPage";
import Login from "./pages/Login";
// import './App.css';

function App() {
  return (
   <Router>
     <div>
       <Switch>
         <Route exact path="/" component={PurchaserLandingPage} />
         <Route exact path="/purchaserlandingpage" component={PurchaserLandingPage} />
       </Switch>
     </div>
   </Router>
  );
}

export default App;

