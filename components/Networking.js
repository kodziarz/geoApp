import { address, port } from "../settings.json"
const serverAddress = `${address}:${port}/`

export const registerUser = async (login, password) => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            login: login,
            password: password
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }
    return await fetch(serverAddress + "user/", options)
}

export const getUsersList = async () => {
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }
    return await fetch(serverAddress + "users/", options)
}

export const deleteUser = async (login, password) => {

    const options = {
        method: "DELETE",
        body: JSON.stringify({
            login: login,
            password: password
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }
    return await fetch(serverAddress + "user/", options)
}