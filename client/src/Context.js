import React, { Component } from "react";
import Cookies from 'js-cookie';
import Data from "./Data";

export const Context = React.createContext();

//Context creates and maintains an application state
export class Provider extends Component {

    state = {
        authenticatedUser: null,
        password: null
    }

    constructor() {
        super();
        this.data = new Data();
        this.cookie = Cookies.get('authenticatedUser');
        this.state = {
            authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null            
        };
    }

    render() {
        const { authenticatedUser } = this.state;

        const value = {
            authenticatedUser,
            data: this.data,
            actions: { 
                signIn: this.signIn,
                signOut: this.signOut
            }
        }

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    //Signs in a valid user and stores the info in a cookie
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        const clientPassword = password;
        if (user !== null) {
            user.clientPassword = clientPassword;
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        }
        return user;
    }

    //Removes cookie and logs out user
    signOut = () => {
        this.setState({ authenticatedUser: null });
        Cookies.remove('authenticatedUser');
    }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}
