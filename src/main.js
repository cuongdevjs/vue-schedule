// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/vi";
import "element-ui/lib/theme-chalk/display.css";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/style.css";
import App from "./App";

Vue.use(ElementUI, {
  locale
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
