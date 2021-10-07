const success = (data = null, message = null) => {
  const response = {
    status: 'success',
    code: 200,
  };

  if (data) {
    response.data = data;
  }

  if (message) {
    response.message = message;
  }

  return response;
};

const errors = (err) => {
  let errorMessage = {};

  if ((err.code && err.message) || Array.isArray(err)) {
    errorMessage = {
      code: 400,
      message: Array.isArray(err) ? err : err.message,
    };
  } else if (err.stack) {
    errorMessage = {
      code: 500,
      message: err.message,
    };
  } else {
    errorMessage = {
      code: 400,
      message: err.message !== undefined ? err.message : err,
    };
  }

  const response = {
    status: 'error',
    code: errorMessage.code,
    message: errorMessage.message,
  };
  return response;
};

export { success, errors };
