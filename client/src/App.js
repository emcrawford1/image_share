import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PurchaserLandingPage from "./pages/PurchaserLandingPage";
import PCategoryView from "./pages/PCategoryView";
import PSpecificPictureView from "./pages/PSpecificPictureView";
import Login from "./pages/Login";
// import './App.css';

function App() {
  return (
   <Router>
     <div>
       <Switch>
         <Route exact path="/" component={PurchaserLandingPage} />
         <Route exact path="/pcategoryview/:category" component={PCategoryView} />
         <Route exact path="/pspecificpictureview/:id" component={PSpecificPictureView} />
         <Route exact path="/purchaserlandingpage" component={PurchaserLandingPage} />
       </Switch>
     </div>
   </Router>
  );
}

export default App;

