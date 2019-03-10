import moment from 'moment';
import I18n from './I18nGlobal';

export const DATE_FORMAT = I18n.t('en.dateFormat');

export function timestampToDate(timestamp, format = DATE_FORMAT) {
  return moment.utc(timestamp * 1000).local().format(format);
}

export function datetimeToDate(datetime, format = DATE_FORMAT) {
  if (moment.utc(datetime, moment.HTML5_FMT.DATETIME_LOCAL_MS).isValid()) {
    return moment.utc(datetime, moment.HTML5_FMT.DATETIME_LOCAL_MS).local().format(format);
  }
  return '';
}

export function timestampToTime(timestamp, format = 'HH:mm') {
  return moment.utc(timestamp * 1000).format(format);
}

export function dateToTimestamp(date, format = DATE_FORMAT) {
  return moment.utc(date, format).format('X');
}

export function getNowAsTimestamp() {
  return moment.utc().format('X');
}

export function isDateBetween(date, from, to, format = DATE_FORMAT, scale = 'days') {
  return moment(date, format).isSameOrAfter(from, scale)
    && moment(date, format).isSameOrBefore(to, scale);
}

export function isDateBefore(date, before, format = DATE_FORMAT, scale = 'days') {
  return moment(date, format).isBefore(moment(before, format), scale);
}

export function isDateAfter(date, after, format = DATE_FORMAT, scale = 'days') {
  return moment(date, format).isAfter(moment(after, format), scale);
}

export function isDateSameOrAfter(date, after, format = DATE_FORMAT, scale = 'days') {
  return moment(date, format).isSameOrAfter(moment(after, format), scale);
}

export function getNowAsMoment() {
  return moment.utc();
}

export function addToMoment(momentDate, amount, key = 'days') {
  return momentDate.add(amount, key);
}

export function getDateFormatFromMoment(momentDate) {
  return momentDate.format(DATE_FORMAT);
}

export function isValidDateFormat(date) {
  // checks for DD/MM/YYYY format
  const pattern = new RegExp('^(?:(?:31(\\/)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$');
  return pattern.test(date);
}

export function substractFromNow(value, unit) {
  return getNowAsMoment().subtract(value, unit);
}

export function formatMomentAs(date, format) {
  return date.format(format);
}
