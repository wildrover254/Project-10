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

import withContext from './Context';
const UserSignUpWithContext = withContext(UserSignUp);

function App() {

  return (
    <Provider>
      <Router>
        <div id="root">
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/courses/create" component={CreateCourse} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/signin" component={UserSignIn}/>
            <Route path="/signup" component={UserSignUpWithContext}/>
            <Route path="/signout" />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
