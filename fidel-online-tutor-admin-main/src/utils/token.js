import Cookie from "universal-cookie";
const cookie = new Cookie();
export const token = cookie.get("_adminIdToken");
export const adminData = cookie.get("_admin-data");
