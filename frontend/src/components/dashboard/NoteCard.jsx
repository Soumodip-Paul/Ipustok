import React from 'react'
import { AuthData } from "../Authentication/Auth";
import { deleteNote } from "../../Network"
import { Card, CardContent, Typography, ButtonGroup, Grid, IconButton } from "@mui/material";
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

const NoteCard = ({notes, setNotes, setNote}) => {
    const auth = AuthData()
    const deleteEntry = async id => {
        const {data} = await deleteNote(auth, id)
        if(Object.entries(data).length === 0 && data.constructor === Object) return
        const newNotes = notes.filter(e => e.id !== id)
        setNotes(newNotes)
    }
    return (
        notes.length !== 0 ? <Grid container>
            {notes.map((note, index) => (
                <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    sx={{
                        display: "flex",
                        alignItems: "stretch",
                    }}
                >
                    <Card
                        sx={{
                            p: 0,
                            width: "100%",
                        }}
                    >
                        <CardContent
                            sx={{
                                paddingLeft: "30px",
                                paddingRight: "30px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "h3.fontSize",
                                }}
                                className="font-extrabold"
                            >
                                {note.attributes.Title}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    mt: 1,
                                }}
                            >
                                {note.attributes.Description}
                            </Typography>
                            <ButtonGroup size="small" aria-label="small button group" className='pt-4 w-full flex items-center justify-end'>
                                <IconButton aria-label='edit' onClick={e =>  {setNote({...note});}} >
                                    <PencilIcon height={20} width={20} />
                                </IconButton>
                                <IconButton aria-label='delete' onClick={async e => await deleteEntry(note.id)}>
                                    <TrashIcon height={20} width={20} />
                                </IconButton>
                            </ButtonGroup>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid> :
        <Typography component={'h1'} variant={'h3'} className={'opacity-80 text-gray-400 px-10'}>No Notes Available...</Typography>
    )
}

export default NoteCard