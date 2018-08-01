const validator = require('validator');

const isEmpty = require('lodash/isEmpty');
const pick = require('lodash/pick');

// util function
function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

// helper functions
const checkUrlProps = (srcObj, errorObj, ...props) => {
  props.forEach(prop => {
    if (srcObj[prop] && !validator.isURL(srcObj[prop] + '')) {
      errorObj[prop] = 'URL is not valid';
    }
  });
};

const checkPropsExist = (srcObj, errorObj, ...props) => {
  props.forEach(prop => {
    if (!srcObj[prop] || validator.isEmpty(srcObj[prop] + '')) {
      errorObj[prop] = `${prop} is required`;
    }
  });
};

const checkUrlSafeProps = (srcObj, errorObj, ...props) => {
  props.forEach(prop => {
    if (srcObj[prop] && !validator.matches(srcObj[prop] + '', /^[a-zA-Z0-9_-]*$/)) {
      errorObj[prop] = 'invalid characters';
    }
  });
};

// validate registration
function validateRegistrationInput(data) {
  const errors = {};

  // name validation
  if (!validator.isLength(data.name + '', { min: 1, max: 50 })) {
    errors.name = 'must be between 1 and 50 characters';
  }

  // email validation
  if (!validator.isEmail(data.email + '')) {
    errors.email = 'email address is invalid';
  }

  // password validation
  if (!validator.isLength(data.password + '', { min: 6, max: 50 })) {
    errors.password = 'password must at least 6 characters long';
  }

  // this can be done client-side only if tool like ReCaptcha is used
  if (!validator.equals(data.password + '', data.password2 + '')) {
    errors.password2 = 'passwords do not match!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

function validateLoginInput(data) {
  const errors = {};

  const validateRequiredInput = partial(checkPropsExist, data, errors);

  // required params (email & password)
  validateRequiredInput('email', 'password');

  // if (!data.email) {
  //   errors.email = 'email is required';
  // }

  // // password validation
  // if (!data.password) {
  //   errors.password = 'password is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

function validateProfileInput(data) {
  const errors = {};

  const validateProfileUrls = partial(checkUrlProps, data, errors);
  const validateProfileUrlSafe = partial(checkUrlSafeProps, data, errors);

  // required fields
  // handle
  if (!data.handle) {
    errors.handle = 'handle is required';
  }

  // format validation
  // handle - length
  if (!validator.isLength(data.handle + '', { min: 2, max: 40 })) {
    errors.handle = 'handle should be at least 2 characters';
  }

  // format validation
  // handle - URL-safe characters
  validateProfileUrlSafe('handle');

  // focus
  if (!data.focus) {
    errors.focus = 'focus/role is required';
  }

  // check URLs
  validateProfileUrls('website', 'youtube', 'twitter', 'linkedin', 'github');

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

function validateProjectInput(data) {
  const errors = {};
  const validateRequiredProjectInput = partial(checkPropsExist, data, errors);
  const validateProjectUrls = partial(checkUrlProps, data, errors);

  // required params
  validateRequiredProjectInput('title', 'description', 'repo');

  // check URLs
  validateProjectUrls('url', 'repo');

  // check end date if not current
  if (!data.current) {
    if (!data.to) errors.to = 'project requires an end date (if not active)';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

function validateResourceInput(data) {
  const errors = {};
  const validateRequiredResourceInput = partial(checkPropsExist, data, errors);
  const validateResourceURLs = partial(checkUrlProps, data, errors);

  // required params
  validateRequiredResourceInput('name', 'description', 'url');

  // url
  if (data.url) validateResourceURLs('url');

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

// posts validaton
function validatePostInput(data) {
  const errors = {};
  const validateRequiredPostInput = partial(checkPropsExist, data, errors);

  if (!validator.isLength(data.text + '', { min: 5, max: 500 })) {
    errors.text = 'message should be between 5 and 500 characters';
  }

  validateRequiredPostInput('text');

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

// comment validaton
function validateCommentInput(data) {
  const errors = {};
  const validateRequiredCommentInput = partial(checkPropsExist, data, errors);

  if (!validator.isLength(data.text + '', { min: 5, max: 500 })) {
    errors.text = 'comment should be between 5 and 500 characters';
  }

  validateRequiredCommentInput('text');

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = {
  validateRegistrationInput,
  validateLoginInput,
  validateProfileInput,
  validateProjectInput,
  validateResourceInput,
  validatePostInput,
  validateCommentInput
};
