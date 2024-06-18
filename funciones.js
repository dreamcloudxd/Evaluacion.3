import { anadir, eliminar, getData, obtener, save, update } from "./firebase.js"

let id = 0
document.getElementById('btnGuardar').addEventListener('click', async () => {
    validarOcupacion()
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    }) 

    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const Gastos = {
                'nom': document.getElementById('nombre').value.trim(),
                'fecha': document.getElementById('fecha').value,
                'fono': document.getElementById('fono').value,
                'comida': document.getElementById('comida').value,
                'transporte': document.getElementById('transporte').value,
                'ocupacion': document.querySelector('input[name="ocupacion"]:checked').value
            }
            const agregado = await anadir(Gastos);
            if(!agregado){
                Swal.fire({
                    title: "Error",
                    text: "Ese correo ya esta registrado",
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: "Enviado",
                    text: "Formulario enviado con exito",
                    icon: "success"
                }).then(() => {
                    limpiar()
                })
            }
        } else {
            const Gastos = {
                'nom': document.getElementById('nombre').value.trim(),
                'fecha': document.getElementById('fecha').value,
                'fono': document.getElementById('fono').value,
                'comida': document.getElementById('comida').value,
                'transporte': document.getElementById('transporte').value,
                'ocupacion': document.querySelector('input[name="ocupacion"]:checked').value
            }
            //se invoca la función para actualizar
            update(id,Gastos)
            limpiar()
            //volver al estado inciial la variable de i 
            id = 0
        }
    }
})
//DOMEventLister es un evento que se ejecuta cuando se recarga la página 
window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        //se recorre la colección y se crear el item doc para mostrar los datos
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.nom}</td>
            <td>${item.fecha}</td>
            <td>${item.fono}</td>
            <td>${item.comida}</td>
            <td>${item.transporte}</td>
            <td>${item.ocupacion}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botón y eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //añadir sweetalert para confirmar la eliminación
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        //seleccionar el documento
        document.querySelectorAll('.btn-warning').forEach( btn => {
            //async indica que necesitamos un await para esperar a que la función responda
            btn.addEventListener('click',async() =>{
                //invocar función para buscar el documento por su id
                const doc = await obtener(btn.id)
                //obtener los valores del documento
                const d = doc.data()
                //asignar los valores a los input
                document.getElementById('nombre').value = d.nom
                document.getElementById('fecha').value = d.fecha
                document.getElementById('fono').value = d.fono
                document.getElementById('comida').value = d.comida
                document.getElementById('transporte').value = d.transporte
                const ocupacionRadio = document.querySelector(`input[name="ocupacion"][value="${d.ocupacion}"]`);
                ocupacionRadio.checked = true;
                //modificar el valor del botón 
                document.getElementById('btnGuardar').value = 'Modificar'
                //asignar el id del documento a nuestra variable
                id = btn.id
            })
        })

    })
})