import Vue from "vue";
import VueRouter from "vue-router";
import CalendarByWeek from "../components/CalendarElement";
import CalendarByDay from "../components/CalendarByDay";
import Home from "../components/Home";
Vue.use(VueRouter);
const route = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "calendar-by-week",
        name: "CalendarWeek",
        component: CalendarByWeek
      },
      {
        path: "calendar-by-day",
        name: "CalendarDay",
        component: CalendarByDay
      }
      // {
      //   path: "calendar-lib",
      //   name: "CalendarLib",
      //   component: () => import("../components/CalendarLibrary.vue")
      // }
    ]
  }
];

const Router = new VueRouter({
  routes: route
});

export default Router;
