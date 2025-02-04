/* const imprimirUsers = () => {
    fetch("https://dummyjson.com/users")
    .then(res => res.json())
    .then(data => console.log(data));
} */

    let usuarios = [];

const traerDatos = async () => {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  usuarios = data.users;

  imprimirUsers(usuarios);
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
        <td >${usuario.image}</td>
        <td>
            <button onclick="editarUsuario(${usuario.id})"> Editar</button>
            <button onclick="deleteUser(${usuario.id})"> Eliminar</button>
        </td>
    </tr>`;
    tbody.innerHTML += fila;
  });
};

/* const imprimirUserPorId = (idUser) => {
    fetch("https://dummyjson.com/users/"+idUser.toString())
    .then(res => res.json())
    .then(data => console.log(data));
} */

const imprimirUserPorId = async (idUser) => {
  const res = await fetch(`https://dummyjson.com/users/${idUser}`);
  const data = await res.json();
  console.log(data);
};

/* const crearUser = (nombre, apellido, edad) => {
  fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: nombre,
      lastName: apellido,
      age: edad,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}; */

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
  const usuarios = data.users;

  imprimirUsers(usuarios);
};

/* const UpdateaUser = (nombre, apellido, edad) => {
  fetch("https://dummyjson.com/users/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: nombre,
      lastName: apellido,
      age: edad,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}; */

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
    
    traerDatos();
    cerrarModal(); 
  } else {
    console.error("Error al actualizar el usuario:", data);
  }
};

/* const deleteUser = (idUser) => {
  fetch("https://dummyjson.com/users/" + idUser.toString(), {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}; */

const deleteUser = async (idUser) => {
  const res = await fetch(`https://dummyjson.com/users/${idUser}`, {
    method: "DELETE",
  });
  const data = await res.json();
  // Verificar si la eliminación fue exitosa
  if (data && data.id) {
    console.log("Usuario eliminado:", data);
    traerDatos();
    cerrarModal();
  } else {
    console.error("Error al eliminar el usuario:", data);
  }
};

let usuarioEditarId = null;

const editarUsuario = (id) => {
  // Recuperar los datos del usuario
  const usuario = usuarios.find((u) => u.id === id);

  // Rellenar el modal con los datos
  document.getElementById("editFirstName").value = usuario.firstName;
  document.getElementById("editLastName").value = usuario.lastName;
  document.getElementById("editAge").value = usuario.age;

  // Guardar el ID del usuario a editar
  usuarioEditarId = id;

  // Mostrar el modal
  document.getElementById("modalEditar").style.display = "block";
};

const guardarEdicion = () => {
  const nombre = document.getElementById("editFirstName").value;
  const apellido = document.getElementById("editLastName").value;
  const edad = document.getElementById("editAge").value;

  updateUser(usuarioEditarId, nombre, apellido, edad);
};

const cerrarModal = () => {
  document.getElementById("modalEditar").style.display = "none";
};
