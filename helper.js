const verificar = (id) => {
    const input = document.getElementById(id)
    input.classList.remove('is-invalid')

    if (input.value.trim() === '') {
        input.classList.add('is-invalid')
    }
    else {
        if (id == 'fecha') {
            const dia = validarFecha(input.value)
            if (dia <= 0) {
                input.classList.add('is-invalid')
            }
        }
    }
}

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-valid')
        item.classList.remove('is-invalid')
    })
    document.querySelectorAll('.form-check-input').forEach(items => {
        items.classList.remove('is-valid')
        items.classList.remove('is-invalid')
    })
}

const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}

const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}
const validarOcupacion = () => {
    const opiniones = document.getElementsByName('ocupacion')
    let seleccion = false

    opiniones.forEach(radio => {
        if (radio.checked) {
            radio.classList.add('is-valid')
            radio.classList.remove('is-invalid')
            seleccion = true
        } else {
            radio.classList.add('is-invalid')
            radio.classList.remove('is-valid')
        }
    })

    if (seleccion) {
        opiniones.forEach(radio => {
            radio.classList.remove('is-invalid')
        })
    }
}
