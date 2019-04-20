import moment from 'moment';

export default function (value, options) {

  !options && (options = {nullValue: ""})

  if (!value) return options.nullValue;

  let date = new moment(value);
  let now = new moment();

  return  date.format(options.dateFormat || (date.get('year') != now.get('year')) ? (options.dateFormat || "DD/MM/YYYY") : "DD/MM");
}
