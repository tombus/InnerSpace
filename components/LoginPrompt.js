import {
  Button,
  Card,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Tab,
  Tabs,
  TextField,
  makeStyles
} from '@material-ui/core';
import {
  useState,
  useRef,
  useEffect
} from 'react';
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import ReCAPTCHA from 'react-google-recaptcha';

const useStyles = makeStyles({
  loginBox: {
    minWidth: 500,
    height: 'max-content'
  },
  formContent: {
    marginTop: 16,
    marginBottom: 16,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    '& .MuiFormControl-root': {
      margin: 8,
    }
  },
  button: {
    margin: 8,
    width: '33%',
    minHeight: '2.5rem'
  },
  buttonRight: {
    textAlign: 'center',
    paddingTop: 20,
    padding: 10
  },
  buttonLeft: {
    textAlign: 'left',
    marginTop: -20,
    paddingLeft: 10,
    fontSize: 15
  },
  progress: {
    position: 'absolute',
    width: '80%'
  }
});

const GOOGLE_RECAPTCHA_SITE_KEY = '6LeW2psaAAAAAIrP4hzE0yDrAcs2I_djLcl61I4h';

export default function LoginPrompt(props) {
  const classes = useStyles();
  const router = useRouter();
  const btnSubmit = useRef();
  const recaptchaRef = useRef();
  const inputUsername = useRef(null);
  const inputPassword = useRef(null);

  const [errorMsg, setErrorMsg] = useState('');
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [cookies, setCookie, deleteCookie] = useCookies();
  const [tab, setTab] = useState(props.initialTab || 'student');
  const { onClose } = props;

  /* Log the user out when they view this page! */
  useEffect(() => { deleteCookie('jwt'); }, []);

  /* Focus input fields whenever tab changes */
  useEffect(() => {
    if (tab === 'student')
      inputUsername.current.focus();
    if (tab === 'teacher')
      inputUsername.current.focus();
  }, [tab]);

  function handleTabChange(evt, value) { setTab(value); };

  async function handleSubmitForm(evt) {
    evt.preventDefault();
    btnSubmit.current.focus();
    setLoading(true);
    try {
      if (tab === 'student')
        await handleLogin(inputUsername.current.value, inputPassword.current.value, '/programs');
      if (tab === 'teacher')
        await handleLogin(inputUsername.current.value, inputPassword.current.value, '/classroom');
    } catch (err) {
      setHasError(true);
      setErrorMsg(err.errorMsg);
    }
    setLoading(false);
  };

  async function handleLogin(id, pass, redirect) {
    try {
      const res = await fetch('/api/auth/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ id, pass })
      });
      if (res.ok) {
        const { token } = await res.json();
        setCookie('jwt', token, { sameSite: 'lax' });
        router.push(redirect, undefined, { shallow: true });
        onClose();
      } else {
        setErrorMsg('Invalid credential');
        setHasError(true);
      }
    } catch (err) {
      setErrorMsg('Internal server error');
      setHasError(true);
    }
  };

  async function handleCaptchaChange(token) {
    if (!token)
      return;
    try {
      const response = await fetch('/api/auth/captcha', {
        method: 'POST',
        body: JSON.stringify({ captcha: token }),
        headers: { 'Content-Type': 'application/json', },
      });
      if (!response.ok) {
        setErrorMsg('Invalid captcha');
        setHasError(true);
      }
      setValid(true);
    } catch (error) {
      setErrorMsg('Internal server error: ' + error.errorMsg);
      setHasError(true);
    } finally {
      //recaptchaRef.current.reset();
    }
  };

  return (
    <Card { ...props } elevation={ 5 } className={ classes.loginBox } >
      <Tabs centered
        value={ tab }
        onChange={ handleTabChange }
        indicatorColor="primary"
        textColor="primary">
        <Tab label="Student" value="student" />
        <Tab label="Teacher" value="teacher" />
      </Tabs>
      <Fade in={ true }>
        <form disabled={ true }
          onSubmit={ handleSubmitForm }
          className={ classes.formContent }>
          <TextField required
            label="Username"
            autoComplete="username"
            inputRef={ inputUsername }
            disabled={ loading && !inputUsername.current.value }
            autoFocus />
          <ShowablePassword required
            label="Password"
            id="current-password-field"
            inputRef={ inputPassword }
            disabled={ loading && !inputPassword.current.value }
            autoComplete="current-password" />
          <div className={ classes.buttonLeft }>
            { hasError ? <p style={ { color: "red" } }><b>{ `${errorMsg}` }</b></p> : null }
          </div>
          <div className={ classes.buttonRight }>
            <ReCAPTCHA
              ref={ recaptchaRef }
              sitekey={ GOOGLE_RECAPTCHA_SITE_KEY }
              onChange={ handleCaptchaChange }
              style={ { display: "inline-block" } }
            />
            <Button ref={ btnSubmit }
              className={ classes.button }
              variant="contained"
              color="primary"
              type="submit"
              disabled={ !valid }
              disableElevation>
              { loading ? '' : tab === 'student' ? 'Login' : 'Login' }
              { loading && <LinearProgress className={ classes.progress } /> }
            </Button>
          </div>
        </form>
      </Fade>
    </Card>
  );
};

function ShowablePassword(props) {
  const [showPassword, setShowPassword] = useState(false);
  function handleClick() { setShowPassword(!showPassword); }
  const adornment = (
    <InputAdornment position="end">
      <IconButton
        disabled={ props.disabled }
        onClick={ handleClick }>
        { showPassword ? <Visibility /> : <VisibilityOff /> }
      </IconButton>
    </InputAdornment>
  );
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={ props.id }>{ props.label }</InputLabel>
      <OutlinedInput
        { ...props }
        type={ showPassword ? 'text' : 'password' }
        endAdornment={ adornment } />
    </FormControl>
  );
};
