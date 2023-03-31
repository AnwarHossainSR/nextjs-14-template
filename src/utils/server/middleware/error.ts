/* eslint-disable no-case-declarations */
/* eslint-disable no-template-curly-in-string */
export const errorTypes = (newError: any) => {
  switch (newError.name) {
    case 'CastError':
      const castErrorMessage = `Resource not found. Invalid: ${newError.path}`;
      return { message: castErrorMessage, statusCode: 400 };
    case 'JsonWebTokenError':
      const jwtErrorMessage = `Json Web Token is invalid, Try again`;
      return { message: jwtErrorMessage, statusCode: 400 };
    case 'TokenExpiredError':
      const jwtExpireErrorMessage = `Json Web Token is Expired, Try again`;
      return { message: jwtExpireErrorMessage, statusCode: 400 };
    case 'ValidationError':
      const validationErrorMessage = Object.values(newError.errors).map(
        (value: any) => value.message
      );
      return { message: validationErrorMessage, statusCode: 400 };
    case 'RangeError':
      const rangeErrorMessage = `RangeError: ${newError.message}`;
      return { message: rangeErrorMessage, statusCode: 400 };
    case 'TypeError':
      const typeErrorMessage = `TypeError: ${newError.message}`;
      return { message: typeErrorMessage, statusCode: 400 };
    case 'ReferenceError':
      const referenceErrorMessage = `ReferenceError: ${newError.message}`;
      return { message: referenceErrorMessage, statusCode: 400 };
    case 'SyntaxError':
      const syntaxErrorMessage = `SyntaxError: ${newError.message}`;
      return { message: syntaxErrorMessage, statusCode: 400 };
    case 'EvalError':
      const evalErrorMessage = `EvalError: ${newError.message}`;
      return { message: evalErrorMessage, statusCode: 400 };
    case 'URIError':
      const uriErrorMessage = `URIError: ${newError.message}`;
      return { message: uriErrorMessage, statusCode: 400 };
    case 'Internal Server Error':
      const internalServerErrorMsg = `Internal Server Error: ${newError.message}`;
      return { message: internalServerErrorMsg, statusCode: 500 };
    case 'Unauthorized':
      const unauthorizedMsg = `Unauthorized: ${newError.message}`;
      return { message: unauthorizedMsg, statusCode: 401 };
    case 'Forbidden':
      const forbiddenMsg = `Forbidden: ${newError.message}`;
      return { message: forbiddenMsg, statusCode: 403 };
    case 'Not Found':
      const notFoundMsg = `Not Found: ${newError.message}`;
      return { message: notFoundMsg, statusCode: 404 };
    case 'Bad Request':
      const badRequestMsg = `Bad Request: ${newError.message}`;
      return { message: badRequestMsg, statusCode: 400 };
    case 'Conflict':
      const conflictMsg = `Conflict: ${newError.message}`;
      return { message: conflictMsg, statusCode: 409 };
    case 'Unprocessable Entity':
      const unprocessableEntityMsg = `Unprocessable Entity: ${newError.message}`;
      return { message: unprocessableEntityMsg, statusCode: 422 };
    case 'Too Many Requests':
      const tooManyRequestsMsg = `Too Many Requests: ${newError.message}`;
      return { message: tooManyRequestsMsg, statusCode: 429 };
    case 'Service Unavailable':
      const serviceUnavailableMsg = `Service Unavailable: ${newError.message}`;
      return { message: serviceUnavailableMsg, statusCode: 503 };
    case 'Gateway Timeout':
      const gatewayTimeoutMsg = `Gateway Timeout: ${newError.message}`;
      return { message: gatewayTimeoutMsg, statusCode: 504 };
    case 'HTTP Version Not Supported':
      const httpVersionNotSupportedMsg = `HTTP Version Not Supported: ${newError.message}`;
      return { message: httpVersionNotSupportedMsg, statusCode: 505 };
    case 'Variant Also Negotiates':
      const variantAlsoNegotiatesMsg = `Variant Also Negotiates: ${newError.message}`;
      return { message: variantAlsoNegotiatesMsg, statusCode: 506 };
    case 'Insufficient Storage':
      const insufficientStorageMsg = `Insufficient Storage: ${newError.message}`;
      return { message: insufficientStorageMsg, statusCode: 507 };
    case 'Method Not Allowed':
      const methodNotAllowedMsg = `Method Not Allowed: ${newError.message}`;
      return { message: methodNotAllowedMsg, statusCode: 405 };
    default:
      return { message: 'Internal Server Error', statusCode: 500 };
  }
};
