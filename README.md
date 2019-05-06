# vue-schedule

### schedule display by day and by week


![MacDown Screenshot](/src/assets/Day.png "Calendar Schedule By Day")


## But first, because some reason about import setting dependencies in bundle package so it won't work if install by normal way


### If you wanna use package, you must have prerequisites:

* If your project use [Element UI Kit](https://element.eleme.io), you can go through next step.
	1. First, install Element UI, `npm i element-ui -S`
	2. Don't worry about size, we will just use Table's package Element, by way import in **App.vue**
	```
		import Vue from 'vue';
		import { Table } from 'element-ui';
		import locale from 'element-ui/lib/locale/lang/en';
		Vue.use(Table, {locale});


* Please visit [repo GitHub here!](https://github.com/CuongStf/vue-schedule)

* Clone project and copy file CalendarByDay.vue (Schedule by Day), CalendarElement.vue (Schedule by Week) in src/components directory in your project.

* Use the files above as file CalendarSchedule.vue in repo

* And now you can custom as you like.


![MacDown Screenshot](/src/assets/Week.png "Calendar Schedule By Week")