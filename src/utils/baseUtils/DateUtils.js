import { format } from "date-fns";

class DateUtils {
  static formatDate(date, dateFormat) {
    return format(new Date(date), dateFormat);
  }
  static generateDateTimeLocal(date) {
    return format(new Date(date), "yyyy-MM-dd HH:mm:ss.SSSxxx");
  }
  static compareTimestampAsc(a, b) {
    if (a.timestamp > b.timestamp) return 1;
    if (a.timestamp < b.timestamp) return -1;
    return 0;
  }
  static compareTimestampDes(a, b) {
    if (a.timestamp < b.timestamp) return 1;
    if (a.timestamp > b.timestamp) return -1;
    return 0;
  }
}
export default DateUtils;
