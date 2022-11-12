import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Todo from "../components/Todo";
import { toast } from "react-hot-toast";
const List = ({ setUserData, userToDos }) => {
  const [todos, setTodos] = useState(userToDos);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [addingToDo, setAddingToDo] = useState(false);

  useEffect(() => {
    setTodos(userToDos);
  }, [userToDos]);

  const saveEdit = (newToDo, index) => {
    const temp = todos[index];
    const newToDos = [...todos];
    temp.name = newToDo;
    temp.isEdit = false;
    newToDos.splice(index, 1, temp);
    setTodos(newToDos);
    localStorage.setItem("todos", JSON.stringify(todos));
    setAddingToDo(false);
    toast.success("Added new To-Do!");
  };

  const updateToDo = (index) => {
    const temp = todos[index];
    const newToDos = [...todos];
    temp.isEdit = true;
    newToDos.splice(index, 1, temp);
    setTodos(newToDos);
    setAddingToDo(true);
  };
  const deleteToDo = (index) => {
    const deletedToDo = todos[index];
    const newToDos = [...todos];
    newToDos.splice(index, 1);
    setTodos(newToDos);
    toast.error(`Deleted ${deletedToDo.name} from To-Do list`);
  };
  const setSearching = (value) => {
    if (value) {
      setIsSearching(true);
      setSearch(value);
    } else {
      setIsSearching(false);
    }
  };
  return (
    <div className="list-container">
      <NavBar setUserData={setUserData} />
      <h1> My To-Do List</h1>
      <div className="list">
        <div className="top">
          <SearchBar
            setSearching={setSearching}
            search={search}
            setIsSearching={setIsSearching}
          />
          <Button
            variant="contained"
            disabled={isSearching || addingToDo ? true : false}
            sx={{
              fontSize: "20px",
              cursor: "pointer",
              padding: "3px 25px 3px 25px",
            }}
            onClick={() => {
              setAddingToDo(true);
              setTodos((prevToDos) => [
                { name: "", isEdit: true },
                ...prevToDos,
              ]);
            }}
          >
            New
          </Button>
        </div>
        <div className="bottom">
          {isSearching
            ? todos &&
              todos.map(
                (todo, index) =>
                  todo.name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase()) && (
                    <Todo
                      key={index}
                      todo={todo}
                      index={index}
                      saveEdit={saveEdit}
                      updateToDo={updateToDo}
                      deleteToDo={deleteToDo}
                    />
                  )
              )
            : todos &&
              todos.map((todo, index) => (
                <Todo
                  key={index}
                  todo={todo}
                  index={index}
                  saveEdit={saveEdit}
                  updateToDo={updateToDo}
                  deleteToDo={deleteToDo}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default List;
