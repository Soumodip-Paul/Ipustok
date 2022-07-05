import React from 'react'
import { Box, Button, Grid, DialogTitle, Dialog, DialogContent, IconButton, TextField, Link as MuiLink } from "@mui/material";
import { XIcon } from '@heroicons/react/outline'
import { updateNote } from '../../Network';
import { AuthData } from '../Authentication/Auth';


const EditNote = ({ note, setNote, notes, setNotes, isOpen }) => {

    const [tag, setTag] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [desc, setDesc] = React.useState("")
    const auth = AuthData()

    const updateNotes = (data) => {
        if (Object.entries(data).length === 0 && data.constructor === Object) return
        const index = notes.findIndex(e => e.id === data.id)
        const newNotes = [...notes]
        newNotes[index] = data
        setNotes(newNotes)
    }

    const handleClose = () => {
        setNote(null)
    };

    const clearAll = () => {
        setTag("")
        setTitle("")
        setDesc("")
        handleClose()
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const { data } = await updateNote(auth, note.id, { Tag: tag, Title: title, Description: desc });
        updateNotes(data)
        clearAll()
    }
    React.useEffect(() => {
        if (note === null) return
        setTag(note.attributes.Tag)
        setTitle(note.attributes.Title)
        setDesc(note.attributes.Description)
    }, [note])
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" component={'h2'} variant={'h2'} >
                    {"Update Your Note"}
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
                                Update
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )

}

export default EditNote