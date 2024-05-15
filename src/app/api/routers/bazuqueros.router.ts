import axios from 'axios'
import { BASE_URL } from '@/app/api/axios.ts';

export const getLosBazuquerosResourcesRequest = async () => {
  const res = await axios.get(BASE_URL + '/clienteintegracion')
  console.log(res);
  return res
}
