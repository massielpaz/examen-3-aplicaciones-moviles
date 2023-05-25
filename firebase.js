// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBztRoCNrNBu4TwMoUYVaiICQ1FG81ysP4",
    authDomain: "examen-karen-3.firebaseapp.com",
    projectId: "examen-karen-3",
    storageBucket: "examen-karen-3.appspot.com",
    messagingSenderId: "139893096884",
    appId: "1:139893096884:web:f149e1f2c624d2afb3b2e1"
};

// Initialize Firebase
const FireApp = initializeApp(firebaseConfig);

// Create a reference to the cities collection
import { endAt, getFirestore } from "firebase/firestore";
const db = getFirestore(FireApp);

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

import { collection, query, where, getDocs } from "firebase/firestore";
const q = query(collection(db, "mascotas"), where("tipo", "==", "gato"));

getDocs(q).then((result) => {
    result.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let data = doc.data();
        let image = data.imagen.id;

        let entidad = {
            nombre: data.nombre,
            tipo: data.tipo,
            imagen: image,
            edad: data.edad,
            descripcion: data.descripcion,
            precio: data.precio,
            direccion: data.direccion
        };

        let nombreAnimalArea = document.getElementById("nombreAnimal");
        let imagenAnimalArea = document.getElementById("imagenAnimal");
        let direccionAnimalArea = document.getElementById("direccionAnimal");
        let descripcionAnimalArea = document.getElementById("animalDescripcion");
        let precioAnimalArea = document.getElementById("animalPrecio");
        let edadAnimalArea = document.getElementById("edadAnimal");

        nombreAnimalArea.innerText = entidad.nombre;
        direccionAnimalArea.innerText = entidad.direccion;
        descripcionAnimalArea.innerText = entidad.descripcion;
        precioAnimalArea.innerText = entidad.precio;
        edadAnimalArea.innerText = `${entidad.edad} años`;

        getDownloadURL(ref(storage, `imagenes/${image}`))
            .then((url) => {
                console.log("Descarga de imagen de firebase: " + url);
                imagenAnimalArea.src = `${url}`;
            });

        // console.log(doc.id, " => ", doc.data());

        console.log(entidad);
    });
});