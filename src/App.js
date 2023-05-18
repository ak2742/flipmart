import { useEffect, useRef } from 'react'
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
import Verify from './elements/Verify';

function App() {
  
  const mounted = useRef(false)
  const dispatch = useDispatch()
  const { myAcc } = bindActionCreators(uAC, dispatch)
  
  const me = useSelector(state => state.me)
  const token = useSelector(state => state.token)

  useEffect(() => {
    mounted.current = true
    if (token !== null) {
      localStorage.setItem("auth", token)
      if (me._id === undefined) {
        myAcc()
      }
    } else {
      localStorage.removeItem("auth")
    }
    return () => {
      mounted.current = false
    };
    // eslint-disable-next-line 
  }, [token])

  return (
    <Router>
      <Navbar me={me} token={token} />
      <div className="container my-3">
        <Switch>
          <Route exact path="/">
            <Home me={me} token={token} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/join">
            <Signup />
          </Route>
          <Route exact path="/buy">
            <Buy me={me} />
          </Route>
          <Route exact path="/sell">
            <Sell me={me} />
          </Route>
          <Route exact path="/search">
            <Search me={me} />
          </Route>
          <Route exact path="/my/cart">
            <Cart me={me} />
          </Route>
          <Route exact path="/my/account">
            <Account me={me} />
          </Route>
          <Route exact path="/verify">
            <Verify />
          </Route>
          <Route exact path="/:userID">
            <User me={me} />
          </Route>
          <Route exact path="/:userID/:productID">
            <Idetails me={me} />
          </Route>
          <Route>
            <Err />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
