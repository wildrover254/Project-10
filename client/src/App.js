import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {Provider} from './Context';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail)
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {

  return (
    <Provider>
      <Router>
        <div id="root">
          <HeaderWithContext />
          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route path="/signin" component={UserSignInWithContext}/>
            <Route path="/signup" component={UserSignUpWithContext}/>
            <Route path="/signout" component={UserSignOutWithContext}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
