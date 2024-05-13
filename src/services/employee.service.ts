import { UserInterface } from '@/lib/interfaces/usuario.interface'
import { auth, COLLECTION_NAMES, db } from '@/lib/firebase/clientApp';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signIn, SignInResponse } from 'next-auth/react';
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';

export const getOneEmployeeByEmailAndPassword = async (
  correo: string,
  contraseña: string
) => {
  const queryEmployee = query(collection(db, COLLECTION_NAMES.EMPLOYEE), where('correo', '==', correo));
  const querySnapshot = await getDocs(queryEmployee);
  const employeeData = querySnapshot.docs[0].data();
  if (employeeData) {
    employeeData.id = querySnapshot.docs[0].id;
  }
  if (!employeeData.empty && employeeData.contraseña === contraseña) {
    return employeeData;
  }
  throw new Error('Credenciales invalidas.')
}
