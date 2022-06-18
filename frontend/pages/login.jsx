import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SignInForm from '../src/components/Authentication/SignInForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Backdrop } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor:"#fff" }}
        open={true}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <SignInForm />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Backdrop>
    </ThemeProvider>
  );
}