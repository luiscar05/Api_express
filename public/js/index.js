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
const VerHome = () => {
    fetch('http://localhost:3000/home', {
        method: 'GET',
        headers: {
            "token": localStorage.getItem('token')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.authorized) {
            window.location.replace('/home');
        } else {
            console.log("No autorizado para acceder a '/home'");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error.message);
    });
};

