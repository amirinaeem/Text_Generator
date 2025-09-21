// ==================================
// Central error responder for API routes.
// ==================================


export function errorHandler(err, req, res, next) {
const status = err.status || 500;
const message = err.message || 'Unexpected error';
res.status(status).json({ ok: false, error: message });
}