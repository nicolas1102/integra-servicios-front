import { UserInterface } from '@/lib/interfaces/user.interface'
import { auth, db } from '@/lib/firebase/clientApp';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signIn, SignInResponse } from 'next-auth/react';
import { collection } from 'firebase/firestore';

export const createUser = async (user: UserInterface) => {
  const res = await createUserWithEmailAndPassword(auth, user.correo, user.contraseña!)
  return res
}

export const getAuthorizedUserRequest = async (correo: string, contraseña: string, rol: string) => {
  const res = await signIn('credentials', {
    correo: correo,
    contraseña: contraseña,
    rol: rol,
    redirect: false,
  })
  return res as SignInResponse;
};

// export const updatePasswordUserRequest = async (email: string, oldPassword: string, newPassword: string, confirmPassword: string) => {
//   const res = await axios.post(BASE_URL + '/auth/new-password', { email, oldPassword, newPassword, confirmPassword })
//   return res
// }

// export const getUsersRequest = async () => {
//   const res = await axios.get(BASE_URL + '/users/all')
//   return res
// }

// export const getUsersByRoleRequest = async (role: string) => {
//   const res = await axios.get(BASE_URL + `/users/user/role/${role}`)
//   return res
// }

// export const getOneUserByEmailRequest = async (email: string) => {
//   const res = await axios.get(BASE_URL + `/users/user/email/${email}`)
//   return res;
// };

// export const updateUserRequest = async (user: UserInterface) => {
//   const res = await axios.post(BASE_URL + '/users/user/modify', user)
//   return res
// }

// TODO: Terminar
// export const deleteUserRequest = async (email: string) => {
//   const res = await axios.get(BASE_URL + `/users/user/delete/${email}`)
//   return res
// }

// // TODO: Terminar
// export const unblockUserAccountRequest = async (email: string, token: string) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
//   const res = await axios.post(BASE_URL + '/auth/unlock', { email }, config)

//   return res
// }