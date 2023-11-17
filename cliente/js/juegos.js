const listarJuego = () =>{
    fetch("http://localhost:3000/juego/listar", {
    method: "get"
})
.then(resp => resp.json())
.then(data => {
    data.forEach(element => {
        let boxprincipal = document.getElementById('BoxJuegos');
        
        let BoxPlay = document.createElement('div');
        BoxPlay.classList.add('col',"border",); 
        let BoxImg = document.createElement('div');
        BoxPlay.appendChild(BoxImg);
        BoxImg.innerHTML = element.imagen;
        let tituloJuego= document.createElement('h4')
        tituloJuego.innerHTML=element.nombre
        BoxPlay.appendChild(tituloJuego)
        let descripcionJuego= document.createElement('p')
        descripcionJuego.innerHTML=element.descripcion
        BoxPlay.appendChild(descripcionJuego)
        let PrecioJuego=document.createElement('h3')
        PrecioJuego.innerHTML=`$ ${element.precio}`
        BoxPlay.appendChild(PrecioJuego)

        /* BOTONES ADMIN */

        let actualizar=document.createElement('div')
        actualizar.classList.add("btn","bg-primary","text-light")
        actualizar.innerHTML=`<a href="" class="text-light">Actualizar</a>`
        BoxPlay.appendChild(actualizar)
        let eliminar=document.createElement('div')
        boxprincipal.appendChild(BoxPlay)
    });
});

}
listarJuego()
