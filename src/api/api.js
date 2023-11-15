import axios from "axios";

const url = "http://localhost:3000/contacts";

/** Get */
export function fetchAll() {
    return axios.get(url);
}

export function fetchContact(id) {
    return axios.get(`${url}/${id}`);
}

/** Post */
export function newContact(data) {
    return axios.post(url, data);
}

/** Update */
export function editContact(id, data) {
    return axios.put(`${url}/${id}`, data);
}

/** Delete */
export function deleteContact(id) {
    return axios.delete(`${url}/${id}`);
}

export function formatPhoneNumber(phoneString) {
    const cleaned = ("" + phoneString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + "-" + match[2] + "-" + match[3];
    }
    return null;
}
