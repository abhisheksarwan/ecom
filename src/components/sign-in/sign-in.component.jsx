import React from "react";
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import  { signInWithGoogle } from '../../firebase/firebase.utils'
import "./sign-in.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      email: "",
      password: "",
    });
  }

  handleChange(e){
      this.setState({
          [e.target.name]: e.target.value
      });
  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with Email</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name="email" 
            type="email" 
            label="E-mail"
            value={this.state.email}
            handleChange={this.handleChange}
            required 
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
          <Button type="submit">Sign In</Button>
          <Button onClick={ signInWithGoogle } isGoogleSignIn={true}>Sign In With Google</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
