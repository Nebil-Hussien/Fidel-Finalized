import Cookie from "universal-cookie";
const cookie = new Cookie();
export const role = cookie.get("_role");
let _id;
let isTutor;
let token;
let userData;

if (role === "tutor") {
  isTutor = true;
  token = cookie.get("_tutorIdToken");
  userData = cookie.get("_tutor-data");
} else {
  isTutor = false;
  token = cookie.get("_idToken");
  userData = cookie.get("_user-data");
}

if (userData) {
  _id = userData._id;
}

export { _id, isTutor, token, userData };
