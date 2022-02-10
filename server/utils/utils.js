const bcrypt = require("bcrypt");
const validator = require("email-validator");
const passwordValidator = require("password-validator");
const schema = new passwordValidator();
const sharp = require("sharp");
const { defaultPageSize } = require("../constants/constants");
const _ = require("lodash");
// const validator = require("email-validator");
// const passwordValidator = require("password-validator");
// const schema = new passwordValidator();
const { jwt, SECRET_KEY } = require("../auth/index");

const generateHashedPassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (e) {
    return e;
  }
};

const checkPassword = (input_password, user_password) => {
  if (input_password != null && user_password != null) {
    try {
      const hashedPassword = bcrypt.compareSync(input_password, user_password);
      return hashedPassword;
    } catch (e) {
      return e;
    }
  }
};

const validateEmail = (email) => {
  const isEmail = validator.validate(email);
  return isEmail;
};
const validatePassword = (password) => {
  return schema.is().min(8);
};

const checkNull = (...args) => {
  for (const data of args) {
    if (!data) return false;
  }
  return true;
};

const resizeImage = async (image, width, height) => {
  const compressedImage = await sharp(image?.buffer)
    .resize(width, height, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat("jpeg")
    .toBuffer();
  return compressedImage.toString("base64");
};
const paginate = (page, page_size) => {
  let pageSize = page_size != null ? page_size : defaultPageSize;
  const offset = +page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};

const isEmpty = (data) => {
  if (data != null) {
    if (data instanceof Object) {
      if (_.isEmpty(data)) {
        return true;
      } else {
        return false;
      }
    } else if (data instanceof String) {
      if (data.trim() === "") {
        return true;
      } else {
        return false;
      }
    } else if (data instanceof Array) {
      if (data.length <= 0) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
};

async function JwtToken(payload, secretKey, expiresIn) {
  let token;
  if (expiresIn) {
    token = await jwt.sign(payload, secretKey, {
      expiresIn: expiresIn,
    });
  } else {
    token = await jwt.sign(payload, secretKey, {});
  }
  return token;
}
const calculateRating = (rating) => {
  const total = rating.reduce((prev, current) => {
    return prev + current;
  }, 0);

  if (total === 0) {
    return 0;
  }

  return Number(total / rating.length.toFixed(1));
};
module.exports = {
  JwtToken,
  isEmpty,
  paginate,
  generateHashedPassword,
  checkPassword,
  checkNull,
  validateEmail,
  validatePassword,
  resizeImage,
  calculateRating,
};
