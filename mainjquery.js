/* Eventos */
/* Sección 1 */
//Evento de Botón
 $("#btnPrincipal").click (() =>{
    respuestaClick ();
})

//Funcion general
function respuestaClick(){
respuestaUno();
}
//Funciones secundaria
function respuestaUno () {
 $("body").append(`<div id="hiddenId" style="display: none">
 <h3 id="bienvenidaTrisk">¡Hola, bienvenida/o a Trisk!</h3>
  <p id="textoIngreso">Para continuar, vamos a pedirte que ingreses tus datos en el siguiente formulario</p>
  <div id="imputDiv">
  <form id="formUsuarix">
      <label for="nombre">Nombre</label><br>
      <input type="text" id="nombreUsuarix"><br>
      <label for="apellido">Apellido</label><br>
      <input type="text" id="apellidoUsuarix"><br>
      <label for="fname">País de residencia</label><br>
      <input type="text" id="residenciaUsuarix"><br>
      <button type="button" onclick="seccionDos()" id="submitButton">Siguiente</button>
  </form>
  </div>`
  );
 let borrarBoton= $("#btnPrincipal").fadeOut(200, function (){
  let showHiddenId= $("div").fadeIn(700);
  showHiddenId
 });
  borrarBoton;
}

/* Sección 2 */
//Función General
function seccionDos (){
  obtenerDatosFormulario1()
  respuestaDos ();
}
//Funciones Secundarias
//NOTA: Tuve problemas en esta sección al intentar usar directamente $("#nombreUsuario").value para obtener el valor, la consola me arrojaba undefinied.
function obtenerDatosFormulario1 () {
  const nombre = document.getElementById ("nombreUsuarix").value;
  sessionStorage.setItem("nombreUsuarix", nombre);
  const apellido = document.getElementById ("apellidoUsuarix").value;
  sessionStorage.setItem("apellidoUsuarix", apellido)
  let residencia = document.getElementById ("residenciaUsuarix").value;
  console.log (nombre,apellido,residencia)
}

function respuestaDos(){
  let nombre= sessionStorage.getItem("nombreUsuarix");
  let apellido= sessionStorage.getItem("apellidoUsuarix")
  $("body").append(`<div id="imputDiv" style="display: none">
  <h3 id="saludoUsuarix">Hola ${nombre} ${apellido}.</h3>
  <p id="completarFormulario">Para continuar, por favor completa el siguiente formulario</p>
  <form class="formUsuarix">
      <label for="nombre" id="capIn" >Capital inicial</label><br>
      <input type="number" id="capitalInicial"><br>
      <label for="apellido" id="opDia" >Cantidad de operaciones diarias</label><br>
      <input type="number" id="operacionesDiariasInput" ><br>
      <button type="button" onclick="seccionTres()" id="finishButton">Finalizar</button>
  </form>
  </div>`);
  let borrarBoton2 = $("#submitButton").fadeOut();
  borrarBoton2;
  let borrarFormUsuarix = $("#formUsuarix").fadeOut();
  borrarFormUsuarix;
  let borrarTextoIngreso = $("#textoIngreso").fadeOut();
  borrarTextoIngreso;
  let borrarBienvenidaTrisk = $("#bienvenidaTrisk").fadeOut();
  borrarBienvenidaTrisk;

  let transicion2= $("#submitButton").fadeOut(200, function (){
  let showImputDiv= $("div").fadeIn(700);
  showImputDiv
  });
  transicion2;
}


/* Sección 3 */
//Función General
function seccionTres (){
  obtenerDatosFormulario2 ();
  respuestaTres ();
  }
  
  //Funciones Secundarias
  function obtenerDatosFormulario2 (){
    let capitalInicio = parseFloat(document.getElementById ("capitalInicial").value);
    sessionStorage.setItem("capitalInicio", capitalInicio);
    let cantidadOperacionesDiarias = parseFloat(document.getElementById ("operacionesDiariasInput").value);
    sessionStorage.setItem("cantidadOperacionesDiarias", cantidadOperacionesDiarias);
    console.log (capitalInicio,cantidadOperacionesDiarias)
  
    /* Fórmulas y cálculos  */

  /* Cálculo de indice de riesgo para traders */
  /* Declaración de variable global */
  var capInicial = sessionStorage.getItem("capitalInicio")
  if (capInicial == 0) {
      alert ("Por favor ingrese un número mayor que 0")
  } else { console.log ("Su capital capital inicial es de: " + "$" + (capInicial) )
  };

  /* Cálculo de pérdida diaria */
  let calculoPerdidaDiariaMaxima = (a,b) => {
    return parseFloat ((a*b)/100);
  };
  let perdidaDiariaMaxima= calculoPerdidaDiariaMaxima(capInicial,5);
  sessionStorage.setItem("perdidaDiariaMaxima", perdidaDiariaMaxima);
  console.log ("El monto máximo a operar diariamente es de " +"$"+ perdidaDiariaMaxima +".");

  /* Número de operaciónes diarias */
  let operacionesDiarias = parseFloat (sessionStorage.getItem("cantidadOperacionesDiarias"));
  console.log (operacionesDiarias);

  /* Cálculo del riesgo del capital diario */
  let calculoRiesgoCapitalDiario = (a,b) => {
    return parseFloat ((a/b));
  };
  let riesgoCapitalDiario = calculoRiesgoCapitalDiario (perdidaDiariaMaxima,operacionesDiarias);
  sessionStorage.setItem("riesgoCapitalDiario",riesgoCapitalDiario);
  console.log ("El capital a utilizar en cada operación no puede superar los " +"$"+ riesgoCapitalDiario + " diarios.")
  }
  
  
  function respuestaTres(){
    let nombre= sessionStorage.getItem("nombreUsuarix");
    let apellido= sessionStorage.getItem("apellidoUsuarix")
    let capitalInicio= sessionStorage.getItem("capitalInicio")
    let riesgoCapitalDiario= sessionStorage.getItem("riesgoCapitalDiario")
    let perdidaDiariaMaxima= sessionStorage.getItem("perdidaDiariaMaxima")
    let cantidadOperacionesDiarias= sessionStorage.getItem("cantidadOperacionesDiarias")
  
  
    let parrafoDevolucionDeDatos = $("body").append(
      `<div id="hidden3" style="display: none">
      <h3>Usuarix: ${nombre} ${apellido}</h3>
  
      <li>Tu capital inicial es de ${capitalInicio}</li>
      <li>La cantidad de operaciones diarias que vas a realizar es de ${cantidadOperacionesDiarias}</li>
      <li>El monto máximo a operar diariamente es de $${perdidaDiariaMaxima}</li>
      <li>El capital a utilizar en cada operación no puede superar los $${riesgoCapitalDiario} diarios.</li>
      <div>
      <h4>Gracias por usar Trisk. ¡Buen trading!</h4>
      </div>
      </div>`);

    let borrarCapitalInicial = $("#capitalInicial").fadeOut(800);
    borrarCapitalInicial;
    let borrarCompletarFormulario = $("#completarFormulario").fadeOut(800);
    borrarCompletarFormulario;
    let borrarCapIn = $("#capIn").fadeOut(800);
    borrarCapIn;
    let borrarOpDia = $("#opDia").fadeOut(800);
    borrarOpDia;
    let borrarOperacionesDiariasInput = $("#operacionesDiariasInput").fadeOut(800);
    borrarOperacionesDiariasInput;
    let borrarSaludoUsuarix = $("#saludoUsuarix").fadeOut(800);
    borrarSaludoUsuarix;

    let transicion3= $("#finishButton").fadeOut(800, function (){
      let showHidden3= $("#hidden3").fadeIn(800);
      showHidden3})
      transicion3;
  };
