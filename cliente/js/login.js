let formLogin= document.querySelector('.LoginForm');
formLogin.addEventListener('submit',(e)=>{
    e.preventDefault();
    const datos = new URLSearchParams();

    datos.append("correo",document.getElementById('correo').value)
    datos.append("password",document.getElementById('Password').value)

    fetch('http://localhost:3000/Aut/Validar'),{
        method:'post',
        body:datos
    }.then(resp=>resp.json())
    .then(data=>{
        console.log(data);
    })
})

