<template>
  <center>
    <h2>初一 上学期 数学 三班 第5节课时上课时间：2019年11月12日13:30</h2>
    <h2>距离上课时间还有 3小时21分钟</h2>
    <router-link class="pan-btn tiffany-btn" to="/school">
      准备完毕,开始上课
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
