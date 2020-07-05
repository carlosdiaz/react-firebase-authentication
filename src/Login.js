import React, { useState, useCallback, useContext } from "react";
// import React, { useCallback, useContext } from "react";
import { withRouter, Redirect  } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

const Login = (history) => {
  // const {classes} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    const handleLogin = useCallback(
        async event => {
          event.preventDefault();
          const { email, password } = event.target.elements;
          try {
            await app
              .auth()
              .signInWithEmailAndPassword(email.value.trim(), password.value);
              history.push("/");
          } catch (error) {
            console.log(error);
          }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
      return <Redirect to="/" />;
    }
  
      return (
        <div className="container">
          <div  className="row">
            <div  className="col align-self-start">
            </div>
            <div  className="col align-self-center">
                 <div  className="row">
                  <form onSubmit={handleLogin} >
                      <TextField
                          id="email"
                          name="email"
                          label="Email"
                          value={email}
                          onInput={ e=>setEmail(e.target.value)}
                      />
                      <br /><br />
                      <TextField
                          id="password"
                          name="password"
                          label="Password"
                          value={password}
                          type="password"
                          onInput={ e=>setPassword(e.target.value)}
                      />
                      <br /><br />
                      <Button type="submit" variant="contained" size="medium">
                          Login
                      </Button>
                  </form>
                
              </div>
            </div>
            <div  className="col align-self-end">
            </div>
          </div>
        </div>
                
  );

};

  // Login.propTypes = {
  //     classes: PropTypes.object.isRequired,
  // };

export default withRouter(Login);
