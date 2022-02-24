import React, { useContext, useState } from "react";
import Form from "./Form";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

export default function CreateCourse() {

    const history = useHistory();
    const context = useContext(Context);
    const {authenticatedUser} = context;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [userId] = useState(authenticatedUser.user.id);
    const [errors, setErrors] = useState([]);

    const submit = () =>{
        const emailAddress = authenticatedUser.user.emailAddress;
        const password = authenticatedUser.clientPassword;
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        }
        //console.log(course);
        //console.log(authenticatedUser);
        //console.log(emailAddress);
        //console.log(password)

        context.data.createCourse(course, emailAddress, password)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    console.log('Course created');
                    history.push('/');
                }
            })
    }

    const cancel = () => {
        history.push('/');
    }

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

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Create Course"
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
                                    <label htmlFor="courseDescription">Course Description</label>
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
                    )}
                />
            </div>
        </main>
    )
}