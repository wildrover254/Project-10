import React, { useState, useContext } from "react";
import Form from "./Form";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

export default function UserSignUp() {
    
    const history = useHistory();
    const context = useContext(Context);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState([]);

    //Submits information for new user to database
    const submit = () => {
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        }

        context.data.createUser(user)
        .then( errors => {
            if (errors.length) {
                setErrors(errors);
            } else {
                context.actions.signIn(user.emailAddress, user.password)
                    .then(() => {
                        history.push('/');
                    })
                console.log(`${firstName} is successfully registered!`);
            }
        })
        .catch (err => {
            console.log(err);
        })
    }

    //Cancel returns user to root
    const cancel = () => {
        history.push('/');
    }

    //Stores user input in state
    const change = (event) => {
        //const name = event.target.name;
        //const value = event.target.value;
        if (event.target.name === 'firstName') {
            setFirstName(event.target.value);
        } else if (event.target.name === "lastName") {
            setLastName(event.target.value);
        } else if (event.target.name === "emailAddress") {
            setEmailAddress(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    }
    
    //Renders the sign up form
    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <Form
                    cancel = {cancel}
                    errors = {errors}
                    submit = {submit}
                    submitButtonText = "Sign Up"
                    elements = {() => (
                        <React.Fragment>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={firstName}
                                onChange={change}/>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={change}/>
                            <label htmlFor="emailAddress">Email Address</label>
                            <input 
                                id="emailAddress"
                                name="emailAddress"
                                type="email"
                                value={emailAddress}
                                onChange={change}/>
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={change}/>
                        </React.Fragment>
                    )} 
                />
                <p>Already have a user account? Click here to <a href="/signin">sign in</a>!</p>
            </div>
        </main>
    );
}