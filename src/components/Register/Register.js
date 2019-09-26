import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";



const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Register = props => {
  const classes = useStyles();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [passWordValid, setPassWordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(false);

  const onEmailChange = e => {
    setRegisterEmail(e.target.value);
  };

  const onPassWordChange = e => {
    setRegisterPassword(e.target.value);
  };

  const onFirstNameChange = e => {
    setRegisterFirstName(e.target.value);
  };

  const onLastNameChange = e => {
    setRegisterLastName(e.target.value);
  };

  const onSubmit = () => {
    const firstName = registerFirstName.length > 0;
    const lastName = registerLastName.length > 0;
    const rePassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passWord = registerPassword.match(rePassword);
    const email = registerEmail.match(reEmail);
    setPassWordValid(passWord);
    setEmailValid(!email);
    if (firstName && lastName && passWord && email) {
      fetch('https://calm-earth-15616.herokuapp.com/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          firstname: registerFirstName,
          lastname: registerLastName,
          email: registerEmail,
          password: registerPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        if(user){
          props.loadUserProfile(user);
          props.logIn(true);
          props.history.push("/profile"); 
        }
      }) 
    }
  };

  const passwordFormat = () => {
    return (
      <div id="message">
        <h3>Password must contain the following:</h3>
        <p id="letter" className="invalid">
          A <b>lowercase</b> letter
        </p>
        <p id="capital" className="invalid">
          A <b>capital (uppercase)</b> letter
        </p>
        <p id="number" className="invalid">
          A <b>number</b>
        </p>
        <p id="length" className="invalid">
          Minimum <b>8 characters</b>
        </p>
      </div>
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={onFirstNameChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={onLastNameChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={onEmailChange}
                autoComplete="email"
                error={emailValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onPassWordChange}
                autoComplete="current-password"
                error={!passWordValid}
              />
            </Grid>
            <Grid item xs={12}>
              {passWordValid ? <div></div> : passwordFormat()}
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
};

export default Register;
