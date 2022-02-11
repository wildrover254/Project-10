import React from "react";

export default function CreateCourse() {
    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                
                <form>
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value=""></input>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value=""></input>

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onclick="event.preventDefault(); location.href='/';">Cancel</button>
                </form>
            </div>
        </main>
    )
}