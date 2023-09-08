export const validateRegisterInput = ({
    email,
    password,
    confirm_password,
  }) => {
    const errors = {};
  
    if (email.trim() === "") {
      errors.email = "Email must not be empty";
    } else {
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.email = "Email must be a valid email address";
      }
    }
  
    if (password === "") {
      errors.password = "Password must not empty";
    } else if (password !== confirm_password) {
      errors.confirm_password = "The Passwords didn't match.";
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  };
  
  export const validateLoginInput = ({
    email,
    password
  }) => {
    const errors = {};
  
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  
    if(email.trim() === ""){
      errors.email = "Email must not be empty";
    }else if(!email.match(regEx)){
      errors.email = "Email must be a valid email address";
    }
  
    if (password.trim() === "") {
      errors.password = "Password must not empty";
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  }