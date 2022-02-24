import React, { useEffect} from "react";
import { Redirect } from "react-router-dom";

//Sign out component calls the sign out function
const UserSignOut = ({ context }) => {
    useEffect (() => context.actions.signOut());

    return(
        <Redirect to='/' />
    );
}

export default UserSignOut;