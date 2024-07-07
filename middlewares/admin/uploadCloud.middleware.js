const bufferToLinkOnlineByCloudinary = require("../../helpers/bufferToLinkOnlineCloudinary");
module.exports.upload = async (req, res, next) => {
  if (req.file) {
    req.body[req.file.fieldname] = await bufferToLinkOnlineByCloudinary(
      req.file.buffer
    );
  }
  next();
};
