import React, {useState, useEffect, useContext} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Context } from "../Context";
import ReactMarkdown from 'react-markdown';

export default function CourseDetail(props) {

    const context = useContext(Context);
    const history = useHistory();
    const { id } = useParams();
    const {authenticatedUser} = context;
    const [course, setCourse] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        context.data.fetchCourse(id)
            .then(response => {
                setCourse(response);
                setUser(response.User);
            })
    }, [context.data, id]);

    const handleDelete = () => {
        const emailAddress = authenticatedUser.user.emailAddress;
        const password = authenticatedUser.clientPassword;
        context.data.courseDelete(id, emailAddress, password)
            .then(
                console.log('Course Deleted'),
                history.push('/')
                )
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    { authenticatedUser && course.userId === authenticatedUser.user.id ? (
                        <React.Fragment>
                            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                            <button className="button" onClick={handleDelete}>Delete Course</button>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </React.Fragment>
                     ) : (
                        <Link className="button button-secondary" to="/">Return to List</Link>
                     )
                    }
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By: {user.firstName} {user.lastName} </p>
                            <ReactMarkdown>
                                {course.description}
                            </ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown>
                                {course.materialsNeeded}
                            </ReactMarkdown>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}