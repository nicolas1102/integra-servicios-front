import axios from 'axios'
import { BASE_URL } from '../axios';

export const getLosBazuquerosResourcesRequest = async () => {
  const res = await axios.get(BASE_URL + '/clienteintegracion')
  console.log(res);
  return res
}
