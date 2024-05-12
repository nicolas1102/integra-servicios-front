import { UserInterface } from '@/lib/interfaces/user.interface'
import { auth, db } from '@/lib/firebase/clientApp';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signIn, SignInResponse } from 'next-auth/react';
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';

const COLLECTION_NAME = 'Empleado'

export const getOneEmployeeByEmailAndPassword = async (
  correo: string,
  contraseña: string
) => {
  const queryEmployee = query(collection(db, COLLECTION_NAME), where('correo', '==', correo));
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

// export const getOneEmployeeByEmailAndPassword = async (
//   email: string,
//   password: string
// ) => {
//   const documents = collection(db, COLLECTION_NAME)
//   console.log(documents);
//   onSnapshot(documents, (snapshot) => {
//     let users: any[] = []
//     snapshot.forEach((doc) => {
//       users.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(users);
//   })


//   return documents
// }