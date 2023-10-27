
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
            <td><a  href="javaScript:elimiarUsuario(${element.idusuario})">Eliminar</a></td>
        </tr>
        `;
        /* href='#' */
        document.getElementById("UserTable").innerHTML=table;
    }); 
   })
   .catch(Error=>{console.log(`Error: ${Error}`)});
   
}
ListarUsuarios();

let ModalUser = new bootstrap.Modal(document.getElementById('ModalUsuario'), {
    keyboard: false
})
let newUser = document.getElementById('NewUser');
newUser.addEventListener("click",()=>{
    ModalUser.show();
    
})
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
/* let eliminacion = document.querySelector('.eliminar');
eliminacion.addEventListener('click',(id)=>{
    console.log('siiii')
}) */
function elimiarUsuario(id) {
fetch(`http://localhost:3000/usuarios/eliminar/${id}`,
    {
        method:'delete'
    }).then(resp=>resp.json)
    .then(data=>{
       /*  ListarUsuarios(); */
        alert(data.message)
    }) 
}
/* fetch(`http://localhost:3000/usuarios/eliminar/${id}`,
    {
        method:'delete'
    }).then(resp=>resp.json)
    .then(data=>{
        ListarUsuarios();
        alert(data.message)
    }) */
   
