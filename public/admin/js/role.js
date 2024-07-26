// Permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");

  buttonSubmit.addEventListener("click", () => {
    let result = [];

    const rows = tablePermissions.querySelectorAll("[data-name]");

    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");

      if (name == "id") {
        inputs.forEach((input) => {
          const value = input.value;
          result.push({
            id: value,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            result[index].permissions.push(name);
          }
        });
      }
    });

    const formChangePermissions = document.querySelector(
      "#form-change-permissions"
    );
    const inputPermissions = formChangePermissions.querySelector("input");
    inputPermissions.value = JSON.stringify(result);
    formChangePermissions.submit();
  });
}
// End Permissions

// Permissions Data Default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permissions]");

  records.forEach((record, index) => {
    const permissions = record.permissions;

    permissions.forEach((permission) => {
      const row = tablePermissions.querySelector(
        `tr[data-name="${permission}"]`
      );
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
// End Permissions Data Default
// View
const tablePermissionsView = document.querySelector("[table-permissions-view]");
if (tablePermissionsView) {
  const records = JSON.parse(
    tablePermissionsView.getAttribute("table-permissions-view")
  );
  // console.log(records);

  records.forEach((permission) => {
    const row = tablePermissionsView.querySelector(
      `tr[data-name="${permission}"]`
    );
    const input = row.querySelector("input");
    input.checked = true;
  });
}
// end View
