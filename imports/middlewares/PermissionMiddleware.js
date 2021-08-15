import { Roles } from "meteor/alanning:roles";

// Middleware para checar permisos de diferentes acciones
export class PermissionMiddleware extends PublishMiddleware {
  // Se contruye el constructor con permisos de super()
  constructor(permissions) {
    super();
    this._permissions = permissions;
  }

  added(publish, collection, id, fields) {
    if (publish.userId) {
      return super.added(...arguments);
    }
    return publish.ready();
  }

  changed(publish, collection, id, fields) {
    if (this.checkPermission(publish.userId)) {
      return super.changed(...arguments);
    }
    return publish.ready();
  }

  removed(publish, collection, id) {
    if (this.checkPermission(publish.userId)) {
      return super.removed(...arguments);
    }
    return publish.ready();
  }

  onReady(publish) {
    if (publish.userId) {
      return super.onReady(...arguments);
    }
    return publish.ready();
  }

  onStop(publish) {
    if (publish.userId) {
      return super.onStop(...arguments);
    }
    return publish.ready();
  }

  onError(publish, error) {
    if (publish.userId) {
      return super.onError(...arguments);
    }
    return publish.ready();
  }

  // checkPermission para checar los permisos dependiendo de su pefile
  checkPermission(idUser) {
    const profileName = Roles.getScopesForUser(idUser)[0];
    return Roles.userIsInRole(idUser, this._permissions, profileName);
  }
}
