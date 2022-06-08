const { Client } = require("pg");
const args = process.argv.slice(2);
const typeFuncion = args[0];

// Realizar la conexión con PostgreSQL con la clase Client.
const config = {
  user: "",
  host: "localhost",
  database: "class",
  password: "",
  port: 5432
};

let client;
// Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
const newStudent = async (rut, name, grade, level) => {
  client = new Client(config);
  await client.connect();
  const res = await client.query(
    `INSERT INTO student (rut, name, grade, level) VALUES (${rut}, ${name}, ${grade}, ${level}) RETURNING *`
  );
  console.log("newStudent", res);
  console.log(`estudiante ${name} creado con exito`);
  await client.end();
};
// Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
const getStudent = async (rut) => {
  client = new Client(config);
  await client.connect();
  const q = `SELECT rut, name, grade, level FROM students WHERE rut = ${rut}`;
  const res = await client.query(q);
  console.log("registro actual: ", res);
  await client.end();
};
// Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
const allStudents = async () => {
    client = new Client(config);
    await client.connect();
    const q = "SELECT rut, name, grade, level FROM student";
    const res = await client.query(q);
    console.log("Todos los estudiantes: ", res);
    await client.end();
  };

//   Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
const update = async (rut, name, grade, level) => {
  client = new Client(config);
  await client.connect();
  const q = `UPDATE student SET name = ${name}, level = '${level}', grade = '${grade}' WHERE rut = ${rut} RETURNING *`;
  const res = await client.query(q);
  console.log(`estudiante ${name} modificado con exito`);
  await client.end();
};

// Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
const destroy = async (rut) => {
  client = new Client(config);
  await client.connect();

  const q = `DELETE FROM student WHERE rut = ${rut}`;
  const res = await client.query(q);
  console.log(`estudiante con rut ${rut} eliminado`);
  await client.end();
};

if (typeFuncion == "newStudent") {
  newStudent(args[1], args[2], args[3], args[4]);
} else if (typeFuncion == "getStudent") {
  getStudent(args[1]);
} else if (typeFuncion == "allStudents") {
  allStudents();
} else if (typeFuncion == "update") {
  update(args[1], args[2], argGrade[3], args[4]);
} else if (typeFuncion == "destroy") {
  destroy(args[1]);
}