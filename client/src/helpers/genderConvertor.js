export const genderConvertor = (gender) => {
  switch (gender) {
    case "M":
      return "Male";
    case "F":
      return "Female";
    case "Male":
      return "M";
    case "Female":
      return "F";
    default:
      return "M";
  }
};
