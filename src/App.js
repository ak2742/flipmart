import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uAC } from './states/index'
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

  const dispatch = useDispatch()
  const { myAcc } = bindActionCreators(uAC, dispatch)

  const [me, setMe] = useState({ _id: "" })
  const [token, setToken] = useState(localStorage.getItem("MBtoken0"))

  useSelector(state => state.me).then(arr => { setMe(arr) })
  useSelector(state => state.token).then(arr => { setToken(arr) })

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("MBtoken0", token)
      myAcc()
    } else {
      localStorage.removeItem("MBtoken0")
    }
    // eslint-disable-next-line 
  }, [token])


  return (
    <Router>
      <Navbar key={me} me={me} token={token} />
      <Switch>
        <Route exact path="/">
          <Home key={me} me={me} token={token} />
        </Route>
        <Route exact path="/login">
          <Login key={me} me={me} token={token} />
        </Route>
        <Route exact path="/join">
          <Signup key={me} me={me} token={token} />
        </Route>
        <Route exact path="/buy">
          <Buy key={me} me={me} token={token} />
        </Route>
        <Route exact path="/sell">
          <Sell key={me} me={me} token={token} />
        </Route>
        <Route exact path="/search">
          <Search key={me} me={me} token={token} />
        </Route>
        <Route exact path="/my/cart">
          <Cart key={me} me={me} token={token} />
        </Route>
        <Route exact path="/my/account">
          <Account key={me} me={me} token={token} />
        </Route>
        <Route exact path="/:userID">
          <User key={me} me={me} token={token} />
        </Route>
        <Route exact path="/:userID/:productID">
          <Idetails key={me} me={me} token={token} />
        </Route>
        <Route>
          <Err />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
