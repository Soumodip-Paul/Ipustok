import * as React from 'react'
import { Grid } from "@mui/material";
import { AuthData } from "../src/components/Authentication/Auth";
import Home from "../src/components/dashboard/Home"
import NoteCard from "../src/components/dashboard/NoteCard";
import AddIcon from "../src/components/items/AddIcon";
import { fetchMyNotes } from '../src/Network';
import EditNote from '../src/components/items/EditNote';

export default function Index() {
    const auth = AuthData()
    const [note, setNote] = React.useState(null)
    const [notes, setNotes] = React.useState([])
    React.useEffect(() => {
        const i = async () => {
            if (auth.authToken === null) return
            const data = await fetchMyNotes(auth)
            setNotes(data.data)
        }
        i()
    }, [])
    return (
        auth.authToken ?
            <>
                <Grid container spacing={0} className={'no-scroll'}>
                    <Grid item xs={12} lg={4}>

                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <NoteCard notes={notes} setNote={setNote} setNotes={setNotes} />
                    </Grid>
                    <Grid item xs={12} lg={8}>

                    </Grid>
                    <Grid item xs={12} lg={12}>

                    </Grid>
                </Grid>
                <AddIcon notes={notes} setNotes={setNotes} />
                <EditNote isOpen={note !== null} notes={notes} setNotes={setNotes} note={note} setNote={setNote} />
            </>
            :
            <Home />
    );
}
