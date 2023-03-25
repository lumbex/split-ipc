export const globalENVs = () => {
  const globalENVObject = {};
  // alert(process.env.VUE_APP_ENV);
  switch (process.env.VUE_APP_ENV) {
    case "dev":
      globalENVObject.baseAPIURL = "https://api.spleet.cash/dev/";
      break;

    case "staging":
      globalENVObject.baseAPIURL = "https://api.spleet.cash/staging/";
      break;

    case "prod":
      globalENVObject.baseAPIURL = "https://api.spleet.cash/prod/";
      break;
  }

  return globalENVObject;
};
