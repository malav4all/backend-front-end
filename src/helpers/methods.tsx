import moment from "moment";
import strings from "../global/constants/StringConstants";
import { globalEmitter } from "../utils/emitter";
import { store } from "../utils/store";
import MomentHelpers from "./MomentHelpers";
import { FormattedResources, Resources } from "../models/interfaces";
import { logOutAction } from "../redux/authSlice";
import history from "../utils/history";

const methodsContext = this;

export const isTruthy = (value: any, shouldCheckByType: boolean = true) => {
  const validatedByType = shouldCheckByType
    ? customValidatorByType(value)
    : true;

  if (value !== null && value !== undefined && validatedByType) {
    return true;
  }
  return false;
};

const customValidatorByType = (value: any) => {
  if (value !== undefined && value !== null) {
    const type = typeof value;
    switch (type) {
      case "string":
        return value.trim() !== "";
      case "object":
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return Object.keys(value).length > 0;
        }
      default:
        return true;
    }
  }
};

export const compareStrings = (string1: string, string2: string) => {
  if (!(isTruthy(string1) || isTruthy(string2))) {
    return true;
  } else {
    if (string1 && string2) {
      if (string1.toLowerCase() === string2.toLowerCase()) {
        return true;
      }
    }
  }
  return false;
};

export const openInfoNotification = (message: any, title: string = "Info") => {
  globalEmitter.emit(strings.notification, {
    type: strings.info,
    message: message,
    title: title,
  });
};

export const openSuccessNotification = (
  message: any,
  title: string = "Success"
) => {
  globalEmitter.emit(strings.notification, {
    type: strings.success,
    message: message,
    title: title,
  });
};

export const openWarningNotification = (
  message: any,
  title: string = "Warning"
) => {
  globalEmitter.emit(strings.notification, {
    type: strings.warning,
    message: message,
    title: title,
  });
};

export const openErrorNotification = (
  message: any,
  title: string = "Error"
) => {
  globalEmitter.emit(strings.notification, {
    type: strings.error,
    message: message,
    title: title,
  });
};

export const convertPriceToDollarFormat = (value: number) => {
  return `$${(value / 100).toFixed(2)}`;
};

export function debounce(func: Function, wait: number) {
  let timeout: any;
  return function (...args: any) {
    const context = methodsContext;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export function debounceEventHandler(func: Function, wait: number) {
  const debounced = debounce(func, wait);
  return function (event: any) {
    event.persist();
    return debounced(event);
  };
}

export const getFormattedStatsCount = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};

export const getFormattedNumbers = (value: string) => {
  const matches = value.match(/\d+/g);
  let number = "";
  if (matches !== null) {
    matches.forEach((match) => {
      number = number + match;
    });
  }
  if (number.length === 10) {
    value = number.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  return { number: number, maskedNumber: value };
};

export const translateFirstAndLastName = (value: string) => {
  const userName: any = store.getState()?.auth?.userName ?? "";
  const name = userName.split(" ");
  if (!name.length) {
    let returnString = value.replace("$FIRST_NAME", "");
    returnString = returnString.replace("$LAST_NAME", "");
    return returnString;
  }
  const firstName = name[0];
  const lastName = name.length > 1 ? name[1] : "";
  let returnString = value.replace("$FIRST_NAME", firstName);
  returnString = returnString.replace("$LAST_NAME", lastName);
  return returnString;
};

export const convertESTtoUserLocalTime = (inputTime: string) => {
  const userTimeZone = MomentHelpers.guessTheTimeZone();
  const inputTimezone = "America/New_York";
  const inputTimeFormat = "YYYY-MM-DDTHH:mm:s";
  const outputTimeFormat = "hh:mm a";
  return moment
    .tz(inputTime, inputTimeFormat, inputTimezone)
    .tz(userTimeZone)
    .format(outputTimeFormat);
};

export const convertESTtoUserLocalDateAndTime = (inputTime: string) => {
  const userTimeZone = MomentHelpers.guessTheTimeZone();
  const inputTimezone = "America/New_York";
  const inputTimeFormat = "YYYY-MM-DDTHH:mm:s";
  const outputTimeFormat = "MMM DD, YYYY hh:mm a";
  return moment
    .tz(inputTime, inputTimeFormat, inputTimezone)
    .tz(userTimeZone)
    .format(outputTimeFormat);
};

export const validatePageQuery = (pageFromUrl: any) => {
  if (!pageFromUrl || isNaN(+pageFromUrl) || +pageFromUrl <= 0) {
    return 1;
  }
  return +pageFromUrl;
};

export const validateStatusQuery = (statusFromUrl: any) => {
  if (
    ![
      strings.Completed,
      strings.All,
      strings.Draft,
      strings.Submitted,
    ].includes(statusFromUrl)
  ) {
    return strings.Completed;
  }
  return statusFromUrl;
};

export const validateTabValue = (statusFromUrl: any) => {
  if (![strings.USERS, strings.ASSETASSIGNMENT].includes(statusFromUrl)) {
    return strings.USERS;
  }
  return statusFromUrl;
};

export const validatePerPageQuery = (perPageFromUrl: any) => {
  if (!perPageFromUrl || isNaN(+perPageFromUrl) || +perPageFromUrl < 10) {
    return 10;
  } else if (+perPageFromUrl > 25) {
    return 25;
  } else if (+perPageFromUrl % 5 !== 0) {
    return +perPageFromUrl - (+perPageFromUrl % 5);
  }
  return +perPageFromUrl;
};

export const validateCategoryQuery = (campaignsFromUrl: any) => {
  if (!["team", "all", "my"].includes(campaignsFromUrl)) {
    return "all";
  }
  return campaignsFromUrl;
};

export const convertResourceToObjectFormat = (resources: Resources[]) => {
  if (!doesResourcesExistInLocalStorage(resources)) {
    return {} as FormattedResources;
  }
  let returnObject = {} as { [key: string]: string[] };
  resources.forEach((resource) => {
    returnObject[resource.name] = resource.permissions;
  });
  return returnObject;
};

const doesResourcesExistInLocalStorage = (resources: Resources[]) => {
  if (!isTruthy(resources)) {
    store.dispatch(logOutAction());
    // history.push(urls.loginViewPath);
    return false;
  }
  return true;
};

export const getFileExtension = (fileName: string) => {
  const ext = /^.+\.([^.]+)$/.exec(fileName);
  return ext === null ? "" : ext[1];
};
