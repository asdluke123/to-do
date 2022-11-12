import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import List from "./pages/List";
import Login from "./pages/Login";
function App() {
  const [userData, setUserData] = useState({});
  const [userToDos, setUserToDos] = useState([]);
  useEffect(() => {
    setUserToDos(JSON.parse(localStorage.getItem("todos")));
    console.log();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login setUserData={setUserData} setUserToDos={setUserToDos} />
        }
      />
      <Route
        path="/list"
        element={<List userToDos={userToDos} setUserData={setUserData}/>}
      />
    </Routes>
  );
}

export default App;
