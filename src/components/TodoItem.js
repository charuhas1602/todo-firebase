import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../firebase-config';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';

export default function TodoItem({ todo }) {
    const [todoInput, setTodoinput] = React.useState(todo.todo)
    const [open, setOpen] = React.useState(false);

    //Delete todo
    const deleteTodo = async (id) => {
        console.log("delete")
        await deleteDoc(doc(db, 'todos', id));
        window.location.reload(false);
    };
    //Delete todo
    const updatetodo = async (input, todo) => {
        const docRef = doc(db, "todos", todo.id);
        const data = {
            todo: input
        };

        updateDoc(docRef, data).then(docRef => {
            handleClose()
        }).catch(error => {
            console.log(error);
        })
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        backgroundColor: "#e2e2e2",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
    };

    return (
        <>
            <List sx={{ width: '100%', backgroundColor: "#F9F5EB", marginBottom: "3px", borderRadius: "5px", display: "flex", justifyContent: "space-around" }}>
                <ListItem sx={{ display: "flex" }}>
                    <TextField
                        sx={{ width: '100%', }}
                        variant="standard"
                        value={todoInput}
                        disabled
                    />

                </ListItem>
                <DeleteIcon sx={{ margin: "10px 30px" }} onClick={() => deleteTodo(todo.id)} />
                <EditIcon onClick={() => handleOpen()} sx={{ margin: "10px 30px" }} />

            </List>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: "40%" }}>
                    <TextField variant="standard" value={todoInput} onChange={(e) => setTodoinput(e.target.value)}></TextField>
                    <Button variant='contained' sx={{ padding: "10px" }} onClick={() => updatetodo(todoInput, todo)}>
                        Update
                    </Button>
                </Box>
            </Modal>
        </>
    );
}