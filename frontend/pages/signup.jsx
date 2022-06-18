import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUpForm from '../src/components/Authentication/SignUpForm';
import Link from 'next/link';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <MuiLink color="inherit">
                <Link  href={'/'}>Your Website</Link>
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {

    return (
        <ThemeProvider theme={theme}>
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#fff" }}
                open={true}
            >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <SignUpForm />
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </Backdrop>
        </ThemeProvider>
    );
}