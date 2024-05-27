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
    }

    let body = {
        email: email.value.trim(),
        password: password.value.trim()
    };

    try {
        let respuesta = await fetch("/api/sessions/login", {
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body),
            redirect: 'follow' 
        } );
        let datos = await respuesta.json(); //token y usuarioLogueado
        console.log(datos, "Desde linea 27 en login.js");
    } 
    catch(error){
        console.log(error);
    }
    
    try {
        let loguear = await fetch("/products");
        console.log(loguear,"linea 35 loguear");

        if(loguear.ok){
            let datoLoguear = await loguear.json();
            console.log(datoLoguear, "linea 39 en login");
        }
    } 
    catch(error){
        console.log(error)
    }
});