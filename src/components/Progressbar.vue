<template>
  <div :class="['progress-bar', size=='mini'? 'mini':'medium']">
    <div
      :class="['progress',
        percentCurrent == 100? 'border-radius__both' : 'border-radius__head'
      ]"
      :style="'width:' + percentCurrent  + '%;' + 'background-color:' + colorProgress"
    ></div>
    <span
      v-for="item in listIndex"
      :key="item.id"
      :style="'left:' + item.percent + '%'"
      class="item"
    >
      <el-popover
        :placement="placement"
        width="200"
        :trigger="trigger"
      >
        <slot :item="item"></slot>
        <div slot="reference">
          <span class="item_child"></span>
        </div>
      </el-popover>
    </span>
  </div>
</template>
<script>
export default {
  props: [
    'placement',
    'trigger',
    'listIndex',
    'percentCurrent',
    'colorProgress',
    'size'
  ],
  data () {
    return {

    }
  },
  methods: {
  },
  mounted () {

  }
}
</script>
<style>
.progress-bar {
  width: 100%;
  position: relative;
  background-color: #eff0f4;
}
.mini {
  height: 10px;
  border-radius: 10px;
}

.medium {
  height: 20px;
  border-radius: 20px;
}

.progress {
  height: 100%;
}

.medium .border-radius__head {
  border-radius: 20px 0 0 20px;
}

.medium .border-radius__both {
  border-radius: 20px;
}

.mini .border-radius__head {
  border-radius: 10px 0 0 10px;
}

.mini .border-radius__both {
  border-radius: 10px;
}

.item {
  position: absolute;
  border-radius: 50%;
  background-color: #abb4bd;
  bottom: -160%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.medium .item {
  width: 10px;
  height: 10px;
}

.mini .item {
  width: 7px;
  height: 7px;
}

.item_child {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
