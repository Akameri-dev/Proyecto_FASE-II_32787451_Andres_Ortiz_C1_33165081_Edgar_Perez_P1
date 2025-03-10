


//vendedor
document.addEventListener('DOMContentLoaded', function() {
    const abrirModal = document.getElementById('abrirModal');
    const modalAnadir = document.getElementById('modalAnadir');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const formAnadir = document.getElementById('formAnadir');
    const listaProductos = document.querySelector('.lista-productos');
    const mensajeExito = document.getElementById('mensajeExito');

    // Abrir modal para añadir productos
    abrirModal.addEventListener('click', function() {
        modalAnadir.style.display = "flex";
    });

    // Cerrar modal
    cerrarModal.addEventListener('click', function() {
        modalAnadir.style.display = "none";
    });

    // Añadir producto
    formAnadir.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombreProducto').value;
        const precio = document.getElementById('precioProducto').value;
        const cantidad = document.getElementById('cantidadProducto').value;
        const imagen = document.getElementById('imagenProducto').value;

        if (nombre && precio && cantidad && imagen) {
            // Crear el elemento del producto
            const productoItem = document.createElement('div');
            productoItem.classList.add('producto-item');

            productoItem.innerHTML = `
                <img src="${imagen}" alt="${nombre}">
                <h3>${nombre}</h3>
                <p>${cantidad} disponibles</p>
                <p>$${precio}</p>
                <button class="cancelar-venta">Cancelar venta</button>
            `;

            // Agregar el producto a la lista
            listaProductos.appendChild(productoItem);

            // Mostrar mensaje de éxito
            mensajeExito.style.display = "block";
            setTimeout(function() {
                mensajeExito.style.display = "none";
            }, 3000);

            // Cerrar el modal
            modalAnadir.style.display = "none";

            // Limpiar el formulario
            formAnadir.reset();
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    // Cancelar venta
    listaProductos.addEventListener('click', function(event) {
        if (event.target.classList.contains('cancelar-venta')) {
            event.target.closest('.producto-item').remove();
        }
    });
});

//Login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const mensajeError = document.getElementById('mensajeError');

    // Cuentas simuladas
    const cuentas = {
        comprador: { usuario: 'seller456', contraseña: 'Intro123', pagina: 'PAGcomprador.html' },
        vendedor: { usuario: 'dancabello', contraseña: 'J5*asdRD.s', pagina: 'PAGvendedor.html' },
        admin: { usuario: 'root', contraseña: 'dochouse', pagina: 'PAGadmin.html' }
    };

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const usuario = loginForm.querySelector('input[name="usuario"]').value;
        const contraseña = loginForm.querySelector('input[name="contraseña"]').value;

        let credencialesCorrectas = false;
        for (const tipo in cuentas) {
            if (cuentas[tipo].usuario === usuario && cuentas[tipo].contraseña === contraseña) {
                credencialesCorrectas = true;
                window.location.href = cuentas[tipo].pagina; // Redirigir a la página correspondiente
                break;
            }
        }

        if (!credencialesCorrectas) {
            mensajeError.textContent = "Cuenta inexistente o en revisión.";
            mensajeError.style.display = "block";
        }
    });
});

// Registro
document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const mensajeError = document.getElementById('mensajeError');
    const mensajeExito = document.getElementById('mensajeExito');
    const modalTarjeta = document.getElementById('modalTarjeta');
    const formTarjeta = document.getElementById('formTarjeta');

    registroForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Obtener los valores del formulario
        const nombre = registroForm.querySelector('input[name="Nombres"]').value;
        const apellido = registroForm.querySelector('input[name="Apellidos"]').value;
        const correo = registroForm.querySelector('input[name="Correo"]').value;
        const contraseña = registroForm.querySelector('input[name="Contraseña"]').value;
        const tipoUsuario = registroForm.querySelector('select[name="TipoUsuario"]').value;


        if (nombre.toLowerCase() === "root") {
            mensajeError.textContent = "Error: El nombre de usuario 'root' ya está ocupado.";
            mensajeError.style.display = "block";
            return; 
        }


        const usuario = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contraseña: contraseña,
            tipoUsuario: tipoUsuario
        };


        localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));


        modalTarjeta.style.display = "block";
    });


    formTarjeta.addEventListener('submit', function(event) {
        event.preventDefault();

    
        const numeroTarjeta = document.getElementById('numeroTarjeta').value;
        const tipoTarjeta = document.getElementById('tipoTarjeta').value;
        const nombreTitular = document.getElementById('nombreTitular').value;

  
        if (!numeroTarjeta || !tipoTarjeta || !nombreTitular) {
            alert("Por favor, complete todos los campos de la tarjeta.");
            return;
        }


        modalTarjeta.style.display = "none";

 
        mensajeExito.textContent = "¡Registro exitoso!";
        mensajeExito.style.display = "block";

        setTimeout(function() {
            window.location.href = 'INIlogin.html';
        }, 3000);
    });
});

// Admin
document.addEventListener('DOMContentLoaded', function () {
    const perfilesContainer = document.getElementById('perfilesContainer');
    const productosContainer = document.getElementById('productosContainer');
    const mensajeError = document.getElementById('mensajeError');

    // Datos simulados de perfiles y productos
    let perfiles = [
        { usuario: 'seller456', contraseña: 'Intro123', tipo: 'Comprador', esPrueba: true },
        { usuario: 'dancabello', contraseña: 'J5*asdRD.s', tipo: 'Vendedor', esPrueba: true },
        { usuario: 'root', contraseña: 'dochouse', tipo: 'Administrador', esPrueba: true },
        { usuario: 'usuario1', contraseña: 'contraseña1', tipo: 'Comprador', esPrueba: false },
        { usuario: 'usuario2', contraseña: 'contraseña2', tipo: 'Vendedor', esPrueba: false },
        { usuario: 'usuario3', contraseña: 'contraseña3', tipo: 'Vendedor', esPrueba: false },
        { usuario: 'usuario4', contraseña: 'contraseña4', tipo: 'Comprador', esPrueba: false },
    ];

let productos = [
    { nombre: 'Eco-Cepillo Dental', imagen: 'Images/eco.jpg' },
    { nombre: 'Botella de Agua Auto-Limpiable', imagen: 'Images/botella.jpg' },
    { nombre: 'Pluma de Borrado Instantáneo', imagen: 'Images/pluma.jpg' },
    { nombre: 'Mochila Solar Cargadora', imagen: 'Images/mochila.jpg' },
    { nombre: 'Audífonos de Traducción Simultánea', imagen: 'Images/audifonos.jpg' },
    { nombre: 'Almohada de Masaje Inteligente', imagen: 'Images/almohada.jpg' },
    { nombre: 'Lámpara de Escritorio con Carga Inalámbrica', imagen: 'Images/lampara.jpg' },
    { nombre: 'Guantes de Realidad Virtual Táctiles', imagen: 'Images/guantes.jpg' },
    { nombre: 'Cámara de Seguridad con Reconocimiento Facial', imagen: 'Images/camara.jpg' },
    { nombre: 'Robot Aspirador con Mapeo Inteligente', imagen: 'Images/robot.jpg' },
    { nombre: 'Bicicleta Eléctrica Plegable', imagen: 'Images/bicicleta.webp' },
    { nombre: 'Reloj Inteligente con Monitor de Sueño', imagen: 'Images/R Inteligente.jpg' },
    { nombre: 'Impresora 3D de Bolsillo', imagen: 'images/Impresora.webp' },
    { nombre: 'Kit de Cultivo Hidropónico Casero', imagen: 'Images/cultivo.jpg' },
    { nombre: 'Drone con Cámara 4K y Estabilización', imagen: 'Images/drone.avif' },
    { nombre: 'Proyector Holográfico Portátil', imagen: 'Images/holografico.jpg' },
    { nombre: 'Mesa de Escritorio Ajustable con Memoria', imagen: 'Images/mesa.jpg' },
    { nombre: 'Silla Ergonómica con Calefacción', imagen: 'Images/silla e.jpg' },
    { nombre: 'Purificador de Aire con Aromaterapia', imagen: 'Images/puruficador.jpg' },
    { nombre: 'Altavoz Inteligente con Pantalla Táctil', imagen: 'Images/altavoz Inteligente.jpg' },
    { nombre: 'Gafas de Realidad Aumentada con GPS', imagen: 'Images/Gafas.webp' },
    { nombre: 'Maleta Inteligente con Seguimiento GPS', imagen: 'Images/maleta Inteligente.jpg' },
    { nombre: 'Cargador Solar Portátil para Laptop', imagen: 'images/cargador solar.jpg' },
    { nombre: 'Teclado Virtual Proyectado', imagen: 'Images/teclado virtual.jpg' },
    { nombre: 'Ratón Ergonómico con Escáner', imagen: 'Images/raton ergonómico.jpg' },
    { nombre: 'Libreta Inteligente con Digitalización', imagen: 'Images/Libreta iteligente.jpeg' },
    { nombre: 'Traductor de Idiomas de Bolsillo', imagen: 'Images/traductor de bolsillo.jpg' },
    { nombre: 'Medidor de Calidad del Aire Portátil', imagen: 'Images/medidor de aire.webp' },
    { nombre: 'Báscula Inteligente con Análisis Corporal', imagen: 'Images/bascula Inteligente.webp' },
    { nombre: 'Dispensador de Comida Inteligente para Mascotas', imagen: 'Images/dispensador de comida I.webp' },
    { nombre: 'Termómetro Inteligente sin Contacto', imagen: 'Images/termometro sin contacto.jpg' },
    { nombre: 'Kit de Primeros Auxilios Inteligente', imagen: 'Images/kit inteligente.jpg' },
    { nombre: 'Candado Inteligente con Huella Dactilar', imagen: 'Images/candado con huella.webp' }

    ];

    // Función para renderizar perfiles
    function renderizarPerfiles() {
        perfilesContainer.innerHTML = ''; // Limpiar el contenedor
        perfiles.forEach((perfil, index) => {
            const perfilItem = document.createElement('div');
            perfilItem.className = 'perfil-item';

            perfilItem.innerHTML = `
                <span>Usuario: ${perfil.usuario} (${perfil.tipo})</span>
                <button onclick="eliminarPerfil(${index})">Eliminar</button>
            `;

            perfilesContainer.appendChild(perfilItem);
        });
    }

    // Función para renderizar productos
    function renderizarProductos() {
        productosContainer.innerHTML = ''; // Limpiar el contenedor
        productos.forEach((producto, index) => {
            const productoItem = document.createElement('div');
            productoItem.className = 'producto-item';

            productoItem.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
                <span>${producto.nombre}</span>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            `;

            productosContainer.appendChild(productoItem);
        });
    }

    // Función para eliminar un perfil
    window.eliminarPerfil = function (index) {
        const perfil = perfiles[index];

        // Verificar si es una cuenta de prueba
        if (perfil.esPrueba) {
            mensajeError.style.display = 'block';
            setTimeout(() => {
                mensajeError.style.display = 'none';
            }, 3000);
        } else {
            if (confirm('¿Estás seguro de eliminar este perfil?')) {
                perfiles.splice(index, 1);
                renderizarPerfiles();
                alert('Perfil eliminado correctamente.');
            }
        }
    };

    // Función para eliminar un producto
    window.eliminarProducto = function (index) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            productos.splice(index, 1);
            renderizarProductos();
            alert('Producto eliminado correctamente.');
        }
    };

    // Renderizar perfiles y productos al cargar la página
    renderizarPerfiles();
    renderizarProductos();
});