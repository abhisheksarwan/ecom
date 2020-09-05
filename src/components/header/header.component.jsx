import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from '../../firebase/firebase.utils';
import {connect} from 'react-redux';

import "./header.scss";

const Header = ({currentUser}) => (
  <div className="header">
    <NavLink to="/" activeClassName="active">
      <Logo className="logo-container" />
    </NavLink>
    <div className="options">
      <NavLink className="option" to="/shop">
        SHOP
      </NavLink>
      <NavLink className="option" to="/shop">
        CONTACT
      </NavLink>
      {
        currentUser ? (
        <div className="option" onClick={()=> auth.signOut()}>
        SIGN OUT
        </div> ) :
        ( <NavLink to='/signin' className="option">
        SIGN IN
        </NavLink> )
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
