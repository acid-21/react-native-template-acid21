const allCTAs = {
  ios: {
    logo: "//*[@label='btnLogo']",
    pinInput: "//*[@label='txtInputEnvironmentPin']",
    developmentBtn: "//*[@label='btnEnvironmentdev']",
    productionBtn: "//*[@label='btnEnvironmentprod']",
    patientBtn: "//*[@label='btnPatient']",
    loginBtn: "//*[@label='btnRegistrationSignIn']",
    emailInput: "//*[@label='textInputEmail']",
    passwordInput: "//*[@label='textInputPassword']",
    loginBtn2: "//*[@label='btnSignIn']",
    welcomeTitle: "//*[@label='textViewWelcome']",
    menuDocs: "//*[@label='My Docs, tab, 2 of 5']",
    menuHome: "//*[@label='Home, tab, 1 of 5']",
    menuSettings: "//*[@label='Settings, tab, 4 of 5']",
    menuProfile: "//*[@label='Profile, tab, 5 of 5']",
    docsPinInput: "//*[@resource-id='OTPInputView']",
    docsPinSubmit: "//*[@label='pinSubmit']",
    menuBtnAdd: "//*[@label='menuBtnAdd']",
  },
  android: {
    allowBtn:
      "//*[@resource-id='com.android.permissioncontroller:id/permission_allow_button']",
    logo: "//*[@content-desc='btnLogo']",
    pinInput: "//*[@content-desc='txtInputEnvironmentPin']",
    developmentBtn: "//*[@content-desc='btnEnvironmentdev']",
    productionBtn: "//*[@content-desc='btnEnvironmentprod']",
    patientBtn: "//*[@content-desc='btnPatient']",
    loginBtn: "//*[@content-desc='btnRegistrationSignIn']",
    emailInput: "//*[@content-desc='textInputEmail']",
    passwordInput: "//*[@content-desc='textInputPassword']",
    loginBtn2: "//*[@content-desc='btnSignIn']",
    welcomeTitle: "//*[@content-desc='textViewWelcome']",
    menuDocs: "//*[@content-desc='menuBtnMyDocs']",
    menuHome: "//*[@content-desc='menuBtnHomeNavigator']",
    menuSettings: "//*[@content-desc='menuBtnAccountSetting']",
    menuProfile: "//*[@content-desc='menuBtnProfile']",
    docsPinInput: "//*[@resource-id='OTPInputView']",
    docsPinSubmit: "//*[@content-desc='pinSubmit']",
    menuBtnAdd: "//*[@content-desc='menuBtnAdd']",
  },
};

module.exports = { allCTAs };