const userEmailRegExp = /^\S+@\S+\.\S+$/;

const userEmailMessage = "missing required email field";

const userPasswordMessage = "missing required password field";

const userNameMessage = "missing required name field";

const avatarBaseUrl = "https://eu.ui-avatars.com/api/";

const avatarSettings = "&size=250&background=A1C08E&rounded=true";

module.exports = {
  userEmailRegExp,
  userEmailMessage,
  userPasswordMessage,
  userNameMessage,
  avatarBaseUrl,
  avatarSettings,
};
