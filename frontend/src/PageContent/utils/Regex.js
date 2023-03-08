const regexTests = {
  text: /^[A-Za-z\s]+$/,
  number: /[0-9\b]+$/,
  pwnumber: /[0-9\b]/,
  upperCase: /[A-Z]/,
  lowerCase: /[a-z]/,
  specialCharacter: /[`~!@#$%^&*()+=|;:'",.<>/?\\-]/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
};

export default regexTests;
