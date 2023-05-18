import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Err from "./components/Err";
import Home from "./components/Home";
import Idetails from './components/Idetails';
import User from './components/User';
import Sell from './components/Sell';
import Buy from './components/Buy';
import Login from './components/Login';
import Signup from './components/Signup';
import Cart from './components/Cart';
import Search from './components/Search';
import Account from './components/Account';

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
