import config from "./config";

//Data class contains the api path, its options and the methods used to interact with the database
export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method, 
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    //Returns an authenticated user
    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, {emailAddress, password});
        if(response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    //Creates a new user in the database
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    //Fetches all the courses currently stored in the database
    async fetchCourses() {
        const response = await this.api('/courses', 'GET', null);
        if(response.status === 200) {
            return response.json().then(data => data)
        } else if(response.status === 401) {
            console.log(`There has been a ${response.status} error`);
        } else {
            throw new Error();
        }
    }

    //Fetches a single course from the database using the id prop
    async fetchCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET', null);
        if(response.status === 200) {
            return response.json().then(data => data)
        } else if(response.status === 401) {
            console.log(`There has been a ${response.status} error`);
        } else {
            throw new Error();
        }
    }

    //creates a new course in the database, requires an authenticated user
    async createCourse(course, emailAddress, password) {
        const response = await this.api(`/courses`, 'POST', course, true, {emailAddress, password});
        if(response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    //Updates a specific course in the database, requires an authenticated user
    async updateCourse(course, id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
        if(response.status === 204) {
            return [];
        } else if(response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    //Deletes the current course 
    async courseDelete(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password})
        if(response.status === 204) {
            return [];
        } else if(response.status === 403) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }
}