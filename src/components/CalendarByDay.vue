<template>
  <div class="schedule">
    <el-row>
      <el-col
        :span="24"
        class="flex-col flex__center"
      >
        <el-button-group>
          <el-button
            @click="prev"
            type="primary"
            size="mini"
            icon="el-icon-arrow-left"
          >
            Previous Day
          </el-button>
          <el-button
            plain
            disabled
            size="mini"
          >
            {{dateCurrentFormatUTC}}
          </el-button>
          <el-button
            @click="next"
            size="mini"
            type="primary"
          >
            Next Day
            <i class="el-icon-arrow-right el-icon-right"></i>
          </el-button>
        </el-button-group>
        <el-table
          :data="tableData"
          style="width: 100%"
          size="large"
          height="450"
        >
          <el-table-column
            label="Nơi chốn"
            prop="place"
            width="150"
            fixed="left"
          ></el-table-column>
          <el-table-column
            header-align="left"
            align="left"
            width="1200"
          >
            <template slot="header">
              <div class="listTime">
                <div
                  v-for="time in listTimeline"
                  :key="time"
                  class="itemTime"
                >
                  {{time}}
                </div>
              </div>
            </template>
            <template slot-scope="scope">
              <div class="list-event">
                <div class="width__100 height__100">
                  <div
                    v-for="(event, index) in listEvents"
                    :key="index"
                    :class="['event-item', scope.row.id === event.place_id? '' : 'none' ]"
                    :style=" 'left:' + getDistanceToLeft(event.hoursStart) + 'px;' +
                  'width: ' + getWidthAEvent(event.hoursStart, event.hoursEnd) + 'px'"
                    @click="getEvent(event)"
                  >
                    <div
                      v-if="scope.row.id === event.place_id"
                      class="width__100 height__100"
                    >
                      <div class="nameEvent">{{event.name}}</div>
                      <div>{{getTimeFromDate(event.hoursStart)}} - {{getTimeFromDate(event.hoursEnd)}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment, { months } from 'moment'
export default {
  name: 'Calendar2',
  computed: {
    dateCurrentFormatUTC: function () {
      return this.dateCurrent._d.toLocaleDateString(['ban', 'id'])
    },
    listEvents: function () {
      return this.listEvent
    }
  },
  methods: {
    pad (num) {
      return ("0" + num).slice(-2);
    },

    getTimeFromDate (timestamp) {
      var date = new Date(timestamp * 1000);
      var minutes = date.getMinutes();
      var hours = date.getHours();
      return this.pad(hours) + ':' + this.pad(minutes);
    },
    getHoursFromDate (timestamp) {
      var date = new Date(timestamp * 1000);
      var hours = date.getHours();
      return this.pad(hours)
    },
    getMinutesFromDate (timestamp) {
      var date = new Date(timestamp * 1000);
      var minutes = date.getMinutes();
      return this.pad(minutes)
    },

    getDistanceToLeft (start) {
      let distanceHours = (this.getHoursFromDate(start) - 8) * 120
      let distanceMinutes = this.getMinutesFromDate(start) * 2
      return (distanceHours + distanceMinutes + 10)
    },

    getWidthAEvent (start, end) {
      let distanceHours = (this.getHoursFromDate(end) - this.getHoursFromDate(start)) * 120
      let distanceMinutes = (this.getMinutesFromDate(end) - this.getMinutesFromDate(start)) * 2
      return (distanceHours + distanceMinutes)
    },

    prev () {
      this.dateCurrent = moment(this.dateCurrent).add(-1, 'days');
      this.$emit('prevDay')
    },
    next () {
      this.dateCurrent = moment(this.dateCurrent).add(1, 'days');
      this.$emit('nextDay')
    },

    getEvent (event) {
      this.$emit('getEvent', event)
    }
  },
  data () {
    return {
      dateCurrent: moment().utc(),
      listEvent: [
        {
          place_id: 1,
          hoursStart: 1553045407,
          hoursEnd: 1553052607,
          name: 'Họp hội đồng quản trị thường niên Tổng công ty Mobifone'
        },
        {
          place_id: 3,
          hoursStart: 1553052607,
          hoursEnd: 1553059807,
          name: 'Họp hội đồng quản trị eoffice'
        },
        {
          place_id: 3,
          hoursStart: 1553045407,
          hoursEnd: 1553052607,
          name: 'Tình hình báo cáo nhân sự'
        },
        {
          place_id: 2,
          hoursStart: 1553045407,
          hoursEnd: 1553052607,
          name: 'Tình hình báo cáo nhân sự'
        },
        {
          place_id: 8,
          hoursStart: 1555816218,
          hoursEnd: 1555837818,
          name: 'Báo cáo tình hình phát triển trung tâm công nghệ thông tin Mobifone'
        }
      ],
      listTimeline: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
      tableData: [
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
        }]
    }
  },
  mounted () {
  },
}
</script>

<style scoped>
</style>
