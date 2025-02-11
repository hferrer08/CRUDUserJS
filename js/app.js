let usuarios = [];

const traerDatos = async () => {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  usuarios = data.users;

  imprimirUsers(usuarios);
  cerrarModal();
};

traerDatos();

const imprimirUsers = (usuarios) => {
  let tbody = document.querySelector("#tablaUsuarios tbody");
  tbody.innerHTML = "";

  usuarios.forEach((usuario) => {
    let fila = `<tr>
        <td>${usuario.id}</td>
        <td>${usuario.firstName}</td>
        <td >${usuario.lastName}</td>
        <td >${usuario.age}</td>
        <td >${usuario.email}</td>
        <td >${usuario.username}</td>
        
        <td>
            <button class="btn btn-sm btn-secondary" onclick="editarUsuario(${usuario.id})"> <i class="bi bi-pencil-square"></i></button>
            <button class="text-danger btn btn-sm" onclick="deleteUser(${usuario.id})"> <i class="bi bi-trash danger"></i></button>
        </td>
    </tr>`;
    tbody.innerHTML += fila;
  });
};



const crearUser = async (nombre, apellido, edad) => {
  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: nombre,
      lastName: apellido,
      age: edad,
    }),
  });
  const data = await res.json();
  // Verificar si la respuesta es un usuario actualizado
  if (data && data.firstName) {
    console.log("Usuario creado:", data);
      //Para que se refleje visualmente el nuevo usuario
    const nuevoUsuario = {
      id: usuarios.length + 1, // Generar un ID ficticio
      firstName: nombre,
      lastName: apellido,
      age: edad,
    };
    
  usuarios.push(nuevoUsuario);
  imprimirUsers(usuarios);
    cerrarModal(); 
  } else {
    console.error("Error al crear el usuario:", data);
  }
};



const updateUser = async (idUser, nombre, apellido, edad) => {
  const res = await fetch(`https://dummyjson.com/users/${idUser}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: nombre,
      lastName: apellido,
      age: edad,
    }),
  });
  const data = await res.json();
  // Verificar si la respuesta es un usuario actualizado
  if (data && data.firstName) {
    console.log("Usuario actualizado:", data);
    
    // Actualizar usuario en memoria y visualmente
  usuarios = usuarios.map(u =>
    u.id === idUser ? { ...u, firstName: nombre, lastName: apellido, age: edad } : u
  );
  imprimirUsers(usuarios);
    cerrarModal(); 
  } else {
    console.error("Error al actualizar el usuario:", data);
  }
};


const deleteUser = async (idUser) => {
  const res = await fetch(`https://dummyjson.com/users/${idUser}`, {
    method: "DELETE",
  });
  const data = await res.json();
  // Verificar si la eliminación fue exitosa
  if (data && data.id) {
    console.log("Usuario eliminado:", data);
    usuarios = usuarios.filter(u => u.id !== idUser); // Eliminar localmente
  imprimirUsers(usuarios);
   
  } else {
    console.error("Error al eliminar el usuario:", data);
  }
};

let usuarioEditarId = null;

const editarUsuario = (id) => {
  // Recuperar los datos del usuario
  document.getElementById("btnNuevoUsuario").style.display = "none";
  document.getElementById("btnEditarUsuario").style.display = "block";
  const usuario = usuarios.find((u) => u.id === id);

  // Rellenar el modal con los datos
  document.getElementById("editFirstName").value = usuario.firstName;
  document.getElementById("editLastName").value = usuario.lastName;
  document.getElementById("editAge").value = usuario.age;

  // Guardar el ID del usuario a editar
  usuarioEditarId = id;

  // Mostrar el modal
  mostrarModal();
};

const guardarEdicion = (e) => {
  e.preventDefault();
  const nombre = document.getElementById("editFirstName").value;
  const apellido = document.getElementById("editLastName").value;
  const edad = document.getElementById("editAge").value;
  
 
    updateUser(usuarioEditarId, nombre, apellido, edad);
  

};

const guardarNuevoUsuario = (e) => {
  e.preventDefault();
  const nombre = document.getElementById("editFirstName").value;
  const apellido = document.getElementById("editLastName").value;
  const edad = document.getElementById("editAge").value;
  
 
    crearUser(nombre, apellido, edad);
  

};

const cerrarModal = () => {
  document.getElementById("modalEditar").style.display = "none";
};

const mostrarModal = () => {
  document.getElementById("modalEditar").style.display = "block";
}

const crearUsuario = () => {
  document.getElementById("editFirstName").value = "";
  document.getElementById("editLastName").value = "";
  document.getElementById("editAge").value = "";
  document.getElementById("btnNuevoUsuario").style.display = "block";
  document.getElementById("btnEditarUsuario").style.display = "none";
  mostrarModal();

};

const btnNuevoUsuario = document.getElementById("btnNuevo");
btnNuevoUsuario.addEventListener("click", crearUsuario);


