import io from 'socket.io-client'
import {ip} from '../config/config'
const ENDPOINT  = `${ip}:9000`

console.log("socket")
export let socket  = io(ENDPOINT);
