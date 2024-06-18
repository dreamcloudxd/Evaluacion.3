// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
//librería que permite utilizar funciones
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN:
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAj3WMerhqFcRAGMWw4p-vLZjbvzoK1L3o",
    authDomain: "eval-d8871.firebaseapp.com",
    projectId: "eval-d8871",
    storageBucket: "eval-d8871.appspot.com",
    messagingSenderId: "229403606862",
    appId: "1:229403606862:web:e2085ee5cff07adb84e81f",
    measurementId: "G-F19KZY7VB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//función de firestore que retorna la base de datos para ser utilizada
const db = getFirestore(app);

export const anadir = async (form) => {
    const q = query(collection(db, 'Gastos'), where("fecha", "==", form.fecha));
  
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      await addDoc(collection(db, 'Gastos'), form);
      return true;
    } else {
      return false;
    }
  }
//función para guardar un registro
export const save = (gastos) => {
    //addDoc es una función de firestore que permite añadir un nuevo documento a la colección 
    //collection es una función de firestore que permite recibir la base de datos y el nombre de la colección
    addDoc(collection(db, 'Gastos'), gastos)
}
//función para listar todos los registros
export const getData = (data) => {
    //onSnapshot es la función que permite retornar la colección y asignarla a una variable
    onSnapshot(collection(db, 'Gastos'), data)
}

//función eliminar 
export const eliminar = (id) =>{
    //deleteDoc es la función de firestore que permite eliminar un documento por su id
    //doc es la función que permite buscar el documento por su id 
    deleteDoc(doc(db,'Gastos',id))
}

//getDoc obtener un documento, porque debe esperar a traer el resultado  
export const obtener = (id) => getDoc(doc(db,'Gastos',id))

//función para actualizar los datos del documento 
export const update = (id,gastos) =>{
    //updateDoc es una función de firestore permite modificar un documento seleccionado 
    updateDoc(doc(db,'Gastos',id),gastos)
}