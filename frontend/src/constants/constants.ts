// Informacion escalable de la aplicacion. En este caso solo tenemos QueryState, lo ideal seria no hardcodear strings y tenerlos todos aca.
export const queryStates = {
    QueryState: {
        NotSearch:{
            title:"Escribí en el buscador lo que querés encontrar.",
            text:"Escribí tu búsqueda en el campo que figura en la parte superior de la pantalla.",
        },
        NotFound:{
            title:"No se pudo encontrar esta búsqueda.",
            text:"Escribe otra búsqueda en el campo que figura en la parte superior de la pantalla.",
        },
        LoadSearch:{
            title:"Cargando búsqueda...",
            text:"Espere mientras se actualiza su busqueda por favor.",
        },
        Error:{
            title:"Se produjo un error.",
            text:"Escribe otra búsqueda en el campo que figura en la parte superior de la pantalla.",
        },
    },
}