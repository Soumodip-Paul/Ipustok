import React from 'react'
import { PlusIcon, XIcon } from "@heroicons/react/solid"
import { addNote } from '../../Network';
import { AuthData } from '../Authentication/Auth';
import { Box, Button, Grid, DialogTitle, Dialog, DialogContent, Fab, TextField, IconButton } from "@mui/material";

const AddIcon = ({ notes, setNotes }) => {
    const [open, setOpen] = React.useState(false);
    const [tag, setTag] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [desc, setDesc] = React.useState("")
    const auth = AuthData()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clearAll = () => {
        setTag("")
        setTitle("")
        setDesc("")
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const {data} = await addNote(auth, {Tag: tag,Title:title,Description:desc});
        setNotes([data, ...notes])
        setOpen(false)
        clearAll()
    }
    return (
        <div>
            <Fab color="primary" aria-label="edit" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleClickOpen}>
                <PlusIcon height={20} width={20} />
            </Fab>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" component={'h2'} variant={'h2'} >
                    {"Add A New Note"}
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
                    <Box
                        sx={{
                            marginTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="Tag"
                                        required
                                        fullWidth
                                        id="Tag"
                                        label="Tag"
                                        autoFocus
                                        value={tag}
                                        onChange={e => setTag(e.target.value)}
                                        inputProps={{
                                            maxLength: 10,
                                            minLength: 3
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="Title"
                                        label="Title"
                                        name="Title"
                                        autoComplete="family-name"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        inputProps={{
                                            maxLength: 30,
                                            minLength: 5
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={desc}
                                        onChange={e => setDesc(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add Note
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    {/* <MuiLink href="#" variant="body2">
                                        <Link href={{ pathname: '/login', query: { redirect: router.query.redirect } }}>Already have an account? Sign in</Link>
                                    </MuiLink> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose} className='uppercase'>Disagree</Button>
                    <Button onClick={handleClose} className='uppercase' autoFocus>Agree</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default AddIcon