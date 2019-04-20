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
export default {
  name: 'Calendar2',
  mounted () {
    this.getDayofWeek(this.dateWeeken)
  },
  methods: {
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
  computed: {
    dayOfWeek: function () {
      return this.listDateofWeek
    }
  },
  data () {
    return {
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
  }
}
</script>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
  box-shadow: 0 2px 13px 0.5px rgba(0, 0, 0, 0.05);
  padding: 3px 5px;
  border: 1px solid gray;
  border-radius: 4px;
  word-break: break-word;
  margin-bottom: 3px;
  cursor: pointer;
}

.event .name {
  display: inline-block;
  text-align: left;
  font-size: 13px;
  font-family: inherit;
}
.margin-0 {
  margin: 0;
}

.padding-0 {
  padding: 0;
}
</style>
