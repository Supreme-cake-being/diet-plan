const messageList: Record<number, string> = {
  400: 'Bad Request',
  401: 'Not authorized',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Request Timeout',
  409: 'Conflict',
};

type IHttpError = (status: number, message?: string) => Error;

class CustomError extends Error {
  status: number;

  constructor(status: number, message: string = messageList[status]) {
    super(message);
    this.status = status;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

const HttpError: IHttpError = (status, message = messageList[status]) => {
  const error = new CustomError(status, message);
  return error;
};

export default HttpError;
