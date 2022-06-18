import * as React from 'react';
import {useRouter} from 'next/router'
import Button from '@mui/material/Button';
import { XIcon } from '@heroicons/react/outline'
import { IconButton,} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthData } from './Auth';
import SignInForm from './SignInForm';

export default function Login() {
    const [open, setOpen] = React.useState(false);
    const { authToken } = AuthData()
    const router = useRouter();

   React.useEffect(() => {
    if (open) {
      setOpen(!open);
    }
  }, [router.asPath]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    !authToken && <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Log In
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{//Sign In
        }
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <XIcon height={20} width={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <SignInForm openDialog={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
