<template>
  <div class="schedule">
    <el-row>
      <el-col
        v-if="isByDay"
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
      <el-col
        v-else
        :span="24"
        class="flex-col flex__center"
      >
        <el-button-group>
          <el-button
            @click="prev"
            type="primary"
            size="mini"
            icon="el-icon-arrow-left"
          >Previous Week</el-button>
          <el-button
            @click="next"
            size="mini"
            type="primary"
          >Next Week<i class="el-icon-arrow-right el-icon-right"></i></el-button>
        </el-button-group>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="450"
          size="mini"
        >
          <el-table-column
            label="Nơi chốn"
            prop="place"
            width="120"
            fixed="left"
          ></el-table-column>
          <el-table-column
            v-for="item in dayOfWeek"
            :key="item"
            :label="item"
            header-align="center"
            align="center"
          >
            <el-table-column
              label="Sáng"
              header-align="center"
              align="center"
              width="300"
            >
              <template slot-scope="scope">
                <div
                  v-for="event in listEvent"
                  :key="event.name"
                >
                  <div
                    v-if="(event.place_id === scope.row.id) && (getDateFormatFromDate(event.date) === item) && (getHoursFromDate(event.hoursStart) < 12)"
                    class="event"
                    @click="getEvent(event)"
                  >
                    <h6 class="name margin-0 padding-0">{{event.name}}</h6>
                    <div>{{getTimeFromDate(event.hoursStart)}} - {{getTimeFromDate(event.hoursEnd)}}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Chiều"
              header-align="center"
              align="center"
              width="300"
            >
              <template slot-scope="scope">
                <div
                  v-for="event in listEvent"
                  :key="event.name"
                  class="listEvent"
                >
                  <div
                    v-if="(event.place_id === scope.row.id) && (getDateFormatFromDate(event.date) === item) && (getHoursFromDate(event.hoursStart) > 12 || getHoursFromDate(event.hoursStart) == 12)"
                    class="event"
                    @click="getEvent(event)"
                  >
                    <h6 class="name margin-0 padding-0">{{event.name}}</h6>
                    <div>{{getTimeFromDate(event.hoursStart)}} - {{getTimeFromDate(event.hoursEnd)}}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment, { months } from 'moment'
export default {
  name: 'Schedule',
  props: ['isByDay'],
  computed: {
    dateCurrentFormatUTC: function () {
      return this.dateCurrent._d.toLocaleDateString(['ban', 'id'])
    },
    listEvents: function () {
      return this.listEvent
    },
    // computed by week
    dayOfWeek: function () {
      return this.listDateofWeek
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
    },

    // by week

    pad (num) {
      return ("0" + num).slice(-2);
    },
    getDateFormatFromDate (timestamp) {
      var date = new Date(timestamp * 1000)
      return date.toLocaleDateString(['ban', 'id']);
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



    prev () {
      var pastDate = this.dateWeeken.getDate() - 7;
      this.dateWeeken.setDate(pastDate);
      this.getDayofWeek(this.dateWeeken)
    },
    next () {
      var pastDate = this.dateWeeken.getDate() + 7;
      this.dateWeeken.setDate(pastDate);
      this.getDayofWeek(this.dateWeeken)
    },
    getDayofWeek (date) {
      this.listDateofWeek = []
      var first = date.getDate() - date.getDay();
      for (var i = 1; i < 8; i++) {
        var next = new Date(date.getTime());
        next.setDate(first + i);
        this.listDateofWeek.push(next.toLocaleDateString(['ban', 'id']));
      }
    },
    getEvent (value) {
      console.log(value)
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
        }
      ],
      // data week
      dateWeeken: new Date(),
      listEvent: [
        {
          place_id: 1,
          date: 1553045407,
          hoursStart: 1553045407,
          hoursEnd: 1553052607,
          name: 'Họp hội đồng quản trị thường niên Tổng công ty Mobifone'
        },
        {
          place_id: 3,
          date: 1553052607,
          hoursStart: 1553052607,
          hoursEnd: 1553059807,
          name: 'Họp hội đồng quản trị eoffice'
        },
        {
          place_id: 3,
          date: 1553045407,
          hoursStart: 1553045407,
          hoursEnd: 1553052607,
          name: 'Tình hình báo cáo nhân sự'
        },
        {
          place_id: 3,
          date: 1553665055,
          hoursStart: 1553665055,
          hoursEnd: 1553675855,
          name: 'Tình hình báo cáo nhân sự EOFFICE'
        },
        {
          place_id: 8,
          date: 1555816218,
          hoursStart: 1555816218,
          hoursEnd: 1555837818,
          name: 'Báo cáo tình hình phát triển trung tâm công nghệ thông tin Mobifone'
        },
        {
          place_id: 8,
          date: 1555816218,
          hoursStart: 1555837818,
          hoursEnd: 155583890,
          name: 'Báo cáo tình hình phát triển trung tâm công nghệ thông tin Mobifone'
        }
      ],
      listDateofWeek: [],
      tableData: [{
        id: 1,
        place: 'Phòng họp 12a'
      }, {
        id: 2,
        place: 'Phòng họp 12a'
      }, {
        id: 3,
        place: 'Phòng họp 12a'
      }, {
        id: 4,
        place: 'Phòng họp 12a'
      }, {
        id: 5,
        place: 'Phòng họp 12a'
      }, {
        id: 6,
        place: 'Phòng họp 12a'
      }, {
        id: 7,
        place: 'Phòng họp 12a'
      }, {
        id: 8,
        place: 'Phòng họp 12a'
      }, {
        id: 9,
        place: 'Phòng họp 12a'
      }, {
        id: 10,
        place: 'Phòng họp 12a'
      }, {
        id: 11,
        place: 'Phòng họp 12a'
      }]
    }
  },
  mounted () {
  },
}
</script>

<style scoped>
.listTime {
  display: grid;
  grid-auto-flow: column;
  padding: 0;
}
.itemTime {
  display: inline-block;
  width: 120px;
  margin: 0;
  padding: 0;
}

.list-event {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}

.event-item {
  position: absolute;
  height: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  box-shadow: 0 2px 13px 0.5px rgba(0, 0, 0, 0.05);
  padding: 3px 0;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}

.none {
  display: none;
}

.nameEvent {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
