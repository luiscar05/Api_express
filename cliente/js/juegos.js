
const listarJuego = () => {
    fetch("http://localhost:3000/juego/listar", {
      method: "get"
    })
      .then(resp => resp.json())
      .then(data => {
        let boxprincipal = document.getElementById('BoxJuegos');
  
        data.forEach(element => {
          let BoxPlay = document.createElement('div');
          BoxPlay.classList.add('col', 'border','p-1','flex','bg-light','rounded','m-4');
  
          let BoxImg = document.createElement('div');
          let img = document.createElement('img');
          img.classList.add('w-64','h-auto','rounded-sg','shadow-md')
          img.src = `../public/img/${element.imagen}`; // Asigna la URL de la imagen al atributo src de la etiqueta img
          img.style.width = '60%';
          img.style.height = '50%';
          BoxImg.appendChild(img);
  
          BoxPlay.appendChild(BoxImg);
  
          let tituloJuego = document.createElement('h4');
          tituloJuego.innerHTML = element.nombre;
          BoxPlay.appendChild(tituloJuego);
  
          let descripcionJuego = document.createElement('p');
          descripcionJuego.innerHTML = element.descripcion;
          BoxPlay.appendChild(descripcionJuego);
  
          let PrecioJuego = document.createElement('h3');
          PrecioJuego.innerHTML = `$ ${element.precio}`;
          BoxPlay.appendChild(PrecioJuego);

          let opciones = document.createElement('div');
            opciones.classList.add('flex', 'p-2', 'flex-row');
            BoxPlay.appendChild(opciones);

            /* BOTONES ADMIN */
            let actualizar = document.createElement('div');
            actualizar.classList.add('btn', 'bg-primary', 'text-light', 'm-1', 'p-2', 'rounded');
            actualizar.innerHTML = `<a href="javascript:actualizar(${element.idjuego})" class="text-light" id="NewUser" >Actualizar </a> `;
            opciones.appendChild(actualizar);

            let eliminar = document.createElement('div');
            eliminar.classList.add('btn', 'bg-danger', 'text-light', 'm-1', 'p-2', 'rounded');
            eliminar.innerHTML = `<a href="#" class="text-light">Eliminar</a>`;
            opciones.appendChild(eliminar);

  
          boxprincipal.appendChild(BoxPlay);
        });
      })
      .catch(error => {
        console.error('Error al obtener los juegos:', error);
      });
  };
  
  listarJuego();
 
  const NuevoJuego= document.getElementById('NewUser')
  NuevoJuego.addEventListener('click',()=>{
    let ModalUser = new bootstrap.Modal(document.getElementById('ModalJuego'), {
        keyboard: false
    })
    
      
      let RegistarJuego = document.getElementById('Registrar')

      RegistarJuego.addEventListener("click",()=>{
        ModalUser.show();
        
       let datos = new FormData() 
        datos.append('nombre',document.getElementById('Nombre').value)
        datos.append('descripcion',document.getElementById('Descripcion').value)
        datos.append('img',document.getElementById('Imagen').files[0])
        datos.append('precio',document.getElementById('Precio').value)

        fetch('http://localhost:3000/juego/registrar',{
            method:'post',
            body:datos
        })
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data)
            listarJuego();
            ModalUser.hide();
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: `${data.message}`
              })
        }) 
        .catch(error => {
          console.error('Error en la solicitud fetch:', error);
          // Posiblemente muestra un mensaje de error al usuario o toma alguna acción adecuada.
      });
      })
  })

  const actualizar = (id)=>{


    let ModalUser = new bootstrap.Modal(document.getElementById('ModalJuegoUpdate'), {
      keyboard: false
  })

    ModalUser.show();
    BuscarJuego(id)
    let Actualizar = document.getElementById('Actualizar')
    Actualizar.addEventListener('click',()=>{
      if (document.getElementById('ImagenUpdate').trim()=="") {
        console.log('Imagen anterior')
      }
    })
    
  }

  const BuscarJuego=(id)=>{
    fetch(`http://localhost:3000/juego/buscar/${id}`,{
      method:'get'
    })
    .then(resp=>resp.json())
    .then(data=>{
      document.getElementById('NombreUpdate').value=data[0].nombre 
      document.getElementById('DescripcionUpdate').value=data[0].descripcion
      document.getElementById('ImagenUpdate').file=data[0].imagen
      document.getElementById('PrecioUpdate').value=data[0].precio      
    })
  }