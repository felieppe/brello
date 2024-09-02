import axios from 'axios';

const BASE_URL = 'http://localhost:3005'

async function fetchTasks(filters) {
    const endpoint = `${BASE_URL}/tasks`

    try {
        const response = await axios.get(endpoint, { params: filters })
        return response.data["data"];
    } catch(err) { throw err.response.data["error"]}
}

async function fetchTaskById(id) {
    const endpoint = `${BASE_URL}/tasks/${id}`

    try {
        const response = await axios.get(endpoint)
        return response.data["data"];
    } catch(err) { throw err.response.data["error"] }
}

export { fetchTasks, fetchTaskById }