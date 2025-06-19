export const responses = {
  noSession: { ok: false, detail: "No hay sesión iniciada" },
  invalidToken: { ok: false, detail: "El token ha expirado", tokenExpired: true },
  sessionClosed: { ok: true, detail: "Sesión cerrada exitosamente" },
  userExists: { ok: false, detail: "Nombre de usuario ya registrado" },
  userCreated: { ok: true, detail: "Usuario ingresado" },
  userNotFound: { ok: false, detail: "Usuario no registrado" },
  invalidPassword: {
    ok: false,
    detail: "Usuario o contraseña incorrecta",
  },
  loginSuccess: { ok: true, detail: "Inicio de sesión exitoso" },
  loginFailed: { ok: false, detail: "No se pudo iniciar sesión" },
};