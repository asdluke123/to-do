import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Todo = ({ todo, index, saveEdit, updateToDo, deleteToDo }) => {
  const [newToDo, setNewToDo] = useState(todo.name);
  const [validEdit, setValidEdit] = useState(true);

  const checkValidEdit = () => {
    if (newToDo.length > 0) {
      setValidEdit(true);
      saveEdit(newToDo, index);
      setNewToDo("");
    } else {
      setValidEdit(false);
    }
  };
  return (
    <div>
      {todo.isEdit ? (
        <div className="todo-edit">
          <input
            type="text"
            onChange={(e) => {
              setValidEdit(e.target.value.length > 0);
              setNewToDo(e.target.value);
            }}
            value={newToDo}
            placeholder="Enter To Do"
            maxLength={25}
            className="todo-edit-input"
          ></input>
          <Button
            variant="contained"
            type="button"
            color={validEdit ? "info" : "error"}
            sx={{
              marginRight: "10px",
              fontSize: "18px",
              paddingLeft: "25px",
              paddingRight: "25px",
              letterSpacing: "1.5px",
            }}
            onClick={() => {
              checkValidEdit();
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        <div className="todo">
          <div className="todo-detail">{todo.name}</div>
          <div className="button-container">
            <EditIcon
              type="button"
              onClick={() => updateToDo(index)}
              fontSize="large"
              sx={{ cursor: "pointer", marginRight: "13px" }}
            />
            <DeleteIcon
              type="button"
              onClick={() => deleteToDo(index)}
              fontSize="large"
              sx={{ cursor: "pointer", marginRight: "10px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
