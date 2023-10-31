
function ListarUsuarios (){
   fetch ("http://localhost:3000/usuarios/listar",
   {method:'get'})
   .then(resp=>resp.json())
   .then(data=>{
    let table=''
    data.forEach(element => {
        table += `
        <tr>
            <td>${element.idusuario}</td>
            <td>${element.nombres}</td>
            <td>${element.direccion}</td>
            <td>${element.telefono}</td>
            <td>${element.correo}</td>
            <td>${element.rol}</td>
            <td><a href="javascript:eliminarUsuario(${element.idusuario})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg></a></td>
          <td><a href="javascript:buscar(${element.idusuario})" id='actualizar'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg></a></td>
          
        </tr>
        `;
        /* href='#' */
        document.getElementById("UserTable").innerHTML=table;
    }); 
   })
   .catch(Error=>{console.log(`Error: ${Error}`)});
   
}
ListarUsuarios();


let newUser = document.getElementById('NewUser');
  newUser.addEventListener("click",()=>{
    let ModalUser = new bootstrap.Modal(document.getElementById('ModalUsuario'), {
      keyboard: false
    })
    ModalUser.show();
    let registrar=document.getElementById("RegistrarUser")
registrar.addEventListener("click",()=>{
    let dates = new URLSearchParams();
   dates.append('nombres',document.getElementById('Nombre').value)
   dates.append('direccion',document.getElementById('Direccion').value)
   dates.append('telefono',document.getElementById('Telefono').value)
   dates.append('correo',document.getElementById('email').value)
   dates.append('rol',document.getElementById('rol').value) 
   dates.append('password',document.getElementById('Password').value)

   console.log(dates);
   fetch('http://localhost:3000/usuarios/registrar',
   {
    method:'post',
    body:dates
    })
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data)
        ListarUsuarios();
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
})
})


function eliminarUsuario(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
  
    swalWithBootstrapButtons.fire({
      title: '¿Seguro Deseas Eliminar?',
      icon: 'advertencia',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/usuarios/eliminar/${id}`, {
          method: 'delete'
        }).then(resp => resp.json())
          .then(result => {
            ListarUsuarios();
            Swal.fire({
              title: 'Mensaje',
              text: result.message,
              icon: result.status === 200 ? 'éxito' : result.status === 401 ? 'advertencia' : 'error',
              confirmButtonText: 'Cerrar'
            });
          })
          .catch(error => {
            console.error('Error:', error);
            ListarUsuarios();
            Swal.fire({
              title: 'Mensaje',
              text: 'Hubo un error al eliminar el usuario',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          '¡Tu archivo imaginario está a salvo! :)',
          'error'
        )
      }
    })
} 


const buscar = (id) => {
  let ModalUserUpdate = new bootstrap.Modal(document.getElementById('ModalUsuarioActualizado'), {
    keyboard: false
  })
  ModalUserUpdate.show();

  BuscarUser(id);

  let actualizar = document.getElementById('UserUpdate')
  actualizar.addEventListener('click', (event) => { // Cambiado 'id' a 'event'
    let info = new URLSearchParams()
    
    console.log(info.append('nombres', document.getElementById('Nombre').value))
    console.log(info.append('direccion', document.getElementById('Direccion').value))
    console.log(info.append('telefono', document.getElementById('Telefono').value))
    console.log(info.append('correo', document.getElementById('email').value)) 
    fetch(`http://localhost:3000/usuarios/actualizar/${id}`,{ 
      method: 'put',
      body: info
    }).then(resp => resp.json())
      .then(data => {
        console.log(data)
        ListarUsuarios();
        ModalUserUpdate.hide();
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
  })
}

const BuscarUser= (id)=>{
  fetch(`http://localhost:3000/usuarios/buscar/${id}`,{
      method:'get'
  }) .then(resp=>resp.json())
  .then(data=>{
    console.log(data[0].nombres)
    let buscar=`
            <div class="mb-3">
              <label for="Nombre" class="form-label">Example label</label>
              <input type="text" class="form-control" id="Nombre" placeholder="Ingrese Su Nombre" name="nombres" value='${data[0].nombres}'>
            </div>
            <div class="mb-3">
              <label for="Direccion" class="form-label">Another label</label>
              <input type="text" class="form-control" id="Direccion" placeholder="Ingrese su Direccion" name="direccion"  value='${data[0].direccion}'>
            </div>
            <div class="mb-3">
              <label for="Telefono" class="form-label">Telefonol</label>
              <input type="number" class="form-control" id="Telefono" placeholder="Ingrese su Telefono" name="telefono"  value='${data[0].telefono}'>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Ingrese su email" name="correo"  value='${data[0].correo}'>
            </div>
    `
    
    document.getElementById('busquedas').innerHTML=buscar
    
  })
}


