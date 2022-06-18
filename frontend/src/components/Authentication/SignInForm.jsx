import React from 'react'
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LockClosedIcon } from '@heroicons/react/outline'
import { AuthData } from './Auth'
import { loginWithCredentials } from '../../Network'
import { FormControlLabel, Box, Avatar, Checkbox, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const SignInForm = ({ openDialog: i = e => { return null} }) => {
    const auth = AuthData()
    const [identitefier, setIdentitefier] = React.useState("")
    const [password, setPassword] = React.useState("")
    const router = useRouter()
    const redirectUrl = router.query.redirect
    const closeRef = e => {
        if (i(false) !== undefined) router.push(redirectUrl ? decodeURI(redirectUrl):'/');
    }

    const handleSubmit = (e) => {
        console.log(e.target)
        e.preventDefault();
        loginWithCredentials(auth, identitefier, password)
        closeRef(e)
    }

    return (
        <Box
            sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <Link href='/'><a><LockClosedIcon height={20} width={20} /></a></Link>
            </Avatar>
            <Typography sx={{ fontWeight: "bold" }} component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={identitefier}
                    onChange={e => setIdentitefier(e.target.value)}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="/" variant="body2" >
                            <a className='font-medium text-indigo-600 hover:text-indigo-500'>Forgot password?</a>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href={{ pathname: '/signup', query: { redirect: encodeURI(window.location.href) } }} variant="body2" className='font-medium text-indigo-600 hover:text-indigo-500'>
                            <a className='font-medium text-indigo-600 hover:text-indigo-500'> Don't have an account? Sign Up</a>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default SignInForm