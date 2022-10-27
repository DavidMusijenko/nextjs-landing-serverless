const validateEmail = ({ email, setEmailError }) => {
  const emailRegular =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email && !email.match(emailRegular)
    ? setEmailError("Email not valid.")
    : setEmailError("");
};

const validatePhone = ({ phone, setPhoneError }) => {
  var phoneRegular =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,8}$/im;
  return phone && !phone.match(phoneRegular)
    ? setPhoneError("Phone Number not valid.")
    : setPhoneError("");
};

const validateFullName = ({ fullName, setFullNameError }) => {
  return fullName && fullName.length < 2
    ? setFullNameError("Full name is too short.")
    : fullName && fullName.length > 50
    ? setFullNameError("Try to make it short and meaningful.")
    : setFullNameError("");
};

const validateMessage = ({ message, setMessageError }) => {
  return message.length < 5 || message === ""
    ? setMessageError("Message is too short.")
    : setMessageError("");
};

export { validateEmail, validateFullName, validateMessage, validatePhone };
