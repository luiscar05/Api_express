const ValidarUser = ()=>{
    
    let Datos = new URLSearchParams();
    
    
    Datos.append('correo',document.getElementById('correo').value)
    Datos.append('password',document.getElementById('Password').value)

    fetch('http://localhost:3000/autenticacion/Validar',{
        method: 'post',
        body: Datos
    })
    .then(resp=>resp.json())
    .then(data=>{
        if (data.status==200) {
            alert(data.message)
            localStorage.setItem('token',data.token)
            VerHome();
            /* const RecuperadoToken= localStorage.getItem('token')
            console.log(RecuperadoToken); */
        }else{
            alert(data.message)
        }
        
    }) 

}
const VerHome = ()=>{
    fetch('http://localhost:3000/home',{
        method: 'get',
        headers:{
            "token":localStorage.getItem('token')
        }
    })
    .then(data=>{
        if (data && data.authorized) {
            window.location.href = '/home'; // Redirigir si la respuesta indica que está autorizado
        } else {
            console.log("No autorizado para acceder a '/home'");
        }
        window.location.href='/home'
        /* if (data && data.redirectTo === '/home') {
            window.location.href = data.redirectTo; // Redirigir si la respuesta indica '/Home'
        }  */
    }) 
    .catch(error=>{
        return console.log("error en la solicitud"+ error)
    })
}