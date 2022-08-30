import axios from 'axios'
import Cookie from 'universal-cookie'

const cookies = new Cookie()
const baseURL = process.env.REACT_APP_BASE_URL
const token = cookies.get('loginID')

export const axiosRequest = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});