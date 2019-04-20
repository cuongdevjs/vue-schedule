import moment from 'moment';

export default {

  toMoment(value) {

    if (!value) return null;

    return moment(value);
  }
}
