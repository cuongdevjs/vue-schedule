let VueCalendarSchedule = import("./VueCalendarSchedule.vue");

module.exports = {
  install: function(Vue, options) {
    Vue.component("vue-calendar-schedule", VueCalendarSchedule);
  }
};
