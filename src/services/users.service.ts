import { UsuarioInterface } from '@/lib/interfaces/usuario.interface'
import { auth } from '@/lib/firebase/clientApp';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signIn, SignInResponse } from 'next-auth/react';

export const createUserService = async (user: UsuarioInterface) => {
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
