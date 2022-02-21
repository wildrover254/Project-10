import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

export default function Header() {

    const { authenticatedUser } = useContext(Context);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Course Directory</Link></h1>
                <nav>
                    {authenticatedUser ?
                        <React.Fragment>
                            <ul className='header--signedin'>
                                <li>
                                    Welcome {authenticatedUser.user.firstName} 
                                </li>
                                <li>
                                    <Link to='/signout'>
                                        Sign Out
                                    </Link>
                                </li>
                            </ul>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <ul className='header--signedout'>
                                <li>
                                    <Link to="/signup">
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signin">
                                        Sign In
                                    </Link>
                                </li>
                            </ul>
                        </React.Fragment>
                    }
                </nav>
            </div>
        </header>
    )
};