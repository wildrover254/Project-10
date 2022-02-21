import React, { useContext, useState } from "react";
import Form from "./Form";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

export default function UserSignIn() {

    const history = useHistory();
    const context = useContext(Context);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const submit = () => {
        context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    setErrors(() => {
                        return { errors: [ 'Sign-in failed' ] };
                    });
                } else {
                    history.push('/');
                    console.log(`${emailAddress} was successfully signed-in.`);
                }
            })
            .catch( err => {
                console.log(err);
            })
    } 

    const change = (e) => {
        if (e.target.name === 'emailAddress') {
            setEmailAddress(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const cancel = () => {
        history.push('/');
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form
                    cancel = {cancel}
                    errors= {errors}
                    submit = {submit}
                    submitButtonText = "Sign In"
                    elements = {() => (
                        <React.Fragment>
                            <label htmlFor="emailAddress">Email Address</label>
                            <input
                                id="emailAddress"
                                name = "emailAddress"
                                type = "text"
                                onChange = {change}
                                value = {emailAddress}/>
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password"
                                name="password"
                                type="password"
                                onChange={change}
                                value={password}/>
                        </React.Fragment>
                    )}
                />
                <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>
                
            </div>
        </main>
    )
}