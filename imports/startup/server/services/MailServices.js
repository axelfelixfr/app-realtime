import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
// "MAIL_URL": "smtp://apps.frontendweb:petsounds1966@smtp.gmail.com:587",
if (Meteor.isDevelopment) {
  if (Meteor.settings.private?.SENDER_EMAILS) {
    process.env.EMAIL_SERVICES = Meteor.settings.private.SENDER_EMAILS.SERVICES;
  } else {
    console.warn("Sender emails are not configured. Emails will not be send");
  }
}

const appName = "App Meteor Vue";
const email = `<${process.env.EMAIL_SERVICES}>`;
const from = `${appName} ${email}`;

const emailEnrollAccount = "email_enroll_account.html";
const productSrc = "http://localhost:3000/img/vue-meteor.png";

Accounts.emailTemplates.siteName = appName;
Accounts.emailTemplates.from = from;
const emailTemplates = Accounts.emailTemplates;
emailTemplates.enrollAccount = {
  subject() {
    return `Bienvenida a ${appName}`;
  },
  // user son los usuarios que crearan una cuenta o pediran cambio de correo electrónico
  // url sera la vista que le pasaremos por el correo para acceder a poner contraseña o cambio de correo
  html(user, url) {
    // Debemos quitar las "#" ya que en Vue, tenemos el modo history
    const urlWithoutHash = url.replace("#/", "");
    // Solo se podrá acceder a esta información si se esta en modo desarrollador
    if (Meteor.isDevelopment)
      console.info("Set initial password link:", urlWithoutHash);
    // SSR.compileTemplate() forma parte de la clase "ssrService" que es para que se rendericen vistas del lado del servidor
    SSR.compileTemplate(
      "emailEnrollAccount",
      Assets.getText(emailEnrollAccount)
    );
    console.log(
      SSR.compileTemplate(
        "emailEnrollAccount",
        Assets.getText(emailEnrollAccount)
      )
    );
    return SSR.render("emailEnrollAccount", {
      urlWithoutHash,
      productSrc
    });
  }
};

if (Meteor.isDevelopment) {
  if (Meteor.settings.private?.MAIL_URL) {
    process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
  } else {
    console.warn("Email settings are not configured. Emails will not be send");
  }
}
