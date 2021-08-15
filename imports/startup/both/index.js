import { Accounts } from "meteor/accounts-base";

// Configuración para la expiración del login
Accounts.config({
  loginExpirationInDays: 15
});
