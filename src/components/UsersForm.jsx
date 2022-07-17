import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../App.css';

const UsersForm = ({ getUsers, userSelected, desSelectedUser }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (userSelected !== null) {
            setFirstName(userSelected.first_name);
            setLastName(userSelected.last_name);
            setBirthday(userSelected.birthday);
            setEmail(userSelected.email);
            setPassword(userSelected.password);
        }
    }, [userSelected])

    const submit = (e) => {
        e.preventDefault()
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            birthday: birthday,
            email: email,
            password: password,
        }
        // alert("Adding user...")
        if (userSelected !== null) {
            // alert("Updating user...")
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, newUser)
                .then(() => getUsers())
                .catch(error => console.log(error.response))
            reset();
            desSelectedUser();
        } else {
            axios.post("https://users-crud1.herokuapp.com/users/", newUser)
                .then(() => getUsers())
                .catch(error => alert("Please fill in all required fields"))
            reset();
        }
        // console.log(newUser);
    }

    const reset = () => {
        setFirstName("");
        setLastName("");
        setBirthday("");
        setEmail("");
        setPassword("");
    }

    const clear = () => {
        reset();
        desSelectedUser();
    }

    return (
        <>
            <button type="button" className="btn btn-primary ModalButton" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add New User
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">{userSelected !== null ? "Edit User" : "New User"}</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={submit}>
                                {/* <h2>{userSelected !== null ? "Edit User" : "New User"}</h2> */}
                                <div className="InputContainer">
                                    <i className="fa-solid fa-user"></i>
                                    <label htmlFor="first_name"></label>
                                    <input
                                        className='UserInput'
                                        placeholder='First Name'
                                        id="first_name"
                                        type="text"
                                        onChange={e => setFirstName(e.target.value)}
                                        value={firstName} />
                                    {/* </div>
                                <div> */}
                                    <label htmlFor="last_name"></label>
                                    <input
                                        className='UserInput'
                                        placeholder='Last Name'
                                        id="last_name"
                                        type="text"
                                        onChange={e => setLastName(e.target.value)}
                                        value={lastName} />
                                </div>
                                <div>
                                    <i className="fa-solid fa-cake-candles"></i>
                                    <label htmlFor="birthday"></label>
                                    <input
                                        className='InfoInput'
                                        id="birthday"
                                        type="date"
                                        onChange={e => setBirthday(e.target.value)}
                                        value={birthday} />
                                </div>
                                <div>
                                    <i className="fa-solid fa-envelope"></i>
                                    <label htmlFor="email"></label>
                                    <input
                                        className='InfoInput'
                                        placeholder='Email'
                                        id="email"
                                        type="email"
                                        onChange={e => setEmail(e.target.value)}
                                        value={email} />
                                </div>
                                <div>
                                    <i className="fa-solid fa-lock"></i>
                                    <label htmlFor="password"></label>
                                    <input
                                        className='InfoInput'
                                        placeholder='Password'
                                        id="password"
                                        type="password"
                                        onChange={e => setPassword(e.target.value)}
                                        value={password} />
                                </div>
                                <div>
                                    <button className="btn btn-success" data-bs-dismiss="modal">{userSelected !== null ? "Update" : "Submit"}</button>
                                    {userSelected !== null && (
                                        <button type="button" className="btn btn-dark" onClick={clear}>Clear</button>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersForm;

