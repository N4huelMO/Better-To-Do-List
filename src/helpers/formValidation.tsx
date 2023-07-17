const formValidation = (
  name: string,
  password: string,
  confirmPassword: string
) => {
  let error;

  if (name === "" || name.length < 6) {
    return (error = "Name must have at least 6 characters");
  }

  if (password.length < 6 || confirmPassword.length < 6) {
    return (error = "Password must have at least 6 characters");
  }

  if (password != confirmPassword) {
    return (error = "Passwords doesn't match");
  }
};

export default formValidation;
