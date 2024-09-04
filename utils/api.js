import axios from 'axios';

const BASE_URL = 'http://localhost:3005/v1'

async function fetchTasks(filters) {
    const endpoint = `${BASE_URL}/tasks`

    try {
        const response = await axios.get(endpoint, { params: filters })
        return response.data["data"];
    } catch(err) { throw err.response.data["error"] }
}

async function fetchTaskById(id) {
    const endpoint = `${BASE_URL}/tasks/${id}`

    try {
        const response = await axios.get(endpoint)
        return response.data["data"];
    } catch(err) { throw err.response.data["error"] }
}

async function fetchMembers(filters) {
    const endpoint = `${BASE_URL}/members`

    try {
        const response = await axios.get(endpoint, { params: filters })
        return response.data["data"];
    } catch(err) { throw err.response.data["error"] }
}

async function fetchMemberById(id) {
    const endpoint = `${BASE_URL}/members/${id}`

    try {
        const response = await axios.get(endpoint)
        return response.data["data"];
    } catch(err) { throw err.response.data["error"] }
}

async function createTask(task) {
    const endpoint = `${BASE_URL}/tasks`

    try {
        const response = await axios.post(endpoint, task)
        return response.data["data"];
    } catch(err) { throw err.response.data["error"] }
}

export { fetchTasks, fetchTaskById, fetchMembers, fetchMemberById, createTask };