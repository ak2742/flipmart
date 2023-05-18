import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from "./elements/Navbar";
import Err from "./elements/Err";
import Home from "./elements/Home";
import Idetails from './elements/Idetails';
import User from './elements/User';
import Sell from './elements/Sell';
import Buy from './elements/Buy';
import Login from './elements/Login';
import Signup from './elements/Signup';
import Cart from './elements/Cart';
import Search from './elements/Search';
import Account from './elements/Account';

function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/join">
          <Signup />
        </Route>
        <Route exact path="/buy">
          <Buy />
        </Route>
        <Route exact path="/sell">
          <Sell />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/products/:origin/:userID/:productID">
          <Idetails />
        </Route>
        <Route exact path="/my/account">
          <Account />
        </Route>
        <Route exact path="/users/:id">
          <User />
        </Route>
        <Route exact path="/my/cart">
          <Cart />
        </Route>
        <Route>
          <Err />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
