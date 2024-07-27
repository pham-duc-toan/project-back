const SettingGeneral = require("../../models/settings-general.model");

module.exports.settingGeneral = async (req, res, next) => {
  try {
    const settingGeneral = await SettingGeneral.findOne({});

    res.locals.settingGeneral = settingGeneral;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
