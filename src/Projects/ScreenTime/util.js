import {isPositiveInteger} from 'components/InputBox';



export const ACTIVITY_NAMES = [
  'Netflix',
  'Disney+',
  'Reddit',
  'Fire Emblem Heroes',
  'Messenger',
  'iMessage',
  'Discord',
  'Manga Reader',
  'WebToons',
  'Manga Storm',
  'Shounen Jump',
  'Gmail',
];


export const VERTICAL_ACTIVITY_SPACING=35;

function isValidDay(day, month, year) {
  const thirtyOneDayMonths = new Set([1,3,5,7,8,10,12]);
  if (day < 1 || day > 31) {
    return false;
  }
  if (day < 29) { // We don't need to do other checks
    return true;
  }
  if (day <= 31 && thirtyOneDayMonths.has(day)) {
    return true;
  }
  if (day <= 30 && month !== 2) {
    return true;
  }
  if (day === 29 && month === 2 && (year % 4 === 0)) {
    return true;
  }
  return false;
}

export function checkDateValid(date) {
  const {d: day, m: month, y: year} = date;
  const errors = {
    d: '',
    m: '',
    y: '',
  };
  let monthNum = 0;
  let dayNum = 0;
  let yearNum = 0;
  if (year.length !== 4) {
    errors.y = 'Year must have length 4';
  }
  else if (!isPositiveInteger(year)) {
    errors.y = 'Year must be an integer';
  }
  else {
    yearNum = Number.parseInt(year);
    if (yearNum > 2021) {
      errors.y = 'Must be a valid year';
    }
    else {
      errors.y = '';
    }
  }

  if (month.length > 2) {
    errors.m = 'Month has too many digits.';
  }
  else if(!isPositiveInteger(month)) {
    errors.m = 'Month must be an integer';
  }
  else {
    monthNum = Number.parseInt(month);
    if (monthNum < 1 || monthNum > 12) {
      errors.m = 'Month must be 1-12';
    }
    else {
      errors.m = '';
    }
  }

  if (day.length > 2) {
    errors.d = 'Day has too many digits';
  }
  else if (!isPositiveInteger(day)) {
    errors.d = 'Day must be an integer.';
  }
  else {
    dayNum = Number.parseInt(day);
    if (dayNum < 1 || !isValidDay(dayNum, monthNum, yearNum)) {
      errors.d = 'Must be a valid day';
    }
    else {
      errors.d = '';
    }
  }
  return errors;
}

export function checkHourValid(hour) {
  if(!isPositiveInteger(hour)) {
    return 'Hour must be a positive integer';
  }
  if (Number.parseInt(hour) >= 24) {
    return 'Hour must be less than or equal to 24.'
  }
  return '';
}

export function checkMinuteValid(min) {
  if(!isPositiveInteger(min)) {
    return 'Minute must be a positive integer';
  }
  if (Number.parseInt(min) >= 60) {
    return 'Minute must be less than or equal to 60.'
  }
  return '';
}

export function checkActivitiesValid(acts) {
  const ans = [];
  acts.forEach(({name, h, min}) => {
    ans.push({
      h: checkHourValid(h),
      min: checkMinuteValid(min),
    });
  });
  return ans;
}

export function initSeen() {
  const ans = new Map();

  ACTIVITY_NAMES.forEach((act) => {
    ans.set(act, false);
  });

  return ans;
}