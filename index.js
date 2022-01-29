const peticion = new XMLHttpRequest();
const arrayMemes = [];
let interfaz = ""

peticion.addEventListener("load", function(){
    let divContenedor = document.getElementById("divContenedor")
    let respuesta;
    respuesta = JSON.parse(peticion.responseText)
    console.log(respuesta)
    
    for (let i = 1; i < respuesta.data.memes.length; i++) {
        
        arrayMemes.push(respuesta.data.memes[i])
    }
    
    console.log(arrayMemes);

    for (const meme of arrayMemes) {
        interfaz += `

            <div class="col-4 mt-4 " >
                    <div class="card cardHover " style="width: 18rem;">
                    <img src="${meme.url}" class="card-img-top" style="width: 15rem; height: 14rem; margin: auto;" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meme.name}</h5>
                        <a href="#" id="${meme.id}" class="btn btn-primary btn-add">Agregar a favoritos</a>
                    </div>
                    </div>
            </div>
                
            
            `
        divContenedor.innerHTML = interfaz

        
    }
    addEvent()

})

peticion.open("GET",` https://api.imgflip.com/get_memes`) 
peticion.send()

const arraySeleccion = JSON.parse( localStorage.getItem("arrGuardados") ) || [] ;

class Meme {
    
    constructor (id, nombre, url) {

        this.id = id,
        this.nombre = nombre,
        this.url = url

    }

    // addQuantity () {
    //     return this.cantidad += this.cantidad + 1
    // }

    // subtractQuantity () {
    //     return this.cantidad -= this.cantidad - 1
    // }


}


const addEvent = () => {
    
    const btnAdd = document.getElementsByClassName("btn-add")
    for (let i = 0; i < btnAdd.length; i++) {
        
        btnAdd[i].addEventListener("click" , (e) => {
            e.preventDefault()
            filter(e.target.id)
        })
        
    }
    
}

const filter = (param) => {
    let resultFilter = arrayMemes.filter( e => e.id == param)
    if (resultFilter.length != 0) {
        arraySeleccion.push( new Meme (resultFilter[0].id, resultFilter[0].name, resultFilter[0].url) )
    }
    localStorage.setItem("arrGuardados", JSON.stringify(arraySeleccion))
};


const btnModal = document.getElementById("btn-modal");

btnModal.addEventListener("click" , () => {
    const bodyModal = document.getElementById("modal-body")
    let interfazModal = " ";
    if (arraySeleccion.length != 0) {
        arraySeleccion.map( e => {
            interfazModal += ` <h2>${e.nombre}</h2>
                                <img src="${e.url}"  style="width: 15rem; height: 14rem;" alt="...">
                                <hr>
                                `
        })
        bodyModal.innerHTML = interfazModal
    }
})