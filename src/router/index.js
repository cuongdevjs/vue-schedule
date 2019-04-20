import Vue from "vue";
import VueRouter from "vue-router";

import ProgressRouter from "../components/ProgressDemo";
import CalendarElement from "../components/CalendarElement";
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
        path: "progress",
        name: "Progress",
        component: ProgressRouter
      },
      {
        path: "calendar-by-week",
        name: "CalendarWeek",
        component: CalendarElement
      },
      {
        path: "calendar-by-day",
        name: "CalendarDay",
        component: CalendarByDay
      }
    ]
  }
];

const Router = new VueRouter({
  routes: route
});

export default Router;
