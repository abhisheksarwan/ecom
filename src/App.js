import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/header.component";
import SignInandsignUp from "./pages/signInandsignUp/signInsignUp.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';

import "./App.css";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){

        const userRef = createUserProfileDocument(userAuth);

        (await userRef).onSnapshot(snapShot=>{
          
              setCurrentUser({id: snapShot.id,
              ...snapShot.data()
        });
      });
    }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route exact path="/signin" render={() => this.props.currentUser 
            ? (<Redirect to='/' />) 
            : (<SignInandsignUp />)}
            />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps =  state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
