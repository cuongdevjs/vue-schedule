<template>
  <div class="content flex-col flex__center margin-bottom-10 margin-top-10 padding-top-10">
    <div class="navigation inline-flex flex-row flex__center margin-bottom-10 padding-bottom-10">
      <el-button-group>
        <el-button
          type="primary"
          @click="goToSchedulerByDay"
        >
          Scheduler By Day
        </el-button>
        <el-button
          type="primary"
          @click="goToSchedulerByWeek"
        >
          Scheduler By Week
        </el-button>
      </el-button-group>
    </div>
    <div class="flex-row flex__center margin-top-10 width__100">
      <!-- <router-view /> -->
      <CalendarSchedule
        :isByDay="isByDay"
        :listTimeline="listTimeline"
        :listRoom="listRoom"
        :listEvent="listEvent"
        :heightTable="heightTable"
        :widthSessionOfTheDay="widthSessionOfTheDay"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    CalendarSchedule: () => import('./CalendarSchedule.vue')
  },
  data () {
    return {
      isByDay: false,
      listTimeline: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      listRoom: [
        {
          id: 1,
          place: 'Phòng họp 12a.1'
        }, {
          id: 2,
          place: 'Phòng họp 12a.2'
        }, {
          id: 3,
          place: 'Phòng họp 12a.3'
        }, {
          id: 4,
          place: 'Phòng họp 12a.4'
        }, {
          id: 5,
          place: 'Phòng họp 12a.5'
        }, {
          id: 6,
          place: 'Phòng họp 12a.6'
        }, {
          id: 7,
          place: 'Phòng họp 12a.7'
        }, {
          id: 8,
          place: 'Phòng họp 12a.8'
        }, {
          id: 9,
          place: 'Phòng họp 12a.9'
        }, {
          id: 10,
          place: 'Phòng họp 12a.10'
        }, {
          id: 11,
          place: 'Phòng họp 12a.11'
        }, {
          id: 12,
          place: 'Phòng họp 12a.12'
        }
      ],
      listEvent: [
        {
          _id: 1,
          place_id: 1,
          date: 1553045407,
          hoursStart: 1553045407,
          hoursEnd: 1553052607,
          name: 'Họp hội đồng quản trị thường niên Tổng công ty Mobifone'
        },
        {
          _id: 2,
          place_id: 3,
          date: 1553052607,
          hoursStart: 1553052607,
          hoursEnd: 1553059807,
          name: 'Họp hội đồng quản trị eoffice'
        },
        {
          _id: 3,
          place_id: 3,
          date: 1553045407,
          hoursStart: 1553045407,
          hoursEnd: 1553052607,
          name: 'Tình hình báo cáo nhân sự'
        },
        {
          _id: 4,
          place_id: 3,
          date: 1553665055,
          hoursStart: 1553665055,
          hoursEnd: 1553675855,
          name: 'Tình hình báo cáo nhân sự EOFFICE'
        },
        {
          _id: 5,
          place_id: 8,
          date: 1555816218,
          hoursStart: 1555816218,
          hoursEnd: 1555837818,
          name: 'Báo cáo tình hình phát triển trung tâm công nghệ thông tin Mobifone'
        },
        {
          _id: 6,
          place_id: 1,
          date: 1555816218,
          hoursStart: 1553045407,
          hoursEnd: 1553052607,
          name: 'Họp hội đồng quản trị thường niên Tổng công ty Mobifone'
        },
        {
          _id: 7,
          place_id: 3,
          date: 1555816218,
          hoursStart: 1553052607,
          hoursEnd: 1553059807,
          name: 'Họp hội đồng quản trị eoffice'
        },
        {
          _id: 8,
          place_id: 3,
          date: 1555816218,
          hoursStart: 1553045407,
          hoursEnd: 1553052607,
          name: 'Tình hình báo cáo nhân sự'
        },
        {
          _id: 9,
          place_id: 2,
          date: 1555816218,
          hoursStart: 1553045407,
          hoursEnd: 1553052607,
          name: 'Tình hình báo cáo nhân sự'
        },
        {
          _id: 10,
          place_id: 8,
          date: 1555816218,
          hoursStart: 1555837818,
          hoursEnd: 1555841928,
          name: 'Báo cáo tình hình phát triển trung tâm công nghệ thông tin Mobifone'
        }
      ],
      heightTable: 600,
      widthSessionOfTheDay: 200
    }
  },
  methods: {
    goToSchedulerByDay: function () {
      this.isByDay = true
    },
    goToSchedulerByWeek: function () {
      this.isByDay = false
    }
  },

}
</script>

<style lang="css">
.content {
  max-width: 100%;
  margin: 0 24px;
}
</style>
