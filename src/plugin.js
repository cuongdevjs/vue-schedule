let VueCalendarSchedule = import("./components/CalendarSchedule.vue");

module.exports = {
  install: function(Vue, options) {
    Vue.component("vue-calendar-schedule", VueCalendarSchedule);
  }
};
