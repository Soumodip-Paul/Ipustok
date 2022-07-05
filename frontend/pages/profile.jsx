import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LockClosedIcon } from '@heroicons/react/outline'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Backdrop, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthData } from '../src/components/Authentication/Auth';
import { useRouter } from 'next/router';
import { updateProfile } from '../src/Network';

const theme = createTheme();

export default function Profile() {
    const auth = AuthData()
    const { user } = auth
    const router = useRouter()
    const [open, setOpen] = React.useState(true)
    const [name, setName] = React.useState(user && user.Name)
    const [username, setUserame] = React.useState(user && user.username)
    const [email, setEmail] = React.useState(user && user.email)
    const [change, setChanged] = React.useState(false)

    React.useEffect(e => {
        if (user === null) {
            setOpen(true)
            router.push('/')
        }
        else setOpen(false)
        setChanged(user !== null && (user.Name !== name || user.email !== email || user.username !== username));
    }, [name, email, username, user])
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateProfile(auth, user, { "Name": name, "username":username, "email": email })
        router.push('/')
    };

    return (
        user ?
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm" >
                    <CssBaseline />
                    <Box
                        sx={{
                            
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', height: 200, width: 200 }}>
                            <LockClosedIcon height={150} width={150} />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Your Profile
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        name="Name"
                                        label="Name"
                                        type="text"
                                        id="Name"
                                        autoComplete="new-password"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="username"
                                        name="username"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        value={username}
                                        onChange={e => setUserame(e.target.value)}
                                        autoFocus
                                        variant="standard"
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid> */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!change}
                            >
                                Update Profile
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                <Link href={{ pathname: '/forgot-password', query: { redirect: encodeURI(window.location.href) } }} variant="body2" className='font-medium text-indigo-600 hover:text-indigo-500'>
                            <a className='font-medium text-indigo-600 hover:text-indigo-500'> Change Password</a>
                        </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider> :
            <Backdrop
                sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#fff' }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
    );
}