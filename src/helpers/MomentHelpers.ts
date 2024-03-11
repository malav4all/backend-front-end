import moment from "moment-timezone";

class MomentHelpers {
  compareTimeOfMoment(
    date: moment.Moment,
    dateToCompare: moment.Moment,
    shouldCompareSeconds: boolean = true
  ) {
    if (date === null && dateToCompare === null) {
      return true;
    }
    if (date === null || dateToCompare === null) {
      return false;
    }
    const timeFormat = "HH:mm:ss";
    const [hours1, minutes1, seconds1] = date.format(timeFormat).split(":");
    const [hours2, minutes2, seconds2] = dateToCompare
      .format(timeFormat)
      .split(":");

    const comparedHours = parseInt(hours1) === parseInt(hours2);
    const comparedMinutes = parseInt(minutes1) === parseInt(minutes2);

    const comparedSeconds = shouldCompareSeconds
      ? parseInt(seconds1) === parseInt(seconds2)
      : true;

    if (comparedHours && comparedMinutes && comparedSeconds) {
      return true;
    }
    return false;
  }

  formatTo12Hours(date: moment.Moment) {
    let format = "hh:mm A";
    return date.format(format);
  }

  getMomentOfString(dateString: moment.Moment, timezone: string) {
    let dateFormat = "YYYY-MM-DD HH:mm:ss";
    let utc = moment.utc(dateString, dateFormat);
    const local = utc.clone().tz(timezone);
    const formattedLocal = local.format(dateFormat);
    const newMomentObject = moment.tz(formattedLocal, timezone);
    return newMomentObject;
  }

  convertMomentToDate(date: moment.Moment) {
    if (date === null) {
      return null;
    }
    let dateFormat = "YYYY-MM-DD HH:mm:ss";
    return new Date(date.format(dateFormat));
  }

  getCurrentDate(format: string = "YYYY-MM-DD HH:mm:ssZ") {
    return moment().format(format);
  }

  guessTheTimeZone() {
    return moment.tz.guess(true);
  }
}

export default new MomentHelpers();
