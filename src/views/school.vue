<template>
  <div style="overflow-y: hidden;">
    <canvas
      id="rubCanvas"
      ref="rubCanvas"
      :width="width"
      height="650"
      class="school-mask"
    >
    </canvas>
    <canvas
      id="canvas"
      ref="canvas"
      :width="width"
      height="650"
      class="school-mask"
      @mousedown="canvasDown($event)"
      @mousemove="canvasMove($event)"
      @mouseup="canvasUp($event)"
      @mouseleave="canvasLeave($event)"
    >
      抱歉，您的浏览器不支持canvas元素
    </canvas>
    <iframe src="https://hk2-powerpoint.officeapps.live.com/p/PowerPointFrame.aspx?PowerPointView=SlideShowView&ui=zh%2DCN&rs=zh%2DCN&WOPISrc=http%3A%2F%2Fhk2%2Dview%2Dwopi%2Ewopi%2Elive%2Enet%3A808%2Foh%2Fwopi%2Ffiles%2F%40%2FwFileId%3FwFileId%3Dhttp%253A%252F%252Fm%252Eyuemore%252Ecom%253A80%252Fxsdjy191112%252Epptx&access_token_ttl=0&wdSlideId=257&wdModeSwitchTime=1573543787864" width="100%" height="700" frameborder="0" scrolling="auto" id="ifra" style="position: absolute; z-index: 1;"></iframe>
    <div style="top: 672px; position: absolute; z-index: 2;">
    <el-button-group :style="showTool">
      <el-button type="primary" class="el-icon-edit" @click="pen"></el-button>
      <el-button type="primary" class="el-icon-delete" @click="empty"></el-button>
      <el-button type="primary" class="el-icon-edit-outline" @click="rubber"></el-button>
      <el-color-picker v-model="lineColor" size="mini"></el-color-picker>
    </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      // 设置画布宽度
      width: 500,
      // 指定canvas
      // canvas: '',
      // 设置2D渲染区域
      ctx: {},
      // 设置2D渲染橡皮擦
      rubCtx: {},
      // 是否可以在画板上绘制(画笔状态)
      canvasMoveUse: false,
      // 是否是橡皮擦
      canvasRubber: false,
      // 画笔宽度
      lineWidth: 5,
      // 画笔默认颜色
      lineColor: '#6fa4bd',
      // 是否显示工具
      showTool: 'display: none;'
    }
  },
  mounted() {
    this.initDraw()
    var _this = this
    const iframe = document.querySelector('#ifra')
    // 处理兼容行问题
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', function () {
        // iframe加载完毕以后执行操作
        _this.showTool = ""
      })
    } else {
      iframe.onload = function () {
        // iframe加载完毕以后执行操作
        _this.showTool = ""
      }
    }
  },
  created() {
    this.width = document.body.scrollWidth
  },
  methods: {
    // 初始化绘制信息
    initDraw() {
      // 初始化画布
      // this.canvas = this.$refs.canvas
      this.ctx = this.$refs.canvas.getContext('2d')
      this.ctx.lineWidth = this.lineWidth
      this.ctx.strokeStyle = this.lineColor
      this.rubCtx = this.$refs.rubCanvas.getContext('2d')
    },
    canvasDown(e) {
      this.canvasMoveUse = true
      const canvasX = e.clientX - e.target.offsetLeft
      const canvasY = e.clientY - e.target.offsetTop + document.documentElement.scrollTop
      // 移动的起点
      this.ctx.beginPath()
      this.ctx.moveTo(canvasX, canvasY)
    },
    canvasMove(e) {
      if (this.canvasMoveUse) {
        if (this.canvasRubber) {
          // 橡皮擦
          var w = 50;
					var pxs = this.rubCtx.getImageData(e.offsetX - w / 2, e.offsetY - w / 2, w, w)
					this.ctx.putImageData(pxs, e.offsetX - w / 2, e.offsetY - w / 2)
        } else {
          // 画笔书写
          this.ctx.strokeStyle = this.lineColor
          const t = e.target
          const canvasX = e.clientX - t.offsetLeft
          const canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop
          this.ctx.lineTo(canvasX, canvasY)
          this.ctx.stroke()
        }
      }
    },
    canvasUp(e) {
      this.canvasMoveUse = false
    },
    canvasLeave(e) {
      this.canvasMoveUse = false
    },
    penColorChange(e) {
      this.lineColor = e.target.value
    },
    // 是否使用画笔
    pen() {
      this.canvasMoveUse = true
      this.canvasRubber = false
    },
    // 清空画板
    empty() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    },
    // 使用橡皮擦
    rubber() {
      this.canvasRubber = true
      this.canvasMoveUse = false
    }
  }
}
</script>

<style scoped>
  .school-mask {
    overflow: auto;
    position: absolute;
    z-index: 2;
  }
</style>
