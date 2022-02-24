import React, {useState, useContext, useEffect} from "react";
import Form from "./Form";
import { Context } from "../Context";
import { useHistory, useParams } from "react-router-dom";

export default function UpdateCourse() {

    const context = useContext(Context);
    const history = useHistory();
    const { id } = useParams();
    const {authenticatedUser} = context;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [userId] = useState(authenticatedUser.user.id);
    const [errors, setErrors]  = useState([]);

    //Fetches the current course from teh database
    useEffect(() => {
        context.data.fetchCourse(id)
            .then(response => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    setTitle(response.title);
                    setDescription(response.description);
                    setEstimatedTime(response.estimatedTime);
                    setMaterialsNeeded(response.materialsNeeded);
                }
            })
    }, [context.data, id, errors]);

    //Submits user changes to course, requiring authentication
    const submit = () => {
        const emailAddress = authenticatedUser.user.emailAddress;
        const password = authenticatedUser.clientPassword;
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        }

        context.data.updateCourse(course, id, emailAddress, password)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors)
                } else {
                    console.log('Course Updated');
                    history.push(`/courses/${id}`);
                }
            })
    }

    //Cancel function returns user to the root 
    const cancel = () => {
        history.push('/');
    }

    //Stores changes made by the user in state
    const change = (event) => {
        if (event.target.name === 'courseTitle') {
            setTitle(event.target.value)
        } else if (event.target.name === 'courseDescription') {
            setDescription(event.target.value)
        } else if (event.target.name === 'estimatedTime') {
            setEstimatedTime(event.target.value)
        } else if (event.target.name === 'materialsNeeded') {
            setMaterialsNeeded(event.target.value)
        }
    }

    //Renders the form and the data from the current course in the form fields
    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <Form 
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Update Course"
                    elements = {() => (
                        <React.Fragment>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input 
                                        id="courseTitle"
                                        name="courseTitle"
                                        type="text"
                                        value={title}
                                        onChange={change}/>
                                    <p>By: {authenticatedUser.user.firstName} {authenticatedUser.user.lastName}</p>
                                    <label htmlFor="courseDescription"> Course Description</label>
                                    <textarea 
                                        id="courseDescription"
                                        name="courseDescription"
                                        type="text"
                                        value={description}
                                        onChange={change}/>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input 
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        value={estimatedTime}
                                        onChange={change}/>
                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea 
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        type="text"
                                        value={materialsNeeded}
                                        onChange={change}/>
                                </div>
                            </div>
                        </React.Fragment>
                    )}/>
            </div>
        </main>
    )
}
