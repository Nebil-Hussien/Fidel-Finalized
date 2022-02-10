const jwt = require("jsonwebtoken");

function canUpdateProfile(decodedPhoneNumber, phoneNumber) {
  return +decodedPhoneNumber === +phoneNumber;
}

module.exports = {
  canUpdateProfile,
};
