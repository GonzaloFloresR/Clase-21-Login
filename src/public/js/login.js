let email = document.getElementById("email");
let password = document.getElementById("password");
let submit = document.getElementById("submit");

submit.addEventListener("click", async(e) => {
    e.preventDefault();
    if(email.value.trim().length === 0 || password.value.trim().length === 0 ){
        Swal.fire({
        icon: "error",
        title: "Mmmm 🤔...",
        text: "Debes completar los Email y Password!"
        });
    } else {
        let body = {
            email: email.value.trim(),
            password: password.value.trim()
        };
    let datos = null;
        try {
            let respuesta = await fetch("/api/sessions/login", {
                method:"post",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body),
            } );
            datos = await respuesta.json(); //token y usuarioLogueado
            if(datos.error){console.error(datos.error)}
        } 
        catch(error){
            console.error(error);
        }
    if(datos){
        if(datos.token){
            window.location.href = '/products';
        }
        else { 
            let error = "Correo o Password Errado";
        }
    }   
    }
});