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
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  methods: {
    // goToProgress: function () {
    //   this.$router.push({ name: 'Progress' });
    // },
    goToSchedulerByDay: function () {
      this.$router.push({ name: 'CalendarDay' });
    },
    goToSchedulerByWeek: function () {
      this.$router.push({ name: 'CalendarWeek' });
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
