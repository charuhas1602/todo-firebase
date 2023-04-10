
import { Box, Button, FormControl, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import { db } from './firebase-config';
import { addDoc, collection, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore/lite';
import ButtonAppBar from './components/ButtonAppBar';
import AppTitle from './components/AppTitle';
// import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  async function getTodos(db) {
    const todosCol = collection(db, 'todos');
    const todosSnapshot = await getDocs(todosCol);
    const todosList = todosSnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    });
    // console.log(todosList)
    setTodos(todosList)
  }

  useEffect(() => {
    getTodos(db)
  }, [])

  //add todo function
  const addTodo = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: input,
        timestamp: serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
      window.location.reload(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setInput("")
  }





  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      <div className="App px-2 ">
        <AppTitle/>
        <Box sx={{ width: '100%', maxWidth: 700, margin: "10px auto", display: "flex", justifyContent: "space-around" }}>
          <FormControl sx={{ display: "flex", justifyContent: "space-around", width: "100%", flexDirection: "row", backgroundColor: "#E4DCCF", padding: "15px", borderRadius: "5px" }}>
            <Input id="my-input" value={input} placeholder='✅ Write Todo' type="text" onChange={(event) => { setInput(event.target.value) }} sx={{ width: "90%", margin: "0 20px" }} />
            <Button variant='contained' type='submit' onClick={(e) => addTodo(e)} disabled={input.length > 3 ? false : true}>Add todo</Button>
          </FormControl>
        </Box>
        <Box sx={{ width: '100%', maxWidth: 700, margin: "10px auto", display: "flex", justifyContent: "stretch", flexDirection: "column", alignItems: "center" }}>
          {todos.map(todo => {
            return (
              <TodoItem todo={todo} key={todo.id} />
            )
          })}
        </Box>
      </div>
    </>
  );
}

export default App;
