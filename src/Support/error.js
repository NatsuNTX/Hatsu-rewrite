function sendError(err) {
    throw new Error(err);
}

exports.sendError = sendError;