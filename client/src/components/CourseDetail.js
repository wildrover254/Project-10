import React, {useState, useEffect} from "react";

export default function CourseDetail(props) {

    const [courses, setCourses] = useState([]);

    const fetchCourse = (props) => {
        return fetch(`http://localhost:5000/api/courses/${props.match.params.id}`)
            .then((response) => response.json())
            .then((courses) => setCourses(courses))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchCourse(props);
        console.log(courses);
    }, []);

    console.log(courses);

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="#">Update Course</a>
                    <a className="button" href="#">Delete Course</a>
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courses.title}</h4>
                            <p>By: </p>
                            <p>{courses.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courses.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <p>{courses.materialsNeeded}</p>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}