const SettingGeneral = require("../../models/settings-general.model");

// [GET] /admin/settings/general
module.exports.general = async (req, res) => {
  try {
    const settingGeneral = await SettingGeneral.findOne({});

    res.render("admin/page/settings/general", {
      pageTitle: "Cài đặt chung",
      settingGeneral: settingGeneral,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {
  try {
    const settingGeneral = await SettingGeneral.findOne({});

    if (settingGeneral) {
      await SettingGeneral.updateOne(
        {
          _id: settingGeneral.id,
        },
        req.body
      );
    } else {
      const record = new SettingGeneral(req.body);
      await record.save();
    }

    req.flash("success", "Cập nhật thành công!");

    res.redirect("back");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
