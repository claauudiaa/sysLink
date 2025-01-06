
let Usuario_Logueado = {};

function fOcultarModal() {
    document.querySelector('#div_modal').style.display = 'none';
}

function fOcultarForm() {
    document.querySelector('#div_form_afiliados').style.display = 'none';
    document.querySelector('#div_afiliados').style.display = 'flex';
}

function fInicio() {
    let sql = "SELECT servicios.serv_id, servicios.serv_nombre, afiliados.af_nombre, afiliados.af_apellidos, afiliados.af_provincia, afiliados_servicios.as_precio FROM servicios LEFT JOIN afiliados_servicios ON afiliados_servicios.as_serv_id = servicios.serv_id LEFT JOIN afiliados ON afiliados.af_id = afiliados_servicios.as_af_id";
    let URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let html = "";
            data.datos.forEach(item => {
                html += `<div id='contenedor_servicio'>`;
                html += `<div id='cont_nservicio'>${item.serv_nombre}</div>`; // Aquí metemos el nombre del servicio
                html += `<div id='cont_afiliado'>${item.af_nombre}&nbsp${item.af_apellidos}</div>`; // Aquí el nombre y apellido del afiliado
                html += `<div id='cont_provincia'>${item.af_provincia}</div>`; // Aquí la provincia del afiliado
                html += `<div id='cont_precio'>${item.as_precio}€</div>`; // Aquí el precio del servicio
                html += `<div id='btn_contratar' onclick='fContratar(${item.serv_id})'>Contratar servicio</div>`; // Este es el botón de contratar
                html += `</div>`;
            });
            document.querySelector("#div_servicios").innerHTML = html;
        })
}

function fAbrirLogin() {
    document.querySelector("#div_buscar").style.display = "none";
    document.querySelector("#div_servicios").style.display = "none";
    document.querySelector("#div_modal").style.display = "flex";
    document.querySelector("#btn_login").style.display = "none";
    document.querySelector("#div_registro").style.display = "none";
    document.querySelector("#div_login").style.display = "flex";
}

function fAbrirRegistro() {
    document.querySelector("#div_registro").style.display = "flex";
    document.querySelector("#div_login").style.display = "none";
}

function fLogin() {
    
    let nombre = document.querySelector("#login_nombre").value;
    let password = document.querySelector("#login_password").value;

    let sql = "Select * from usuarios where usu_nombre = '" + nombre + "' and usu_password = '" + password + "'";
    let URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {

            if (data.datos.length == 0) {
                document.querySelector("#div_error").innerHTML = "Incorrecto, pruebe otra vez";
                return;
            } else {
                Usuario_Logueado = data.datos[0];
                console.log("Usuario Logueado ", Usuario_Logueado)
                fOcultarModal();
                document.querySelector("#div_buscar").style.display = "flex";
                document.querySelector("#div_servicios").style.display = "flex";
                document.querySelector("#btn_servicios").style.display = "block";

                if (Usuario_Logueado.usu_admin == 1) {
                    document.querySelector("#btn_afiliados").style.display = "block";
                }
            }
        })
}

function fRegistrar() {
    let nombre = document.querySelector("#registro_nombre").value;
    let password = document.querySelector("#registro_password").value;
    let rpassword = document.querySelector("#registro_rpassword").value;
    let apellidos = document.querySelector("#registro_apellidos").value;
    let dni = document.querySelector("#registro_dni").value;
    let domicilio = document.querySelector("#registro_domicilio").value;

    let sql = "INSERT INTO usuarios (usu_nombre, usu_apellidos, usu_password, usu_dni, usu_domicilio, usu_admin) VALUES ('" + nombre + "', '" + apellidos + "', '" + password + "', '" + dni + "', '" + domicilio + "', 0)";


    // Password no coinciden
    if (password != rpassword) {
        document.querySelector("#div_error_registro").innerHTML = "Las contraseñas no coinciden"
        return;
    }

    // Password coinciden
    let URL = "assets/php/servidor.php?peticion=EjecutarInsert&sql=" + sql;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
        })

    fAbrirLogin();
}

function fContratar(id_servicio) {
    if (Usuario_Logueado.usu_nombre === undefined) {
        fAbrirLogin();
    } else {
        document.querySelector("#div_confirmacion").style.display = "flex";
        let confirmarBtn = document.querySelector("#div_confirmacion input[value='Confirmar']");
        confirmarBtn.onclick = function () {

            let sql = "INSERT INTO usuarios_servicios (us_usu_id, us_serv_id) VALUES ('" + Usuario_Logueado.usu_id + "', '" + id_servicio + "')";
            let URL = "assets/php/servidor.php?peticion=EjecutarInsert&sql=" + sql;

            fetch(URL)
                .then((response) => response.json())
                .then((data) => {
                    document.querySelector("#div_confirmacion").style.display = "none";
                });
        };

        // Acción de cancelar
        let cancelarBtn = document.querySelector("#div_confirmacion input[value='Cancelar']");
        cancelarBtn.onclick = function () {
            document.querySelector("#div_confirmacion").style.display = "none";
        };
    }
}

function fAfiliados() {

    document.querySelector("#div_buscar").style.display = "none";
    document.querySelector("#div_servicios").style.display = "none";
    document.querySelector("#div_afiliados").style.display = "flex"
    document.querySelector("#btn_afiliados").style.display = "none"
    document.querySelector("#btn_servicios").style.display = "none"


    let sql = "SELECT * FROM afiliados LEFT JOIN afiliados_servicios AS as_serv ON afiliados.af_id = as_serv.as_af_id LEFT JOIN servicios ON as_serv.as_serv_id = servicios.serv_id"
    let URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let html = "";
            html += "<div id='div_agregar_afiliados'>"
            html += "<p>Agregar afiliado</p>"
            html += `<i onclick="PreparaFormAfiliado('a', 0, '', '', '', '')" class="fas fa-plus" title="Añadir afiliado"></i>`
            html += "</div>"

            html += "<table class='tabla_afiliados'>";
            html += "<thead>";
            html += "<tr><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Provincia</th><th>Servicio</th><th>Acciones</th></tr>";
            html += "</thead><tbody>";

            // Rellenar la tabla con los datos
            data.datos.forEach(item => {
                html += `<tr>
                            <td>${item.af_id}</td>
                            <td>${item.af_nombre}</td>
                            <td>${item.af_apellidos}</td>
                            <td>${item.af_provincia}</td>
                            <td>${item.serv_nombre}</td>
                            <td>
                                <i onclick="PreparaFormAfiliado('b', ${item.af_id}, '${item.af_nombre}', '${item.af_apellidos}', '${item.af_provincia}', '${item.serv_nombre}')" class="fas fa-trash" title="Borrar afiliado"></i>
                                <i onclick="PreparaFormAfiliado('m', ${item.af_id}, '${item.af_nombre}', '${item.af_apellidos}', '${item.af_provincia}', '${item.serv_nombre}')" class="fas fa-edit" title="Modificar afiliado"></i>
                            </td>
                          </tr>`;
            });

            html += "</tbody></table>";
            document.querySelector("#div_afiliados").innerHTML = html;
        })
}

function PreparaFormAfiliado(para_que, id, nombre, apellidos, provincia, servicio) {
    document.querySelector("#div_form_afiliados").style.display = "flex"
    document.querySelector("#div_afiliados").style.display = "none"

    document.querySelector("#afiliado_id").value = id;
    document.querySelector("#afiliado_nombre").value = nombre;
    document.querySelector("#afiliado_apellidos").value = apellidos;
    document.querySelector("#afiliado_provincia").value = provincia;
    document.querySelector("#afiliado_servicio").value = servicio;

    // Analizar para_que
    if (para_que == 'a') {
        document.querySelector("#afiliado_A").style.display = 'block';
        document.querySelector("#afiliado_M").style.display = 'none';
        document.querySelector("#afiliado_B").style.display = 'none';
    }
    if (para_que == 'b') {
        document.querySelector("#afiliado_A").style.display = 'none';
        document.querySelector("#afiliado_M").style.display = 'none';
        document.querySelector("#afiliado_B").style.display = 'block';
    }
    if (para_que == 'm') {
        document.querySelector("#afiliado_A").style.display = 'none';
        document.querySelector("#afiliado_M").style.display = 'block';
        document.querySelector("#afiliado_B").style.display = 'none';
    }

}

function fCRUDAfiliados(operacion) {
    let sql = ``;
    let id = document.querySelector("#afiliado_id").value;
    let nombre = document.querySelector("#afiliado_nombre").value;
    let apellidos = document.querySelector("#afiliado_apellidos").value;
    let provincia = document.querySelector("#afiliado_provincia").value;
    let servicio = document.querySelector("#afiliado_servicio").value;

    if (operacion == 'a') {
        sql = `INSERT INTO afiliados (af_nombre, af_apellidos, af_provincia) VALUES ('${nombre}', '${apellidos}', '${provincia}')`;
    }
    if (operacion == 'm') {
        sql = `UPDATE afiliados SET af_nombre = '${nombre}', af_apellidos = '${apellidos}', af_provincia = '${provincia}' WHERE af_id = '${id}'`;
    }
    if (operacion == 'b') {
        sql = `DELETE FROM afiliados WHERE af_id = ${id}`;

    }
    // Enviar el sql al servidor
    let URL = "assets/php/servidor.php?";
    if (operacion == 'a') {
        URL += "peticion=EjecutarInsert";
    } else {
        URL += "peticion=EjecutarUpdateDelete";
    }
    URL += "&sql=" + sql;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {

        })
        .finally(() => {
            fOcultarForm();
            fAfiliados();
        });
}

function fMisServicios() {
    document.querySelector("#div_buscar").style.display = "none";
    document.querySelector("#div_servicios").style.display = "none";
    document.querySelector("#btn_servicios").style.display = "none";
    document.querySelector("#btn_afiliados").style.display = "none";
    document.querySelector("#div_mis_servicios").style.display = "flex";

    let sql = "select * from servicios, usuarios, usuarios_servicios, afiliados_servicios, afiliados where us_usu_id = usu_id and us_serv_id = serv_id and as_af_id = af_id and as_serv_id = serv_id and usu_id = '" + Usuario_Logueado.usu_id + "'";
    let URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let html = "";

            html += "<table class='tabla_servicios'>";
            html += "<thead>";
            html += "<tr><th>ID</th><th>Servicio contratado</th><th>Responsable</th><th>Provincia</th><th>Precio</th><th>Acciones</th></tr>";
            html += "</thead><tbody>";

            // Rellenar la tabla con los datos
            data.datos.forEach(item => {
                html += `<tr>
                            <td>${item.serv_id}</td>
                            <td>${item.serv_nombre}</td>
                            <td>${item.af_nombre}&nbsp${item.af_apellidos}</td>
                            <td>${item.af_provincia}</td>
                            <td>${item.as_precio}</td>
                            <td>
                                <i onclick="fConfirmar('${item.serv_id}')" class="fas fa-trash" title="Borrar servicio contratado"></i>
                            </td>
                          </tr>`;
            });

            html += "</tbody></table>";
            document.querySelector("#div_mis_servicios").innerHTML = html;
        })
}

function fConfirmar(id_servicio) {
    document.querySelector("#div_confirmacion").style.display = "flex";
    let confirmarBtn = document.querySelector("#div_confirmacion input[value='Confirmar']");
    confirmarBtn.onclick = function () {

        let sql = "DELETE FROM usuarios_servicios WHERE us_serv_id = '" + id_servicio + "'";
        let URL = "assets/php/servidor.php?peticion=EjecutarUpdateDelete&sql=" + sql;

        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                document.querySelector("#div_confirmacion").style.display = "none";
            });
    };

    let cancelarBtn = document.querySelector("#div_confirmacion input[value='Cancelar']");
    cancelarBtn.onclick = function () {
        document.querySelector("#div_confirmacion").style.display = "none";
    };
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buscador").addEventListener("input", function () {
        const filtro = this.value.toLowerCase(); 
        const servicios = document.querySelectorAll("#div_servicios > #contenedor_servicio"); 

        servicios.forEach(servicio => {
            const nombreServicio = servicio.querySelector("#cont_nservicio").textContent.toLowerCase(); 
            if (nombreServicio.includes(filtro)) {
                servicio.style.display = "flex";
            } else {
                servicio.style.display = "none";
            }
        });
    });
});

