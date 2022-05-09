///                                PYRAM (Entrega Final Fernandez Paulino)

///                            Variables globales del codigo

let usuariosDataBase = JSON.parse(localStorage.getItem("usuariosDataBase")) || [];
let arrayCarrito = JSON.parse(sessionStorage.getItem("carritoDataBase")) || [];

let nombreUsuario = "Invitadx";
let contraseña = "";
let email = "";

let arrayReleases = [];
let loggedIn = JSON.parse(sessionStorage.getItem("loginUsuario")) || false;
let userLogged = JSON.parse(sessionStorage.getItem("usrNameLog")) || "";

const logCarrito = () => {return console.log(arrayCarrito)};
const botonCarrito = document.getElementById("btn-carrito");

///                                   Variables dispenser

let quizData = "";
const answerEls = document.querySelectorAll(".answer");

const questionEl = document.getElementById("question");
const quiz = document.getElementById('quiz');
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let idRecomendado = []; // este array junta las respuestas de las preguntas respondidas por el usuario.


///                              Aquí está la funcion de registro.

function NuevoUsuario(email,userName,password){
      this.email = email;
      this.userName = userName;
      this.password = password;
}

function register(){    // Registra al usuario

      email = document.getElementById("email-register").value;
      nombreUsuario = document.getElementById("usr-register").value;
      contraseña = document.getElementById("pass-register").value;
      let repitaContraseña = document.getElementById("pass-repeat").value;

      if (email && nombreUsuario && contraseña && repitaContraseña){
            if(validateMail() == true){
                  if (contraseña == repitaContraseña) {
                        usuariosDataBase.push(new NuevoUsuario(email,nombreUsuario,contraseña));
                        storage();
                        toggleSuccess();
                  }
                  else {
                        $("#err-reg").remove();
                        $("#register-form").append('<h5 id="err-reg"> Las contraseñas ingresadas no coinciden* </h5>');
                        $("#err-reg").effect( "shake", {times:2}, 200 );
                        }
            } else {
                  $("#err-reg").remove();
                  $("#register-form").append('<h5 id="err-reg"> El email ingresado no es valido* </h5>');
                  $("#err-reg").effect( "shake", {times:2}, 200 );
            }
      }
      else if (email === null || nombreUsuario === null || contraseña === null || repitaContraseña === null) {
            nombreUsuario = "Invitadx";
      }
            
}

function validateMail(){ // funcion que chequea si el email ingresado es valido
      
      var regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regx.test(email)){
            // alert("email valido")
            return true
      } else {
            // alert("email no valido")
            return false
      }

}

function showUser(object){    // Crea una bienvenida en el HTML
      
      let usuario = document.createElement("div");
      usuario.id = "div-user"
      usuario.innerHTML =     `
      <a id= "user-welcome"> 
            Bienvenido ${object.userName.toUpperCase()}!
      </a>`;

      $(usuario).hide().appendTo("#barra-superior").fadeIn("slow");   
}

function login(){       // Logea al usuario y cambia el html para que aparezca logout

      nombreUsuario = document.getElementById("usr-login").value;
      contraseña = document.getElementById("pass-login" ).value;
      let validacion = false;
      let loginButton = document.getElementById('login-btn');
      let newButton = document.createElement('a');
      newButton.id = "logout-btn";
      newButton.href = "#";
      newButton.setAttribute("onclick","logout()");
      newButton.innerHTML=`<li>LOGOUT</li>`

      if (nombreUsuario && contraseña){
            for (i=0 ; i < usuariosDataBase.length; i++){
                  if (nombreUsuario == usuariosDataBase[i].userName && contraseña == usuariosDataBase[i].password){
                        loggedIn = true;
                        userLogged = usuariosDataBase[i];
                        storageLogIn();
                        showUser(usuariosDataBase[i]);
                        toggle();
                        loginButton.parentNode.replaceChild(newButton,loginButton);
                        validacion = true;
                        break;
                  } 
            } if (!validacion) {
                  $("#err-log").remove();
                  $("#login-form > div:nth-child(2)").after('<h5 id="err-log"> Usuario o contraseña incorrectos* </h5>');
                  $("#err-log").effect( "shake", {times:2}, 200 );
            }
      }
}

function logout(){      // Deslogea al usuario
      $("#logout-btn").replaceWith(`<a href="#" onclick="toggle()" id="login-btn"><li>LOGIN</li></a>`);
      $("#div-user").remove();
      loggedIn = false;
      storageLogIn();
}

function limpiarInputs(){     // Limpia los parametros de registro y login
      let data1 = document.getElementById("login-form");
      let data2 = document.getElementById("register-form");
      let data3 = document.getElementById("tarjeta-form")
      data1.reset();
      data2.reset();
      data3.reset();
}

//         Chequea si el usuario esta logeado en el localStorage y en tal caso reemplaza el dom con un logout.
$(document).ready(() => {
      let loginButton = document.getElementById('login-btn');
      let newButton = document.createElement('a');
      newButton.id = "logout-btn";
      newButton.href = "#";
      newButton.setAttribute("onclick","logout()");
      newButton.innerHTML=`<li>LOGOUT</li>`

      if (loggedIn == true){
            loginButton.parentNode.replaceChild(newButton,loginButton);
            showUser(userLogged);
      }
})


///                                 BASE DE DATOS BIBLIOTECA

class releases{
      constructor(data){
          this.nameOfRelease = data.nameOfRelease;
          this.nameOfArtist = data.nameOfArtist;
          this.yearOfRelease = data.yearOfRelease;
          this.label = data.label;
          this.typeOfRelease = data.typeOfRelease;
          this.lengthMin = data.lengthMin;
          this.id = data.id;
          this.precio = data.precio;
          this.imagen = data.imagen;
          }
}

class LP extends releases{ /// constructor de LP's
  constructor (nameOfAlbum,
               nameOfArtist,
               yearOfRelease,
               label,
               albumLengthMin,
               id,
               precio,
               imagen,
               numTracks
               ){
  
      super({nameOfRelease: nameOfAlbum,
             nameOfArtist: nameOfArtist,
             yearOfRelease: yearOfRelease,
             label: label,
             typeOfRelease: "LP",
             lengthMin: albumLengthMin,
             id: id,
             precio: precio,
             imagen: imagen})
      this.numTracks = numTracks;
      arrayReleases.push(this);
      }

}
  
class EP extends releases{ //// constructor de EP's
      constructor (nameOfEp,
                   nameOfArtist,
                   yearOfRelease,
                   label,
                   EpLengthMin,
                   id,
                   precio,
                   imagen,
                   numTracks
                   ){
      
          super({nameOfRelease: nameOfEp,
                 nameOfArtist: nameOfArtist,
                 yearOfRelease: yearOfRelease,
                 label: label,
                 typeOfRelease: "EP",
                 lengthMin: EpLengthMin,
                 id: id,
                 precio: precio,
                 imagen: imagen})
          this.numTracks = numTracks;
          }
}
  
class SINGLE extends releases{ /// constructor de Singles

      constructor (nameOfSingle,
                   nameOfArtist,
                   yearOfRelease,
                   label,
                   SingleLengthMin,
                   id,
                   precio,
                   imagen){
      
          super({nameOfRelease: nameOfSingle,
                 nameOfArtist: nameOfArtist,
                 yearOfRelease: yearOfRelease,
                 label: label,
                 typeOfRelease: "SINGLE",
                 lengthMin: SingleLengthMin,
                 id: id,
                 precio: precio,
                 imagen: imagen})
          }
}
  
//                                        RELEASES DATABASE
  

const LP1 = new LP ("Alfredo",
                      "Freddie Gibbs & The Alchemist",
                      2020,
                      "Stones Throw",
                      35,
                      111,
                      "$15",
                      "imagen1",
                      10
);

const LP2 = new LP ("Double Cup",
                      "DJ Rashad",
                      2013,
                      "Hyperdub",
                      56,
                      112,
                      "$30",
                      "imagen2",
                      14
);

const LP3 = new LP ("Sin miedo (del amor y otros demonios)", 
                    "Kali Uchis",
                     2020,
                     "Interscope",
                     34,
                     121,
                     "$20",
                     "imagen3",
                     13,
);

const LP4 = new LP ("Blond",
                    "Frank Ocean",
                     2016,
                     "Boys Don't Cry",
                     60,
                     122,
                     "$20",
                     "imagen4",
                     17,
);

const LP5 = new LP ("L'univers De La Mer",
                    "Dominique Guiot",
                     1978,
                     "Chicago 2000",
                     34,
                     211,
                     "$20",
                     "imagen5",
                     12,
);

const LP6 = new LP ("The Expanding Universe",
                    "Laurie Spiegel",
                     1980,
                     "Philo",
                     45,
                     212,
                     "$24",
                     "imagen6",
                     4,
);

const LP7 = new LP ("XQ YA NO SOMOS + EMO",
                    "Floma & Luiza",
                     2019,
                     "Pista Loleatta",
                     55,
                     221,
                     "$18",
                     "imagen7",
                     20,
);

const LP8 = new LP ("Homework",
                    "Daft Punk",
                     1997,
                     "Virgin",
                     73,
                     222,
                     "$35",
                     "imagen8",
                     16,
);


//                                   INTERACCION CON EL DOM DE LOS RELEASES

arrayReleases.forEach((release) => { //Inserta los discos al HTML y te deja clickearlos
      let nuevoRelease = document.createElement("div");
      let modalRelease = document.createElement("div");
      let releaseFinder = arrayReleases.indexOf(release) + 1
      

      nuevoRelease.innerHTML = `
      <a class= "album" id="release${releaseFinder}">
        <p>${release.nameOfRelease.toUpperCase()}</p>
        <a href="#" onclick="toggleModal(${releaseFinder})">
        <img src="imgs/imagen${releaseFinder}.jpeg" width="200" height="200">
        <p>${release.nameOfArtist}</p>
      </a>
      `;

      modalRelease.innerHTML = `
      <div id ="MODAL${releaseFinder}" class="container">
            <label for="" class="close-btn"><a href="#" onclick="toggleModal(${releaseFinder})">✖</a></label>
            <h3 class="titulo-modal">${release.nameOfRelease}</h3>
            <img id ="IMG${releaseFinder}" class="img-modal" src="imgs/imagen${releaseFinder}.jpeg" width="300" height="300">
            <h4>${release.precio}</h4>
            <button id="${release.id}" class="btn-compra" onclick="toggleModal(${releaseFinder})"> Agregar al carrito </button>
      </div>`
      
      const data = () => {return console.log(release)};
      const pushCarrito = () => {arrayCarrito.push(release)};
      

      $("#libreria-discos").append(nuevoRelease);
      $("#modales-releases").append(modalRelease);
      document.getElementById(`IMG${releaseFinder}`).addEventListener("click", data);
      document.getElementById(`${release.id}`).addEventListener("click", pushCarrito);
      document.getElementById(`${release.id}`).addEventListener("click", storageCarrito);
      document.getElementById(`${release.id}`).addEventListener("click", mostrarCarrito);
      document.getElementById(`${release.id}`).addEventListener("click", precioDom);
      
});

//                                  FUNCIONES PARA BLURREAR MODALS

function toggle(){
      const blur = document.getElementById('blur');
      blur.classList.toggle ('active');
      const LOGIN = document.getElementById('LOGIN');
      LOGIN.classList.toggle ('active')
      $("#err-log").remove();
}

function toggleRegister(){
      const LOGIN = document.getElementById('LOGIN');
      LOGIN.classList.toggle ('active')
      const REGISTER = document.getElementById('REGISTER');
      REGISTER.classList.toggle ('active')
      $("#err-reg").remove();
}

function toggleSuccess(){
      const REGISTER = document.getElementById('REGISTER');
      REGISTER.classList.toggle ('active')
      const regComplete = document.getElementById('msj-reg');
      regComplete.classList.toggle ('active')
}

function toggleContinue(){
      const LOGIN = document.getElementById('LOGIN');
      LOGIN.classList.toggle ('active')
      const regComplete = document.getElementById('msj-reg');
      regComplete.classList.toggle ('active')
}

function toggleModal(modal){

      const blur = document.getElementById('blur');
      blur.classList.toggle ('active');
      let MODAL = document.getElementById(`MODAL${modal}`);
      MODAL.classList.toggle ('active')
}

function toggleDispenser(){
      const blur = document.getElementById('blur');
      blur.classList.toggle ('active');
      const DISPENSER = document.getElementById('quiz');
      DISPENSER.classList.toggle ('active');
}

function toggleMsj(){
      const DISPENSER = document.getElementById('quiz');
      DISPENSER.classList.toggle ('active');
      const msj = document.getElementById('msj-dis');
      msj.classList.toggle ('active');
}

function toggleFin(){
      const PAGO = document.getElementById('PAGO');
      PAGO.classList.toggle ('active');
      const com = document.getElementById('msj-com');
      com.classList.toggle ('active');
}

function toggleCompra(){
      const blur = document.getElementById('blur');
      blur.classList.toggle ('active');
      const PAGO = document.getElementById('PAGO');
      PAGO.classList.toggle ('active');
}

//                                 GUARDAR USUARIO EN LOCAL STORAGE

function storage(){
      localStorage.setItem("usuariosDataBase", JSON.stringify(usuariosDataBase));  
}

//                                 GUARDAR CARRITO EN SESSION STORAGE

function storageCarrito(){
      sessionStorage.setItem("carritoDataBase", JSON.stringify(arrayCarrito));  
}

///                                       CONSOLE LOG CARRITO

$("#btn-carrito").click(logCarrito);

///                                  LIMPIA LOS PARAMETROS DE LAS FORMS
$(".close-btn").click(limpiarInputs);

///                             MOSTRAR EN DOM CARRITO AL CARGAR LA PAGINA

arrayCarrito.forEach((release) => {
      let productoCarrito = document.createElement("div");
      let releaseFinder = arrayCarrito.indexOf(release);
      let imagenRelease = arrayCarrito[releaseFinder].imagen

      productoCarrito.innerHTML= `
      <div id="${arrayCarrito[releaseFinder].id}" class="product">
            <img src="imgs/${imagenRelease}.jpeg" width="80" height="80">
            <div class="title">
                  <span>
                  ${release.nameOfRelease.toUpperCase()} - ${release.nameOfArtist.toUpperCase()}
                  </span>
            </div>  
            <button>
                  <i class="bi bi-x"></i>
            </button>
      </div>
      `;
$("#carrito-cuadro").prepend(productoCarrito);
})

///                           AL AGREGAR UN DISCO AL CARRITO, SUMARLO AL DOM
function mostrarCarrito(){
      let productoCarrito = document.createElement("div");
      let releaseFinder = arrayCarrito.length - 1;
      let imagenRelease = arrayCarrito[releaseFinder].imagen;

      productoCarrito.innerHTML= `
      <div id="${arrayCarrito[releaseFinder].id}" class="product">
            <img src="imgs/${imagenRelease}.jpeg" width="80" height="80">
            <div class="title">
                  <span>
                  ${arrayCarrito[releaseFinder].nameOfRelease.toUpperCase()} - ${arrayCarrito[releaseFinder].nameOfArtist.toUpperCase()}
                  </span>
            </div>  
            <button>
                  <i class="bi bi-x"></i>
            </button>
      </div>
      `;
$("#carrito-cuadro").prepend(productoCarrito);
crucesCarrito();
}

///                                    QUITAR PRODUCTOS DEL CARRITO
function crucesCarrito(){      
      $(".bi-x").click(event => {
                  let nodoPadre = $(event.target).parent().parent();
                  let valorId = parseInt(nodoPadre[0].id);
                  let filteredArray = arrayCarrito.filter((producto) => producto.id !== valorId);
                  arrayCarrito = filteredArray;
                  storageCarrito();
                  nodoPadre.remove();
                  precioDom();
      })
}

//                          Funcion para sumar el valor de los productos del carrito

function precioCarrito(){
      precioTotal = 0;
            for (i=0; i < arrayCarrito.length; i++){
                  let dolar = arrayCarrito[i].precio;
                  let numero = Number(dolar.replace(/[^0-9.-]+/g,""));
                  precioTotal += numero;
            }
            return precioTotal;    
}

//                                  Eventos del boton de compra del carrito
$("#compra button").click(() => {
      if (loggedIn && arrayCarrito.length){
            toggleCompra();
            $("#msj-compra").remove();
            precioCarrito();
      }
      else if (arrayCarrito.length == false){
            $("#msj-compra").remove();
            $("#compra").append(`<h3 id="msj-compra">El carrito se encuentra vacío*</h3>`);
            $(".checkout-button").effect( "shake", {times:4}, 500 );
      }
      else if (loggedIn == false ){
            $("#msj-compra").remove();
            $("#compra").append(`<h3 id="msj-compra"> Por favor, <a href='#' onclick="toggle()">registrese</a> en pyram para comprar*</h3>`);
            $(".checkout-button").effect( "shake", {times:4}, 500 );
      }
});

//                           ESTA FUNCION TOMA LA INFORMACION DE PAGO Y LA VALIDA
function pagar(){

      let nroTarjeta = document.getElementById("tarjeta-nro").value;
      let codigoTarjeta = document.getElementById("codigoTarjeta").value;
      let direccion = document.getElementById("direccion" ).value;
      let codigoPostal = document.getElementById("postal").value;
      
      if (nroTarjeta && codigoTarjeta && direccion && codigoPostal){

            if (nroTarjeta.length != 19){
                  $(".err-com").remove();
                  $("#tarjeta-form > div:nth-child(1)").after('<h5 class="err-com"> El numero de la tarjeta no es válido* </h5>');
                  $(".err-com").effect( "shake", {times:2}, 200 );
            } else if (codigoTarjeta.length != 3){
                  $(".err-com").remove();
                  $("#tarjeta-form > div:nth-child(2)").after('<h5 class="err-com"> El codigo de seguridad no es válido* </h5>');
                  $(".err-com").effect( "shake", {times:2}, 200 );
            } else if (direccion.length < 8){
                  $(".err-com").remove();
                  $("#tarjeta-form > div:nth-child(3)").after('<h5 class="err-com"> La direccion no es válida* </h5>');
                  $(".err-com").effect( "shake", {times:2}, 200 );
            } else if (codigoPostal.length < 3){
                  $(".err-com").remove();
                  $("#tarjeta-form > div:nth-child(4)").after('<h5 class="err-com"> El código postal no es válido* </h5>');
                  $(".err-com").effect( "shake", {times:2}, 200 );
            } else {
                  setTimeout(() => $("#tarjeta-form").submit(), 5000);
                  setTimeout(toggleFin(), 4000);
            }
      }
}

//                           FUNCION PARA ANIMAR EL BOTON DE COMPRA TRAS UNA COMPRA EXITOSA

function animarBotonCompra(){
      $("#compra button").animate({
                 backgroundColor: "#53C353",
                 color: "#fff"
               }, 1400)
           $("#compra button").text(`Gracias por su compra!`);
           arrayCarrito = [];
           $(".product").fadeOut("slow", function(){$(".product").remove()})
           precioDom();
           storageCarrito();
           $(".cart-panel").delay(1600).animate({right: "-560px"}, "slow",function(){
                 $("#compra button").css({
                       backgroundColor: "#333",
                       color: "rgb(136, 135, 135)"
                     }, 2000)
                 $("#compra button").text(`Pagar`)
           })
}

//                                       Eventos al finalizar la compra

$("#cerrar-compra").click(() => {toggleFin(), toggleCompra(), animarBotonCompra(),limpiarInputs()})

//                                FUNCION PARA FORMATEAR EL INPUT DE TARJETA DE CREDITO
$('#tarjeta-nro').keyup(function() {
      var foo = $(this).val().split(" ").join(""); 
      if (foo.length > 0) {
        foo = foo.match(new RegExp('.{1,4}', 'g')).join(" ");
      }
      $(this).val(foo);
});

$('#codigoTarjeta').attr('maxlength', 3);//      FUNCION PARA FORMATEAR EL INPUT DEL CVV DE LA TARJETA DE CREDITO
$('#postal').attr('maxlength', 4);//      FUNCION PARA FORMATEAR EL INPUT DEL CODIGO POSTAL

$(document).ready(crucesCarrito());

//                            FUNCION PARA ACTUALIZAR EL PRECIO DEL CARRITO EN EL DOM
function precioDom(){
      precioCarrito();
      $("#precio-total").text(`PRECIO TOTAL: $${precioTotal} USD`);
}

$([arrayCarrito]).on("arrayChange", precioDom());

//                           Animacion para que aparezca el carrito desde la derecha

$(document).ready(function(){
      $("#btn-carrito").click(function(){
            $("#msj-compra").remove();
            $(".cart-panel").animate({
                  right: "0px"
            }, "slow");
      });
      $("#close-panel").click(function(){
            $(".cart-panel").animate({
                  right: "-560px"
            }, "slow", function(){
                  $("#compra button").css({
                        backgroundColor: "#333",
                        color: "rgb(136, 135, 135)"
                      }, 2000)
                  $("#compra button").text(`Pagar`)
            });
      })
});

//                             MANTENER LOGEADO AL USUARIO MEDIANTE SESSION STORAGE

function storageLogIn(){
sessionStorage.setItem("usrNameLog", JSON.stringify(userLogged));
sessionStorage.setItem("loginUsuario", JSON.stringify(loggedIn));  
}

//                                              DISPENSER APP

// Aplicacion de AJAX, tomas las preguntas de un archivo local JSON  y ejecuta la app

$("#dispenser-btn").click(function tomarPreguntas(){
      const URL_PREGUNTAS = "data/preguntas.json";
      quizData="";
      currentQuiz=0;
      idRecomendado=[];
  
      $.get(URL_PREGUNTAS,(response,status) => {
          if (status === 'success'){
              n=3;
              let randomQuiz = response.sort(() => {return .5 - Math.random()});
              let newQuiz = randomQuiz.slice(0,n);
              quizData = newQuiz;
              loadQuiz();
          }
      })
})

//                             Carga cada pregunta y sus respuestas...

function loadQuiz(){ 
   deselect();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.pregunta;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
}


//                              Revisa cual opcion eligio el usuario...
function getSelected(){

    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    return answer;
}

//                              Limpia los botones presionados en la anterior quiz...
function deselect(){
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

//              A partir de las 3 respuestas del usuario, esta funcion elige un disco para recomendarle
function dispenser(){

    let recomendacion = "";
    let idUsuario = parseInt(idRecomendado.join(""));

    switch (idUsuario)
            {
                case 111: 
                recomendacion = arrayReleases.find(release => release.id === idUsuario);
                console.log(recomendacion);
                break;
                case 112: 
                recomendacion = arrayReleases.find(release => release.id === idUsuario);
                console.log(recomendacion);
                break;
                case 121:
                recomendacion = arrayReleases.find(release => release.id === idUsuario);
                console.log(recomendacion);
                break;
                case 122: 
                recomendacion = arrayReleases.find(release => release.id === idUsuario);
                console.log(recomendacion);
                break;
                case 211: 
                recomendacion = arrayReleases.find(release => release.id === idUsuario);
                console.log(recomendacion);
                break;
                case 212:
                recomendacion = arrayReleases.find(release => release.id === idUsuario);
                console.log(recomendacion);
                break;
                case 221:
                recomendacion = arrayReleases.find(release => release.id === idUsuario);
                console.log(recomendacion);
                break;
                case 222: 
                recomendacion = arrayReleases.find(release => release.id === idUsuario);
                console.log(recomendacion);
                break;
                default: console.log('no funciona');
            }
        carrito(recomendacion);
}

///                                       CARRITO

function carrito(idReleaseUsr){
      let releaseFinder = arrayReleases.indexOf(idReleaseUsr) + 1;
      toggleModal(releaseFinder)
}

///                        EVENTO QUE EJECUTA EL PROCESO A CADA RESPUESTA DEL USUARIO

submitBtn.addEventListener("click", () => {
    // busca la respuesta...
    const answer = getSelected();
    idRecomendado.push(answer);
    
    // si encuentra una respuesta marcada pasa a la siguiente pregunta...
    if(answer) {
        currentQuiz++; 
        if(answer) {
            if(currentQuiz < quizData.length){  

                $("#quiz")
                .animate({left:"-300%"}, "slow", function(){
                    $(this).css({left:"300%"},loadQuiz())
                })
                .animate({left:"50%"}, "fast");

            } else {    // si no hay mas preguntas recomienda un disco al usuario...
                  setTimeout(toggleMsj(), 1000);
                  setTimeout(function(){toggleMsj(),toggleDispenser(),dispenser()}, 2500);
            }
        } 
    }      
})
