import React from 'react';
import '../App.css';


const UsersList = ({ users, deleteUsers, selectUser }) => {
    return (
        <div className="UsersList">
            <h1>Users List</h1>
            {users?.map((user) => (
                <div className="UserContainer Row col-6" key={user.id}>
                    <div className="InfoList">
                        <h3><i className="fa-solid fa-user"></i> {user.first_name} {user.last_name}</h3>
                        <h3><i className="fa-solid fa-envelope"></i> {user.email}</h3>
                        <h3><i className="fa-solid fa-cake-candles"></i> {user.birthday}</h3>
                        {/* <h3 type="password"><i className="fa-solid fa-lock"></i> {user.password}</h3> */}
                    </div>
                    <div className="InfoButton">
                        <div className='DeleteButton'>
                            <button onClick={() => deleteUsers(user.id)}><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                        <div className='SelectButton'>
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectUser(user)}><i className="fa-solid fa-user-pen"></i></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsersList;