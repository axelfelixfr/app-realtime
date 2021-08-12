import { ValidatedMethod } from "meteor/mdg:validated-method";

Meteor.methods({
  testMethod() {
    console.log("Hola mundo");
    return "Este es un endpoint";
  },
  // Con los Meteor.methods podemos recibir múltiples parámetros
  sum(a, b) {
    return { result: a + b };
  },
  multiplicationTable(n, limit) {
    let table = [];
    for (let i = 1; i <= limit; i++) {
      table.push({
        a: n,
        b: i,
        result: n * i
      });
    }
    return table;
  },
  connectionData() {
    // Con this.unblock() podemos parar la ejecución consecutiva que viene por defecto
    this.unblock();
    // Para saber si existe un usuario autentificado podemos usar this.userId que almacena el id del usuario
    if (this.userId) {
      console.log("El usuario esta logueado");
      // Con Meteor.user() nos devuelve dicho usuario
      Meteor.user();
    } else {
      console.log("El usuario no esta logueado");
    }
    console.log("Context method: ", this);
  },
  // También podemos realizar metodos asincronos
  async delayFunction() {
    let delayMessage = "before";
    // Para ellos usamos async/await
    await new Promise(resolve => {
      // Creamos una nueva promesa que espere la petición asincrona
      setTimeout(() => {
        delayMessage = "after";
        // El resolve() ejecuta una vez resulta la petición
        resolve(1);
      }, 2000);
    });
    // Regresa el valor de delayMessage
    return delayMessage;
  }
});

// Con los ValidatedMethods podemos validar los metodos que se crean
// ValidatedMethod es un paquete de meteor, para instalarlo usamos "meteor add mdg:validated-method"
new ValidatedMethod({
  // Su nombre para colocarlo en la petición
  name: "multiplication",
  // Su validación
  validate({ a, b }) {
    // check es un paquete de meteor, para instalarlo usamos "meteor add check"
    check(a, Number); // Comprobamos que el parámetro a sea un número
    check(b, Number); // Comprobamos que el parámetro b sea un número
  },
  // Con los ValidatedMethods solamente podemos hacer uso de un parámetro en las peticiones
  run({ a, b }) {
    // Nos regresa el resultado de multiplicar a por b
    return { result: a * b };
  }
});
