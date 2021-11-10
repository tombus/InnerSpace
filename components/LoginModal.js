import {
  Backdrop,
  Modal,
  Fade,
  makeStyles
} from '@material-ui/core';
import LoginPrompt from './LoginPrompt';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 80
  },
});

export default function LoginModal({ open, onClose }) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={ open }
      onClose={ onClose }
      closeAfterTransition
      className={ classes.modal }
      BackdropComponent={ Backdrop }
      BackdropProps={ { timeout: 500 } }>
      <Fade in={ open }>
        <LoginPrompt onClose={ onClose } />
      </Fade>
    </Modal>
  );
}
