import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import UsersForm from './components/UsersForm';
import UsersList from './components/UsersList';

function App() {

  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  useEffect (() => {
    axios.get("https://users-crud1.herokuapp.com/users/")
    .then((res) => setUsers(res.data))
    .catch(error => console.log(error.response))
  }, []);

  const getUsers = () => {
    axios.get("https://users-crud1.herokuapp.com/users/")
    .then((res) => setUsers(res.data))
    .catch(error => console.log(error.response))
  }

  const deleteUsers = (id) => {
    // alert("Delete user...")
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}`)
    .then(() => getUsers())
    .catch(error => console.log(error.response))
  }

  const selectUser = (user) => {
    setUserSelected(user)
  }

const desSelectedUser = () => {
setUserSelected(null)
}

  console.log(users);

  return (
    <div className="App">
      <UsersForm 
      getUsers={getUsers}
      userSelected={userSelected}
      desSelectedUser={desSelectedUser}/>
      <UsersList 
      users={users}
      selectUser={selectUser}
      deleteUsers={deleteUsers}/>
    </div>
  )
}

export default App
