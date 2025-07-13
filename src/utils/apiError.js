import httpStatus from 'http-status';

class ApiError extends Error {
  constructor(status = httpStatus.BAD_REQUEST, message = '') {
    super(message);
    this.status = status;
  }
}

export default ApiError;