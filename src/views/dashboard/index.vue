<template>
  <center>
    <h2>初一 上学期 数学 三班 第5节课时上课时间：2019年11月12日13:30</h2>
    <h2>距离上课时间还有 3小时21分钟</h2>
    <iframe src="https://view.officeapps.live.com/op/view.aspx?src=http%3a%2f%2fm.yuemore.com%2fxsdjy191112.pptx" width="100%" height="500px" frameborder="1" />
    <router-link class="pan-btn tiffany-btn" to="/school">
      进入教室
    </router-link>
  </center>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
  }
}
</script>
