const loginValid = { email: "admin@admin.com", password: "secret_admin" }; // feito
const emailInvalid = { email: "adminss@admin.com", password: "secret_admin" }; // feito
const emailIvalid2 = { email: "adminadmin.com", password: "secret_admin" }; // feito
const emailVazio = { email: "", password: "secret_admin" };
const passwordInvalid = { email: "admin@admin.com", password: "secret_admissn" };
const passwordVazio = { email: "admin@admin.com", password: "" };
const passwordInvalidLength = {
  email: "admin@admin.com",
  password: "sec",
};

const user = {
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
};

export default {
  loginValid,
  emailInvalid,
  passwordInvalid,
  emailIvalid2,
  emailVazio,
  passwordVazio,
  passwordInvalidLength,
  user,
 };