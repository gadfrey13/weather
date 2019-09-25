import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";


import './Signin.css';
import { resetWeather } from '../../actions/actions';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: 'white'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  credentials: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'green'
  }
}));


const SignIn = (props) => {

  //state of the email
  const [signInEmail,setSignInEmail] = useState('');
  const [signInPassword,setSignInPassword] = useState('');
  const [wrongCredential, setWrongCredential] = useState(false);

  const onEmailChange = (e) => {
    setSignInEmail(e.target.value);
  }

  const onPassWordChange = (e) => {
    setSignInPassword(e.target.value);
  }

  const onSubmitSignIn = () => { 
    fetch('http://localhost:2500/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        if(user !== "wrong credentials"){
          props.loadUserProfile(user);
          props.logIn(true);
          // props.resetWeatherIn();
          // props.resetWeatherForeCastIn();
          setWrongCredential(false);
          props.history.push("/profile"); 
        }else{
          setWrongCredential(true);
        }
      })
      .catch(err => console.log(err)); 
  }
  
  const classes = useStyles();



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onEmailChange}
            autoFocus
           
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onPassWordChange}
            autoComplete="current-password"
          />
          {wrongCredential ? <div className={classes.credentials}>Wrong Credentials</div> : <div></div> }
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmitSignIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );

}

export default SignIn;