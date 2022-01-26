import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v1';

export const fetchUsers = (path: string) => axios.get(`${baseURL}${path}`);
export const createUser = (path: string, newUser: any) => axios.post(`${baseURL}${path}`, newUser);

// export const createPost = (newPost) => axios.post(url, newPost);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
