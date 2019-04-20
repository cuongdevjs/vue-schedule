<template>
  <Progressbar
    :placement="'bottom'"
    :trigger="'click'"
    :listIndex="listIndex"
    :percentCurrent="percentCurrent"
    :colorProgress="colorProgress"
    :size="size"
  >
    <template v-slot:default="slotProps">
      <p>nguyen manh cuong</p>
      <p>{{slotProps.item.percent + 10}}</p>
    </template>
  </Progressbar>
</template>

<script>
import Progressbar from './Progressbar.vue'
export default {
  name: 'app',
  components: {
    Progressbar
  },
  data () {
    return {
      percentCurrent: 80,
      colorProgress: '#5ac8fa',
      size: 'mini',
      listIndex: [
        {
          id: 1,
          percent: 10
        },
        {
          id: 2,
          percent: 80
        },
        {
          id: 3,
          percent: 20
        }, {
          id: 4,
          percent: 50
        },
        {
          id: 5,
          percent: 60
        }
      ]
    }
  }
}
</script>
