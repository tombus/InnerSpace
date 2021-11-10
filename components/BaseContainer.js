import {
  AppBar,
  Button,
  Container,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  useState,
  useEffect
} from 'react';
import { useCookies } from 'react-cookie';
import { AccountCircle } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useAuth } from './hooks';
import LoginModal from './LoginModal';
import Link from 'next/link';


const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    minHeight: '90vh',
    alignItems: 'stretch',
    backgroundColor: '#f8f8f8',
    marginBottom: 24
  },
  title: {
    padding: 6,
    fontSize: 28,
    fontFamily: '"Pacifico", cursive',
    userSelect: 'none',
    color: 'white',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  spacer: {
    flexGrow: 1,
  },
  btnText: {
    ...theme.typography.button,
    padding: theme.spacing(1),
  },
}));

export default function BaseContainer(props) {
  const classes = useStyles();
  const router = useRouter();
  const user = useAuth();

  const [cookies, setCookie, deleteCookie] = useCookies();
  const [showModal, setShowModal] = useState(false);

  function closeModal() { setShowModal(false); };

  const handleLogin = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    router.push('/');
    deleteCookie('jwt');
  };
  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/');
    deleteCookie('jwt');
  }, []);

  return (
    <Container { ...props } maxWidth="lg">
      <LoginModal
        onClose={ () => closeModal() }
        open={ showModal } />
      <AppBar position="sticky">
        <Toolbar>
          <Link shallow href="/home">
            <a><Typography className={ classes.title } variant="h6">Innerspace</Typography></a>
          </Link>
          <div className={ classes.spacer } />
          { !user && router.asPath === '/home' && <>
            <Button color="inherit" onClick={ handleLogin } >Login</Button>
            <AccountCircle />
          </> }
          { user && <>
            <div className={ classes.btnText }>{ user.name }</div>
            <AccountCircle />
            <Button onClick={ handleLogout } color="inherit">Logout</Button>
          </> }
        </Toolbar>
      </AppBar>
      <Paper className={ classes.paper } square elevation={ 2 } >
        { props.children }
      </Paper>
    </Container>
  );
}
