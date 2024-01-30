const CONTENT_TYPES = {
  HTML: 'text/html',
  TEXT: 'text/plain',
  CSS: 'text/css',
  JAVASCRIPT: 'application/javascript',
  JSON: 'application/json',
  XML: 'application/xml',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  MPEG: 'audio/mpeg',
  MP4: 'video/mp4',
  PDF: 'application/pdf',
  STREAM: 'application/octet-stream',
};

function successResponse(res, data) {
  return res
    .status(200)
    .send({ success: true, data });
}

function failureResponse(res, error, code, data) {
  code = code || 400;
  return res
    .status(code)
    .send({ success: false, data, error });
}

function internalServerErrorResponse(res, error = 'Script error.') {
  return failureResponse(res, error, 500);
}

function badRequestResponse(res, error = 'Bad request.') {
  return failureResponse(res, error, 400);
}

function setContentType(res, contentType) {
  res.setHeader('content-type', contentType || CONTENT_TYPES.TEXT);
}

module.exports = exports = {
  CONTENT_TYPES,

  successResponse,
  failureResponse,

  internalServerErrorResponse,
  badRequestResponse,

  setContentType,
};
