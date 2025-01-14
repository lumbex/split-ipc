import copy from "copy-to-clipboard";
import StoreUtils from "./StoreUtils";

class AppUtils {
  static urls = {
    auth: {
      LOGIN: "/profile/login"
    },
    agent: {
      ADD_AGENT: "/addAgent"
    },
    account: {
      INITIATE_ACCOUNT_ACTIVATION: "/profile/initiateAccountActivation"
    },
    product: {
      FETCH_PRODUCTS: "/fetchBusinessProducts",
      ADD_PRODUCT: "/addProduct"
    }
  };

  static parameters = {
    auth: {
      authProcesses: {
        ENROLMENT: "enrolment",
        LOGIN: "login"
      },
      enrolmentTypes: {
        BVN_ACTIVE: "bvn-active",
        BVN_NOT_ACTIVE: "bvn-not-active"
      }
    },
    accountTypes: {
      VERIFIED: "verified",
      NOT_VERIFIED: "not-verified"
    },
    user: {
      roles: {
        CHOOSE_LIFE_ADMIN: "choose-life-admin",
        CHOOSE_LIFE_USER: "choose-life-user",
        COMPANY_ADMIN: "company-admin",
        COMPANY_USER: "company-user"
      }
    },
    product: {
      productTypes: {
        service: "service",
        product: "product"
      }
    },
    chat: {
      authorSourceType: {
        AGENT: "agent",
        SYSTEM: "system",
        CLIENT: "client"
      },
      messageType: {
        TEXT: "text",
        INFO: "info",
        RATING: "rating",
        FILE: "file"
      },
      messageContentType: {
        NONE: "",
        PNG: "png",
        PDF: "pdf",
        ASSIGNMENT: "assignment",
        CHAT_CLOSE: "chat-close"
      }
    }
  };

  static getDefaultPayload = {
    source: "web"
  };

  static getDeviceId() {
    let module = {
      options: [],
      header: [
        navigator.platform,
        navigator.userAgent,
        navigator.appVersion,
        navigator.vendor,
        window.opera
      ],
      dataos: [
        { name: "Windows Phone", value: "Windows Phone", version: "OS" },
        { name: "Windows", value: "Win", version: "NT" },
        { name: "iPhone", value: "iPhone", version: "OS" },
        { name: "iPad", value: "iPad", version: "OS" },
        { name: "Kindle", value: "Silk", version: "Silk" },
        { name: "Android", value: "Android", version: "Android" },
        { name: "PlayBook", value: "PlayBook", version: "OS" },
        { name: "BlackBerry", value: "BlackBerry", version: "/" },
        { name: "Macintosh", value: "Mac", version: "OS X" },
        { name: "Linux", value: "Linux", version: "rv" },
        { name: "Palm", value: "Palm", version: "PalmOS" }
      ],
      databrowser: [
        { name: "Chrome", value: "Chrome", version: "Chrome" },
        { name: "Firefox", value: "Firefox", version: "Firefox" },
        { name: "Safari", value: "Safari", version: "Version" },
        { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
        { name: "Opera", value: "Opera", version: "Opera" },
        { name: "BlackBerry", value: "CLDC", version: "CLDC" },
        { name: "Mozilla", value: "Mozilla", version: "Mozilla" }
      ],
      init: function() {
        let agent = this.header.join(" "),
          os = this.matchItem(agent, this.dataos),
          browser = this.matchItem(agent, this.databrowser);

        return { os: os, browser: browser };
      },
      matchItem: (string, data) => {
        let i = 0,
          j = 0,
          regex,
          regexv,
          match,
          matches,
          version;

        for (i = 0; i < data.length; i += 1) {
          regex = new RegExp(data[i].value, "i");
          match = regex.test(string);
          if (match) {
            regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
            matches = string.match(regexv);
            version = "";
            if (matches) {
              if (matches[1]) {
                matches = matches[1];
              }
            }
            if (matches) {
              matches = matches.split(/[._]+/);
              for (j = 0; j < matches.length; j += 1) {
                if (j === 0) {
                  version += matches[j] + ".";
                } else {
                  version += matches[j];
                }
              }
            } else {
              version = "0";
            }
            return {
              name: data[i].name,
              version: parseFloat(version)
            };
          }
        }
        return { name: "unknown", version: 0 };
      }
    };

    let e = module.init();

    let device = {
      os: e.os.name,
      osVersion: e.os.version,
      browser: e.browser.name,
      browserVersion: e.browser.version,
      userAgent: navigator.userAgent,
      appVersion: navigator.appVersion,
      platform: navigator.platform,
      vendor: navigator.vendor
    };

    return `${device.os}-${device.osVersion}`;
  }

  static startLocationWatcher() {
    function success(position) {
      StoreUtils.commit("user/SET_CURRENT_LOCATION", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }

    function error() {
      StoreUtils.commit("user/SET_CURRENT_LOCATION", {
        latitude: "",
        longitude: ""
      });
    }

    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    };

    navigator.geolocation.watchPosition(success, error, options);
  }

  static getPushId() {
    return "0";
  }

  static async grabTextFromClipboard() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const notification = {
        type: "success",
        message: `Pasted!`
      };
      StoreUtils.dispatch(
        StoreUtils.actions.notification.addNotificationSlide,
        notification
      );
      return clipboardText;
    } catch (error) {
      const notification = {
        type: "error",
        message: `Failed!`
      };
      StoreUtils.dispatch(
        StoreUtils.actions.notification.addNotificationSlide,
        notification
      );

      return error;
    }
  }

  static copyToClipBoard(textToCopy) {
    copy(textToCopy);

    const notification = {
      type: "success",
      message: `Copied!`
    };
    StoreUtils.dispatch(
      StoreUtils.actions.notification.addNotificationSlide,
      notification
    );
  }

  static getCurrencyColorCode(currency) {
    switch (currency) {
      case "BTC":
        return `#f19617`;
      case "ETH":
        return `#0e367a`;
      case "NGN":
        return `#126152`;
      default:
        return `#505050`;
    }
  }

  static allStatesInNigeriaArray() {
    return [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "FCT - Abuja",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara"
    ].reduce((acc, currValue) => {
      return {
        ...acc,
        [currValue]: `${currValue}`
      };
    }, {});
  }
  static allCountriesArray() {
    return [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antigua &amp; Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bosnia &amp; Herzegovina",
      "Botswana",
      "Brazil",
      "British Virgin Islands",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Cape Verde",
      "Cayman Islands",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Congo",
      "Cook Islands",
      "Costa Rica",
      "Cote D Ivoire",
      "Croatia",
      "Cruise Ship",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "French Polynesia",
      "French West Indies",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kuwait",
      "Kyrgyz Republic",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macau",
      "Macedonia",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Nepal",
      "Netherlands",
      "Netherlands Antilles",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Norway",
      "Oman",
      "Pakistan",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Reunion",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Pierre &amp; Miquelon",
      "Samoa",
      "San Marino",
      "Satellite",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "South Africa",
      "South Korea",
      "Spain",
      "Sri Lanka",
      "St Kitts &amp; Nevis",
      "St Lucia",
      "St Vincent",
      "St. Lucia",
      "Sudan",
      "Suriname",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Timor L'Este",
      "Togo",
      "Tonga",
      "Trinidad &amp; Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks &amp; Caicos",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "Uruguay",
      "Uzbekistan",
      "Venezuela",
      "Vietnam",
      "Virgin Islands (US)",
      "Yemen",
      "Zambia",
      "Zimbabwe"
    ];
  }
}

export default AppUtils;
