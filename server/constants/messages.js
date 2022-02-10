const DATA_MISSING = "Missing data in request";
const USER_ALREADY_REGISTERED = "User already registered";
const SUCCESS = "Success";
const ERROR_OCCURRED = "Error Occurred";
const USER_NOT_FOUND = "User not found";
const INVALID_EMAIL_OR_PASSWORD = "Incorrect Email or Password";
const INCORRECT_PASSWORD = "Password Incorrect";
const INVALID_LOGIN = "Invalid Login";
const PASSWORD_LENGTH_ERROR =
  "Password length must be greater than or equal to 8";
const INVALID_EMAIL = "Email address must be valid";
const SPECIFY_AUTH_TYPE = "Please specify authentication type";
const NO_DATA = "No data found";
const NO_AUTHORIZATION_TOKEN_FOUND = "No Authorization token found";
const AUTHORIZATION_ERROR = "Authorization Error";
const NO_PERMISSION = "You don't have permission to perform this action.";
const CAN_NOT_BE_NULL = "can't be empty";
const NO_EMAIL = `Email ${CAN_NOT_BE_NULL}`;
const NO_PASSWORD = `Password ${CAN_NOT_BE_NULL}`;
const NO_FIRST_NAME = `First name ${CAN_NOT_BE_NULL}`;
const NO_LAST_NAME = `LAST name ${CAN_NOT_BE_NULL}`;
const NO_SITE_NAME = `Site name ${CAN_NOT_BE_NULL}`;
const NO_BLOCK_NUMBER = `Block number ${CAN_NOT_BE_NULL}`;
const NO_HOUSE_NUMBER = `House number ${CAN_NOT_BE_NULL}`;
const NO_PHONE_NUMBER = `Phone number ${CAN_NOT_BE_NULL}`;
const NO_USER_ID = `user_id ${CAN_NOT_BE_NULL}`;
const NO_SERVICE_NAME = `Service name ${CAN_NOT_BE_NULL}`;
const SERVICE_NOT_FOUND = "Service not found";
const NO_SERVICE_CATEGORY_NAME = `Service category name ${CAN_NOT_BE_NULL}`;
const NO_SERVICE_CATEGORY_FOUND = `Service category not found`;
const NO_SERVICE_ID = `Service Id ${CAN_NOT_BE_NULL}`;
const NO_SERVICE_CATEGORY_ID = `Service Category Id ${CAN_NOT_BE_NULL}`;
const DUPLICATE_SERVICE = "You have already added this service.";

const NO_LATITUDE_ADDRESS = `Latitude ${CAN_NOT_BE_NULL}`;
const NO_LONGITUDE_ADDRESS = `Longitude ${CAN_NOT_BE_NULL}`;
const NO_SERVICE_PROVIDER_ADDRESS = `Service Provider Address ${CAN_NOT_BE_NULL}`;
const NO_NEARBY_SERVICE_PROVIDER = `Can't find any nearby service provider`;
const NO_SERVICE_PROVIDER_FOUND = `No Service Provider Found`;
const NO_ADDRESS = `Address ${CAN_NOT_BE_NULL}`;
const NO_PRICE_RANGE_FROM = ` Price range from  ${CAN_NOT_BE_NULL}`;
const NO_PRICE_RANGE_TO = ` Price range to  ${CAN_NOT_BE_NULL}`;
const NO_TIME_RANGE_FROM = ` Time range from  ${CAN_NOT_BE_NULL}`;
const NO_TIME_RANGE_TO = ` Time range to  ${CAN_NOT_BE_NULL}`;
const NO_DESCRIPTION = `Description ${CAN_NOT_BE_NULL}`;

const NO_ORDER_ID = `Order Id ${CAN_NOT_BE_NULL}`;

const ADMIN_ALREADY_IN_SYSTEM = "Admin is already on the system";

const NO_LOCATION_NAME = `Location name ${CAN_NOT_BE_NULL}`;
const LOCATION_ALREADY_CREATED =
  "Location already created with current latitude & longitude";

const NO_TUTOR = "No Tutor Found";

const COURSE_EXISTS = "Course already exists";
const NO_COURSE = "Course not found";
const NO_ENROLLED_COURSE_FOUND = "Could not find enrolled course";
const COURSE_ALREADY_ENROLLED = "You have already enrolled this course";
const COURSE_ALREADY_ASSIGNED = "This course is already assigned";
const NO_COURSE_MATERIAL = "No Course Material found";

const NO_PAYMENT_RECEIPT = "No Payment receipt found.";

const NO_SCORE = "No score found";

const CLASSROOM_EXISTS = "Class Room already exists";
const NO_CLASSROOM = "No Class Room found";

const DUPLICATE_ASSESSMENT =
  "You have already created assessment with current time for the course";
const NO_ASSESSMENT = "No Assessment found.";
const NO_NOTE = "Note doesn't exists";

const BLOCKED_USER = "Your account has been blocked. Contact the Administrator";

const ASSESSMENT_NOT_FOUND = "Assessment not found";

const ALREADY_GAVE_RATE = "You have already gave rate";
const NO_RATE = "No rate found";

module.exports = {
  NO_RATE,
  ALREADY_GAVE_RATE,
  ASSESSMENT_NOT_FOUND,
  BLOCKED_USER,
  NO_ENROLLED_COURSE_FOUND,
  NO_COURSE,
  NO_NOTE,
  DUPLICATE_ASSESSMENT,
  NO_ASSESSMENT,
  NO_TUTOR,
  CLASSROOM_EXISTS,
  NO_SCORE,
  NO_CLASSROOM,
  COURSE_EXISTS,
  COURSE_ALREADY_ENROLLED,
  COURSE_ALREADY_ASSIGNED,
  NO_COURSE_MATERIAL,
  NO_PAYMENT_RECEIPT,
  LOCATION_ALREADY_CREATED,
  NO_LOCATION_NAME,
  ADMIN_ALREADY_IN_SYSTEM,
  NO_SERVICE_PROVIDER_FOUND,
  NO_NEARBY_SERVICE_PROVIDER,
  DUPLICATE_SERVICE,
  NO_ORDER_ID,
  NO_SERVICE_ID,
  NO_SERVICE_CATEGORY_ID,
  INVALID_EMAIL_OR_PASSWORD,
  NO_DESCRIPTION,
  NO_PRICE_RANGE_FROM,
  NO_PRICE_RANGE_TO,
  NO_TIME_RANGE_FROM,
  NO_TIME_RANGE_TO,
  NO_LATITUDE_ADDRESS,
  NO_LONGITUDE_ADDRESS,
  NO_SERVICE_PROVIDER_ADDRESS,
  NO_ADDRESS,
  NO_SERVICE_CATEGORY_FOUND,
  NO_SERVICE_CATEGORY_NAME,
  SERVICE_NOT_FOUND,
  NO_SERVICE_NAME,
  NO_USER_ID,
  ERROR_OCCURRED,
  NO_PHONE_NUMBER,
  NO_EMAIL,
  NO_PASSWORD,
  NO_FIRST_NAME,
  NO_LAST_NAME,
  NO_SITE_NAME,
  NO_BLOCK_NUMBER,
  NO_HOUSE_NUMBER,
  DATA_MISSING,
  USER_ALREADY_REGISTERED,
  SUCCESS,
  USER_NOT_FOUND,
  INVALID_LOGIN,
  INCORRECT_PASSWORD,
  PASSWORD_LENGTH_ERROR,
  INVALID_EMAIL,
  SPECIFY_AUTH_TYPE,
  NO_DATA,
  NO_AUTHORIZATION_TOKEN_FOUND,
  AUTHORIZATION_ERROR,
  NO_PERMISSION,
};
