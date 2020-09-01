<template>
  <div class="echarts-demo">
    <div class="charts-box">
      <div class="title">词云图</div>
      <div id="chart1" class="chart"></div>
    </div>
    <div class="charts-box">
      <div class="title">折线图</div>
      <div id="chart2" class="chart"></div>
    </div>
    <div class="charts-box">
      <div class="title">象形图</div>
      <div id="chart3" class="chart"></div>
    </div>
    <div class="charts-box">
      <div class="title">可滚动柱状图</div>
      <div id="chart4" class="chart"></div>
    </div>

    <div class="charts-box">
      <div class="title">双Y轴</div>
      <div id="chart6" class="chart chart6"></div>
    </div>
    <div class="charts-box">
      <div class="title">柱状图 + markPoint</div>
      <div id="chart7" class="chart chart7"></div>
    </div>
    <div class="charts-box">
      <div class="title">pictorialBar + markPoint</div>
      <div id="chart8" class="chart chart8"></div>
    </div>

    <!-- 放最后 -->
    <div class="charts-box charts-box5">
      <div class="title">树形图</div>
      <div id="chart5" class="chart chart5"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import debounce from '@/utils/debounce';
// import deepClone from '@/utils/deepClone';
// 需要安装echarts-wordcloud
// import 'echarts-wordcloud';

export default {
  data() {
    return {
      startIndex: 0,
      endIndex: 5
    };
  },
  created() {
    // 词云图
    // this.getChartData();
    // 折线图--上下分布（堆叠）---用于占比（总和100）
    const arr1 = [120, 322, 11, 624, 9, 520, 60];
    const arr2 = [80, 168, 89, 326, 91, 50, 40];
    this.renderLine(arr1, arr2);
    this.renderPicBar();
    this.renderZoom();
    this.renderTree();
    this.renderDoubleY();
    this.renderPoint();
    this.renderPictor();
  },
  mounted() {
    this.$nextTick(() => {
      this.arr = [this.chart1, this.chart2, this.chart3, this.chart4, this.chart5, this.chart6, this.chart7, this.chart8];

      this.resizeHandle = debounce(() => {
        this.arr.forEach(item => {
          if (item) item.resize();
        });
      }, 200);
      window.addEventListener('resize', this.resizeHandle);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandle);
    this.arr.forEach(item => {
      if (item) {
        item.dispose();
        item = null;
      }
    });
  },
  methods: {
    // 词云图
    getChartData() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.chart1 = this.$echarts.init(document.getElementById('chart1'));
          const maskImage = new Image();

          maskImage.src = require('@/assets/images/test.jpg');
          maskImage.onload = () => {
            this.chart1.setOption({
              tooltip: {
                show: true
              },
              series: [{
                type: 'wordCloud',
                gridSize: 6,
                shape: 'circle',
                sizeRange: [12, 50],
                maskImage: maskImage,
                width: '80%',
                height: '80%',
                drawOutOfBound: false,
                textStyle: {
                  normal: {
                    color: function() {
                      return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                      ].join(',') + ')';
                    }
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                  }
                },
                data: [

                  {
                    name: ' 没有1',
                    value: 1700
                  },
                  {
                    name: ' 没有',
                    value: 2333
                  },
                  {
                    name: ' 没有',
                    value: 545
                  },
                  {
                    name: ' 没有',
                    value: 7677
                  },

                  {
                    name: ' 没有',
                    value: 53
                  }, {
                    name: ' 没有',
                    value: 87
                  },
                  {
                    name: ' 没有',
                    value: 97
                  },

                  {
                    name: ' 没有',
                    value: 34
                  },
                  {
                    name: ' 没有',
                    value: 54
                  },
                  {
                    name: ' 没有',
                    value: 13
                  },
                  {
                    name: ' 没有',
                    value: 65
                  },
                  {
                    name: ' 没有',
                    value: 144
                  },

                  {
                    name: ' 屏幕',
                    value: 24
                  },
                  {
                    name: ' 不错',
                    value: 21
                  },
                  {
                    name: ' 可以',
                    value: 19
                  },
                  {
                    name: ' 发货',
                    value: 18
                  },
                  {
                    name: ' 这个',
                    value: 18
                  },
                  {
                    name: ' 什么',
                    value: 17
                  },
                  {
                    name: ' 一个',
                    value: 12
                  },
                  {
                    name: ' 不好',
                    value: 12
                  },
                  {
                    name: ' 质量',
                    value: 11
                  },
                  {
                    name: ' 快递',
                    value: 11
                  },
                  {
                    name: ' 问题',
                    value: 10
                  },
                  {
                    name: ' 物流',
                    value: 9
                  },
                  {
                    name: ' 几天',
                    value: 9
                  },
                  {
                    name: ' 一般',
                    value: 9
                  },
                  {
                    name: ' 就是',
                    value: 9
                  },
                  {
                    name: ' 使用',
                    value: 8
                  },
                  {
                    name: ' 怎么',
                    value: 8
                  },
                  {
                    name: ' 电池',
                    value: 8
                  },
                  {
                    name: ' 不能',
                    value: 8
                  },
                  {
                    name: ' 速度',
                    value: 8
                  },
                  {
                    name: ' 客服',
                    value: 8
                  },
                  {
                    name: ' 一星',
                    value: 8
                  },
                  {
                    name: ' 拍照',
                    value: 8
                  },
                  {
                    name: ' 摄像头',
                    value: 7
                  },
                  {
                    name: ' 外观',
                    value: 7
                  },
                  {
                    name: ' 包装',
                    value: 7
                  },
                  {
                    name: ' 到货',
                    value: 7
                  },
                  {
                    name: ' 有点',
                    value: 7
                  },
                  {
                    name: ' 抢购',
                    value: 6
                  },
                  {
                    name: ' 这样',
                    value: 6
                  },
                  {
                    name: ' 性价比',
                    value: 6
                  },
                  {
                    name: ' 一般般',
                    value: 6
                  },
                  {
                    name: ' 出现',
                    value: 6
                  },
                  {
                    name: ' 以前',
                    value: 6
                  },
                  {
                    name: ' 知道',
                    value: 6
                  },
                  {
                    name: ' 一次',
                    value: 6
                  },
                  {
                    name: ' 真的',
                    value: 6
                  },
                  {
                    name: ' 收到',
                    value: 6
                  },
                  {
                    name: ' 其他',
                    value: 6
                  },
                  {
                    name: ' 电量',
                    value: 6
                  },
                  {
                    name: ' 还是',
                    value: 6
                  },
                  {
                    name: ' 不行',
                    value: 6
                  },
                  {
                    name: ' 红米',
                    value: 6
                  },
                  {
                    name: ' 那么',
                    value: 6
                  },
                  {
                    name: ' 挺快',
                    value: 5
                  },
                  {
                    name: ' 现在',
                    value: 5
                  },
                  {
                    name: ' 服务',
                    value: 5
                  },
                  {
                    name: ' 充电',
                    value: 5
                  },
                  {
                    name: ' 流畅',
                    value: 5
                  },
                  {
                    name: ' 系统',
                    value: 5
                  },
                  {
                    name: ' 非常',
                    value: 5
                  },
                  {
                    name: ' 满意',
                    value: 5
                  },
                  {
                    name: ' 购物',
                    value: 5
                  },
                  {
                    name: ' 玩游戏',
                    value: 5
                  },
                  {
                    name: ' 信号',
                    value: 5
                  },
                  {
                    name: ' 不了',
                    value: 5
                  },
                  {
                    name: ' 别人',
                    value: 5
                  },
                  {
                    name: ' 死机',
                    value: 5
                  },
                  {
                    name: ' 耗电',
                    value: 5
                  },
                  {
                    name: ' 一直',
                    value: 5
                  },
                  {
                    name: ' 像素',
                    value: 5
                  },
                  {
                    name: ' 第一次',
                    value: 5
                  },
                  {
                    name: ' 广告',
                    value: 5
                  },
                  {
                    name: ' 买个',
                    value: 5
                  },
                  {
                    name: ' 黑屏',
                    value: 5
                  },
                  {
                    name: ' 为什么',
                    value: 4
                  },
                  {
                    name: ' 猴王',
                    value: 4
                  },
                  {
                    name: ' 视频',
                    value: 4
                  },
                  {
                    name: ' 体验',
                    value: 4
                  },
                  {
                    name: ' 好评',
                    value: 4
                  },
                  {
                    name: ' 闪屏',
                    value: 4
                  },
                  {
                    name: ' 价格',
                    value: 4
                  },
                  {
                    name: ' 饥饿',
                    value: 4
                  },
                  {
                    name: ' 营销',
                    value: 4
                  },
                  {
                    name: ' 发热',
                    value: 4
                  },
                  {
                    name: ' 还行',
                    value: 4
                  },
                  {
                    name: ' 一天',
                    value: 4
                  },
                  {
                    name: ' 需要',
                    value: 4
                  },
                  {
                    name: ' 特别',
                    value: 4
                  },
                  {
                    name: ' 而且',
                    value: 4
                  },
                  {
                    name: ' 运行',
                    value: 4
                  },
                  {
                    name: ' 等到',
                    value: 4
                  },
                  {
                    name: ' 手机卡',
                    value: 4
                  },
                  {
                    name: ' 呵呵',
                    value: 4
                  },
                  {
                    name: ' 时候',
                    value: 4
                  },
                  {
                    name: ' 东西',
                    value: 4
                  },
                  {
                    name: ' 感觉',
                    value: 4
                  },
                  {
                    name: ' 卡机',
                    value: 4
                  },
                  {
                    name: ' 没什么',
                    value: 4
                  },
                  {
                    name: ' 大家',
                    value: 4
                  },
                  {
                    name: ' 没货',
                    value: 4
                  },
                  {
                    name: ' 售后',
                    value: 4
                  },
                  {
                    name: ' 比较',
                    value: 4
                  },
                  {
                    name: ' 退货',
                    value: 4
                  },
                  {
                    name: ' 加价',
                    value: 3
                  },
                  {
                    name: ' 耳机',
                    value: 3
                  },
                  {
                    name: ' 呜呜',
                    value: 3
                  },
                  {
                    name: ' 一分钱',
                    value: 3
                  },
                  {
                    name: ' 一分货',
                    value: 3
                  },
                  {
                    name: ' 默认',
                    value: 3
                  },
                  {
                    name: ' 说好',
                    value: 3
                  },
                  {
                    name: ' 你们',
                    value: 3
                  },
                  {
                    name: ' 一点',
                    value: 3
                  },
                  {
                    name: ' 超级',
                    value: 3
                  },
                  {
                    name: ' 耐用',
                    value: 3
                  },
                  {
                    name: ' 很快',
                    value: 3
                  },
                  {
                    name: ' 断流',
                    value: 3
                  },
                  {
                    name: ' 套装',
                    value: 3
                  },
                  {
                    name: ' 一样',
                    value: 3
                  },
                  {
                    name: ' 发票',
                    value: 3
                  },
                  {
                    name: ' 买回来',
                    value: 3
                  },
                  {
                    name: ' 软件',
                    value: 3
                  },
                  {
                    name: ' 还好',
                    value: 3
                  },
                  {
                    name: ' 以后',
                    value: 3
                  },
                  {
                    name: ' 下单',
                    value: 3
                  },
                  {
                    name: ' 打游戏',
                    value: 3
                  },
                  {
                    name: ' 我们',
                    value: 3
                  },
                  {
                    name: ' 但是',
                    value: 3
                  },
                  {
                    name: ' 一部',
                    value: 3
                  },
                  {
                    name: ' 王者',
                    value: 3
                  },
                  {
                    name: ' 不怎么样',
                    value: 3
                  },
                  {
                    name: ' 看看',
                    value: 3
                  },
                  {
                    name: ' 自己',
                    value: 3
                  },
                  {
                    name: ' 里面',
                    value: 3
                  },
                  {
                    name: ' 边框',
                    value: 3
                  },
                  {
                    name: ' 看着',
                    value: 3
                  },
                  {
                    name: ' 要死',
                    value: 3
                  },
                  {
                    name: ' 原因',
                    value: 3
                  },
                  {
                    name: ' 新机',
                    value: 3
                  },
                  {
                    name: ' 不如',
                    value: 3
                  },
                  {
                    name: ' 老是',
                    value: 3
                  },
                  {
                    name: ' 购买',
                    value: 3
                  },
                  {
                    name: ' 更好',
                    value: 3
                  },
                  {
                    name: ' 相机',
                    value: 3
                  },
                  {
                    name: ' 竟然',
                    value: 3
                  },
                  {
                    name: ' 一分',
                    value: 3
                  },
                  {
                    name: ' 天才',
                    value: 3
                  },
                  {
                    name: ' 荣耀',
                    value: 3
                  },
                  {
                    name: ' 正常',
                    value: 3
                  },
                  {
                    name: ' 回复',
                    value: 3
                  },
                  {
                    name: ' 联系',
                    value: 3
                  },
                  {
                    name: ' 总体',
                    value: 3
                  },
                  {
                    name: ' 反应',
                    value: 3
                  },
                  {
                    name: ' 老爸',
                    value: 3
                  },
                  {
                    name: ' 星期',
                    value: 3
                  },
                  {
                    name: ' 半个',
                    value: 3
                  },
                  {
                    name: ' 打电话',
                    value: 3
                  },
                  {
                    name: ' 不是',
                    value: 3
                  },
                  {
                    name: ' 保护膜',
                    value: 3
                  },
                  {
                    name: ' 充电器',
                    value: 3
                  },
                  {
                    name: ' 买不到',
                    value: 2
                  },
                  {
                    name: ' 老子',
                    value: 2
                  },
                  {
                    name: ' 差评',
                    value: 2
                  },
                  {
                    name: ' 这么',
                    value: 2
                  },
                  {
                    name: ' 真香',
                    value: 2
                  },
                  {
                    name: ' 真是',
                    value: 2
                  },
                  {
                    name: ' 三天',
                    value: 2
                  },
                  {
                    name: ' 填写内容',
                    value: 2
                  },
                  {
                    name: ' 帮别人',
                    value: 2
                  },
                  {
                    name: ' 终于',
                    value: 2
                  },
                  {
                    name: ' 有时候',
                    value: 2
                  },
                  {
                    name: ' 极致',
                    value: 2
                  },
                  {
                    name: ' 还有',
                    value: 2
                  },
                  {
                    name: ' 希望',
                    value: 2
                  },
                  {
                    name: ' 必须',
                    value: 2
                  },
                  {
                    name: ' 好像',
                    value: 2
                  },
                  {
                    name: ' 严重',
                    value: 2
                  },
                  {
                    name: ' 反应速度',
                    value: 2
                  },
                  {
                    name: ' 后面',
                    value: 2
                  },
                  {
                    name: ' 音乐',
                    value: 2
                  },
                  {
                    name: ' 商品',
                    value: 2
                  },
                  {
                    name: ' 哈哈',
                    value: 2
                  },
                  {
                    name: ' 垃圾',
                    value: 2
                  },
                  {
                    name: ' 好用',
                    value: 2
                  },
                  {
                    name: ' 突出',
                    value: 2
                  },
                  {
                    name: ' 价钱',
                    value: 2
                  },
                  {
                    name: ' 耍猴',
                    value: 2
                  },
                  {
                    name: ' 磕碰',
                    value: 2
                  },
                  {
                    name: ' 几次',
                    value: 2
                  },
                  {
                    name: ' 失灵',
                    value: 2
                  },
                  {
                    name: ' 支持',
                    value: 2
                  },
                  {
                    name: ' 快充',
                    value: 2
                  },
                  {
                    name: ' 意思',
                    value: 2
                  },
                  {
                    name: ' 失败',
                    value: 2
                  },
                  {
                    name: ' 整整',
                    value: 2
                  },
                  {
                    name: ' 没收',
                    value: 2
                  },
                  {
                    name: ' 已经',
                    value: 2
                  },
                  {
                    name: ' 无法',
                    value: 2
                  },
                  {
                    name: ' 方面',
                    value: 2
                  },
                  {
                    name: ' 为啥',
                    value: 2
                  },
                  {
                    name: ' 喜欢',
                    value: 2
                  },
                  {
                    name: ' 套餐',
                    value: 2
                  },
                  {
                    name: ' 完全',
                    value: 2
                  },
                  {
                    name: ' 专业',
                    value: 2
                  },
                  {
                    name: ' 选择',
                    value: 2
                  },
                  {
                    name: ' 48mp',
                    value: 2
                  },
                  {
                    name: ' 无线',
                    value: 2
                  },
                  {
                    name: ' 一个月',
                    value: 2
                  },
                  {
                    name: ' 不过',
                    value: 2
                  },
                  {
                    name: ' ldquo',
                    value: '-'
                  },
                  {
                    name: ' rdquo',
                    value: '-'
                  },
                  {
                    name: ' 这种',
                    value: 2
                  },
                  {
                    name: ' 送货',
                    value: 2
                  },
                  {
                    name: ' 卡死',
                    value: 2
                  },
                  {
                    name: ' 来看',
                    value: 2
                  },
                  {
                    name: ' 糊弄人',
                    value: 2
                  },
                  {
                    name: ' note7',
                    value: 2
                  },
                  {
                    name: ' 时间',
                    value: 2
                  },
                  {
                    name: ' 短信',
                    value: 2
                  },
                  {
                    name: ' 滑落',
                    value: 2
                  },
                  {
                    name: ' 那样',
                    value: 2
                  },
                  {
                    name: ' vivo',
                    value: 2
                  },
                  {
                    name: ' 防水',
                    value: 2
                  },
                  {
                    name: ' 等待',
                    value: 2
                  },
                  {
                    name: ' 直播',
                    value: 2
                  },
                  {
                    name: ' 难受',
                    value: 2
                  },
                  {
                    name: ' 四个',
                    value: 2
                  },
                  {
                    name: ' 到手',
                    value: 2
                  },
                  {
                    name: ' 发现',
                    value: 2
                  },
                  {
                    name: ' 掉电',
                    value: 2
                  },
                  {
                    name: ' 华为',
                    value: 2
                  },
                  {
                    name: ' 再也',
                    value: 2
                  },
                  {
                    name: ' 不用',
                    value: 2
                  },
                  {
                    name: ' 给力',
                    value: 2
                  },
                  {
                    name: ' 两天',
                    value: 2
                  },
                  {
                    name: ' 立马',
                    value: 2
                  },
                  {
                    name: ' 两周',
                    value: 2
                  },
                  {
                    name: ' 处理器',
                    value: 2
                  },
                  {
                    name: ' 关机',
                    value: 2
                  },
                  {
                    name: ' 要么',
                    value: 2
                  },
                  {
                    name: ' 满血',
                    value: 2
                  },
                  {
                    name: ' 不会',
                    value: 2
                  },
                  {
                    name: ' 定金',
                    value: 2
                  },
                  {
                    name: ' 付款',
                    value: 2
                  },
                  {
                    name: ' 心情',
                    value: 2
                  },
                  {
                    name: ' 另外',
                    value: 2
                  },
                  {
                    name: ' 游戏',
                    value: 2
                  },
                  {
                    name: ' 公司',
                    value: 2
                  },
                  {
                    name: ' 按键',
                    value: 2
                  },
                  {
                    name: ' 卡顿',
                    value: 2
                  },
                  {
                    name: ' 晚上',
                    value: 2
                  },
                  {
                    name: ' 百分之',
                    value: 2
                  },
                  {
                    name: ' 手机信号',
                    value: 2
                  },
                  {
                    name: ' 一下',
                    value: 2
                  },
                  {
                    name: ' 开学',
                    value: 2
                  },
                  {
                    name: ' 上班',
                    value: 2
                  },
                  {
                    name: ' 上天',
                    value: 2
                  },
                  {
                    name: ' 配送',
                    value: 2
                  },
                  {
                    name: ' 最后',
                    value: 2
                  },
                  {
                    name: ' 太慢',
                    value: 2
                  },
                  {
                    name: ' 手机套',
                    value: 2
                  },
                  {
                    name: ' 笨重',
                    value: 2
                  },
                  {
                    name: ' 半年',
                    value: 2
                  },
                  {
                    name: ' 屏险',
                    value: 2
                  },
                  {
                    name: ' 先发',
                    value: 2
                  },
                  {
                    name: ' 不灵敏',
                    value: 2
                  },
                  {
                    name: ' 硬度',
                    value: 2
                  },
                  {
                    name: ' 这次',
                    value: 2
                  },
                  {
                    name: ' 性能',
                    value: 2
                  },
                  {
                    name: ' 介绍',
                    value: 2
                  },
                  {
                    name: ' 卡针',
                    value: 2
                  },
                  {
                    name: ' 不理',
                    value: 2
                  },
                  {
                    name: ' 这是',
                    value: 2
                  },
                  {
                    name: ' 买来',
                    value: 2
                  },
                  {
                    name: ' 两次',
                    value: 2
                  },
                  {
                    name: ' 网络',
                    value: 2
                  },
                  {
                    name: ' 就裂',
                    value: 2
                  },
                  {
                    name: ' 没用',
                    value: 2
                  },
                  {
                    name: ' 多次',
                    value: 2
                  },
                  {
                    name: ' 钢化',
                    value: 2
                  },
                  {
                    name: ' 一星怪',
                    value: 1
                  },
                  {
                    name: ' 新款',
                    value: 1
                  },
                  {
                    name: ' 你行',
                    value: 1
                  },
                  {
                    name: ' 没送',
                    value: 1
                  },
                  {
                    name: ' 一个多',
                    value: 1
                  },
                  {
                    name: ' 礼拜',
                    value: 1
                  },
                  {
                    name: ' 只能',
                    value: 1
                  },
                  {
                    name: ' 价位',
                    value: 1
                  },
                  {
                    name: ' 闪退',
                    value: 1
                  },
                  {
                    name: ' 抢到',
                    value: 1
                  },
                  {
                    name: ' 其它',
                    value: 1
                  },
                  {
                    name: ' 便宜',
                    value: 1
                  },
                  {
                    name: ' 两百',
                    value: 1
                  },
                  {
                    name: ' 盈利',
                    value: 1
                  },
                  {
                    name: ' 机智',
                    value: 1
                  },
                  {
                    name: ' 更新换代',
                    value: 1
                  },
                  {
                    name: ' 太乱',
                    value: 1
                  },
                  {
                    name: ' 赔付',
                    value: 1
                  },
                  {
                    name: ' 自营',
                    value: 1
                  },
                  {
                    name: ' 产品',
                    value: 1
                  },
                  {
                    name: ' 手持',
                    value: 1
                  },
                  {
                    name: ' 夜景',
                    value: 1
                  },
                  {
                    name: ' 机子',
                    value: 1
                  },
                  {
                    name: ' 拆过',
                    value: 1
                  }
                ]
              }]
            });

            this.resizeHandle();
          };
        });
      }, 500);
    },
    // 折线图--上下分布
    renderLine(arr1, arr2) {
      this.$nextTick(() => {
        this.chart2 = this.$echarts.init(document.getElementById('chart2'));
        this.chart2.setOption({
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              const index = params[0].dataIndex;
              return `
                <p style="padding: 0 5px">男：${arr1[index]}人</p>
                <p style="padding: 0 5px">女：${arr2[index]}人</p>
              `;
            }
          },
          // legend: {
          //   data: ['邮件营销', '联盟广告']
          // },
          grid: {
            left: '6%',
            right: '6%',
            bottom: '8%',
            containLabel: false
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#D8C8C7'
                }
              },
              axisLabel: {
                fontSize: 12,
                color: '#666'
              },
              axisTick: {
                show: false
              },
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            { name: '邮件营销',
              splitNumber: 10,
              max: 100,
              type: 'value',
              show: false
            }

          ],
          series: [
            {
              name: '邮件营销',
              type: 'line',
              smooth: true,
              stack: '总量',
              label: {
                show: true,
                color: '#666',
                position: [-15, -15],
                formatter: function(data) {
                  // console.log(per)
                  return `${(100 - data.value).toFixed(2)}% \r\n\r\n ${data.value}%`;
                }
              },
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 1,
                  y: 1,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                    offset: 1, color: 'red' // 0% 处的颜色
                  }, {
                    offset: 0, color: '#fff' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
              data: [20, 32, 11, 64, 9, 50, 60]
            },
            {
              name: '联盟广告',
              type: 'line',
              smooth: true,
              stack: '总量',
              symbolSize: 0.001,
              // showSymbol: false,
              hoverAnimation: false,
              label: {
                show: true,
                fontSize: 12,
                //   position: [0, '100%'],
                position: 'top',
                //   distance:
                offset: [0, 440],
                formatter: function(data) {
                  const woman = [80, 68, 89, 36, 91, 50, 40];

                  const per = (woman[data.dataIndex] / 100) * 100;
                  // console.log(per)
                  return `${per.toFixed()}%`;
                }
              },

              lineStyle: {
                opacity: 0
              },
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 1,
                  y: 1,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                    offset: 0, color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#fff' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
              data: [80, 68, 89, 36, 91, 50, 40]
            }
          ]
        });
      });
    },
    // 象形图
    renderPicBar() {
      this.$nextTick(() => {
        this.chart3 = this.$echarts.init(document.getElementById('chart3'));
        // var imgDatUrl = `image://${this.pic}`;
        // console.log(imgDatUrl, 9990);
        var dimensions = ['公交', '地铁', '长途客车', '出租', '铁路', '航空', '机场大巴'];
        var currentMonth = [0, 36, 13, 56, 9, 28, 33];
        // var lastMonth = [39, 17, 23, 45, 10, 20, 39];
        // var lastMonth = [];
        const option = {
          backgroundColor: '#262A35',
          grid: {
            left: '6%',
            right: '6%',
            bottom: '8%',
            containLabel: false
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: data => this.setTooltip(data[0])
          },
          xAxis: {
            type: 'category',
            data: dimensions,
            axisLabel: {
              interval: 0,
              color: '#51637D'
            },
            axisLine: {
              lineStyle: {
                color: '#51637D'
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#51637D'
              }
            }
          },
          yAxis: {
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#51637D'
            },
            axisLine: {
              lineStyle: {
                color: '#51637D'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#51637D'
              }
            }
          },
          series: [
            {
              name: '本月',
              type: 'pictorialBar',
              symbol: `image://${require('@/assets/images/yellow.png')}`,
              barWidth: 15,
              barGap: 0,
              // stack: 'all',
              // symbolOffset: [0, -3],
              data: currentMonth
            }
            // {
            //   show: false,
            //   name: '上月',
            //   type: 'pictorialBar',
            //   barWidth: 15,
            //   barGap: '-100%',
            //   symbol: `image://${require('@/assets/images/orange.png')}`,
            //   // symbolOffset: [0, -3],
            //   // stack: 'all',

          //   data: lastMonth
          // }
          ]
        };
        this.chart3.setOption(option);
      });
    },
    // 可滚动柱状图
    renderZoom() {
      this.$nextTick(() => {
        this.chart4 = this.$echarts.init(document.getElementById('chart4'));
        const xData = ['2012年文字超长', '2013超长文字换行', '2014换行显示', '2015', '2016', '2017', '2018', '2019'];
        this.data1 = [400, 800, 300, 300, 300, 400, 100, 400];
        this.data2 = [400, 500, 200, 500, 500, 400, 200, 400];

        // 设置一屏显示柱子个数
        const len = xData.length;
        // 如果总个数大于5，设置一屏5个，否则全屏显示（并且不显示滚动条）
        if (len > 6) {
          this.dataZoomEnd = (5 / len) * 100;
        } else {
          this.dataZoomEnd = 100;
        }

        const option = {
          backgroundColor: '#323a5e',
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'none' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '14%',
            top: '16%',
            containLabel: true
          },
          legend: {
            data: ['1', '2', '3'],
            right: 10,
            top: 12,
            textStyle: {
              color: '#fff'
            },
            itemWidth: 12,
            itemHeight: 10
            // itemGap: 35
          },
          xAxis: {
            type: 'category',
            data: xData,
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
            axisLabel: {
              interval: 0, // 间隔显示
              formatter: function(data) {
                const strs = data.split('');
                let str = '';
                strs.forEach((item, index) => {
                  const i = index + 1;
                  str += item;
                  if (!(i % 4)) str += '\n';
                });
                return str;
              },
              textStyle: {
                fontFamily: 'Microsoft YaHei'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: 'white'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.3)'
              }
            },
            axisLabel: {}
            // 如果不想让柱子高度随着滚动条高度变化，需要设置最大值，
            // max: this.max
          },
          dataZoom: {
            show: true,
            textStyle: false, // 隐藏滚动条两端文字
            height: 15, // 滚动条高度
            start: 1, // 滚动条开始位置（总共100）
            end: this.dataZoomEnd // 滚动结束位置
          },
          series: [
            {
              name: '1',
              type: 'bar',
              barWidth: '15%',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#fccb05'
                  }, {
                    offset: 1,
                    color: '#f5804d'
                  }]),
                  barBorderRadius: 12
                }
              },
              data: this.data1
            },
            {
              name: '2',
              type: 'bar',
              barWidth: '15%',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#8bd46e'
                  }, {
                    offset: 1,
                    color: '#09bcb7'
                  }]),
                  barBorderRadius: 11
                }

              },
              data: this.data2,
              // 设置markPoint 提示框
              markPoint: {
                data: this.setData(),
                symbolSize: 1,
                label: {
                  position: 'top',
                  distance: 30,
                  backgroundColor: '#eee',
                  borderRadius: 4,
                  padding: [8, 10],
                  formatter: data => this.setMark(data),
                  rich: {
                    a: {
                      color: 'red',
                      fontSize: 12,
                      fontWeight: 'bold',
                      textBorderWidth: 0,
                      textBorderColor: 'transparent'
                    },
                    b: {
                      color: '#505050',
                      fontSize: 12,
                      fontWeight: 'normal',
                      textBorderWidth: 0,
                      textBorderColor: 'transparent'
                    }
                  }
                }
              }
            }
          ]
        };
        this.chart4.setOption(option);
        // 监听滚动条滚动
        this.chart4.on('dataZoom', params => {
          const data = this.chart4.getOption().dataZoom[0];
          this.startIndex = data.startValue;
          this.endIndex = data.endValue;
        });
      });
    },
    setTooltip(item) {
      // console.log(item, 9982);
    },
    // 设置markPoint
    setMark(data) {
      // data为data2里大于300的坐标位置
      return `{b|增加} {a|}${this.data2[data.data.xAxis]}`;
    },
    setData() {
      this.arr = [];
      // 过滤出所有需要显示的大于300的
      this.data2.forEach((item, index) => {
        const obj = {
          xAxis: 0,
          yAxis: 0,
          name: '数值：'
        };
        if (item >= 300) {
          obj.xAxis = index;
          obj.yAxis = item;
          this.arr.push(obj);
        }
      });
      return this.arr;
    },
    // 树形图
    renderTree() {
      this.$nextTick(() => {
        this.chart5 = this.$echarts.init(document.getElementById('chart5'));
        const data = {
          name: '销售部',
          value: 10,
          children: [
            { name: '销售1', value: 3, children: [{ name: '预计销售额', value: 3000, children: [{ name: '实际完成', value: 2000, children: [] }] }] },
            { name: '销售2', value: 3, children: [{ name: '预计销售额', value: 3000, children: [{ name: '实际完成', value: 2000, children: [] }] }] },
            { name: '销售3', value: 3, children: [{ name: '预计销售额', value: 3000, children: [{ name: '实际完成', value: 2000, children: [] }] }] },
            { name: '销售4', value: 3, children: [{ name: '预计销售额', value: 3000, children: [{ name: '实际完成', value: 2000, children: [] }] }] },
            { name: '销售5', value: 3, children: [{ name: '预计销售额', value: 3000, children: [{ name: '实际完成', value: 2000, children: [] }] }] },
            { name: '销售6', value: 3, children: [{ name: '预计销售额', value: 3000, children: [{ name: '实际完成', value: 2000, children: [] }] }] }
          ]
        };

        const option = {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',
              data: [data],

              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',

              symbolSize: [40, 20],
              symbol: 'roundRect',

              label: {
                position: 'inside',
                verticalAlign: 'center',
                align: 'center',
                fontSize: 9
              },

              leaves: {
                label: {
                  position: 'inside',
                  verticalAlign: 'center',
                  align: 'center'
                }
              },

              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
            }
          ]
        };
        this.chart5.setOption(option);
      });
    },
    // 双Y轴
    renderDoubleY() {
      this.$nextTick(() => {
        this.chart6 = this.$echarts.init(document.getElementById('chart6'));
        const lineData = [68, 150, 190, 180, 260, 240, 330];
        const barData = [25, 120, 84, 240, 160, 320, 280];
        const xData = ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07'];

        const option = {
          backgroundColor: '#0f375f',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['line', 'bar'],
            textStyle: {
              color: '#ccc'
            }
          },
          xAxis: {
            data: xData,
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            }
          },
          yAxis: [
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              }
            },
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              }
            }
          ],
          series: [
            {
              name: 'line',
              type: 'line',
              smooth: true,
              showAllSymbol: true,
              symbol: 'emptyCircle',
              symbolSize: 15,
              data: lineData
            },
            {
              name: 'bar',
              type: 'bar',
              barWidth: 10,
              itemStyle: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#14c8d4' },
                    { offset: 1, color: '#43eec6' }
                  ]
                )
              },
              data: barData
            },
            {
              name: 'line',
              type: 'bar',
              barGap: '-100%',
              barWidth: 10,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: 'rgba(20,200,212,0.5)' },
                    { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                    { offset: 1, color: 'rgba(20,200,212,0)' }
                  ]
                )
              },
              z: -12,
              data: lineData
            },
            {
              name: 'dotted',
              type: 'pictorialBar',
              symbol: 'rect',
              itemStyle: {
                color: '#0f375f'
              },
              symbolRepeat: true,
              symbolSize: [12, 4],
              symbolMargin: 1,
              z: -10,
              data: lineData
            }
          ]
        };
        this.chart6.setOption(option);
      });
    },
    // 柱状图 + morkPoint
    renderPoint() {
      this.$nextTick(() => {
        this.chart7 = this.$echarts.init(document.getElementById('chart7'));
        const data = [
          { coord: [2.0, '1月'] },
          { coord: [4.9, '2月'] },
          { coord: [7.0, '3月'] },
          { coord: [23.2, '4月'] },
          { coord: [25.6, '5月'] },
          { coord: [76.7, '6月'] },
          { coord: [135.6, '7月'] },
          { coord: [162.2, '8月'] },
          { coord: [32.6, '9月'] },
          { coord: [20.0, '10月'] },
          { coord: [6.4, '11月'] },
          { coord: [3.3, '12月'] }
        ];
        const option = {
          backgroundColor: '#eee',
          tooltip: {
            trigger: 'axis'
          },
          // toolbox: {
          //   show: true,
          //   feature: {
          //     dataView: { show: true, readOnly: false },
          //     magicType: { show: true, type: ['line', 'bar'] },
          //     restore: { show: true },
          //     saveAsImage: { show: true }
          //   }
          // },
          calculable: true,
          yAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          xAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '蒸发量',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              markPoint: {
                symbol: 'circle',
                symbolSize: (val, params) => {
                  // console.log(val, 'val');
                  // console.log(params, 'params');
                  return params.data.coord[0] / 2;
                },
                // symbolOffset: ['-30%', 0],
                data: data,
                itemStyle: {
                  color: 'rgba(100,149,237, 0.3)',
                  label: {
                    // show: false
                  }
                }
              }
            }
          ]
        };
        this.chart7.setOption(option);
      });
    },
    // pictorialBar + morkPoint
    renderPictor() {
      this.$nextTick(() => {
        this.chart8 = this.$echarts.init(document.getElementById('chart8'));
        const markData = [
          { coord: [390, '1月'] },
          { coord: [390, '2月'] },
          { coord: [390, '3月'] },
          { coord: [390, '4月'] },
          { coord: [390, '5月'] },
          { coord: [390, '6月'] }
        ];

        const option = {
          backgroundColor: '#0f375f',
          color: ['#9932CC'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '20%',
            containLabel: true
          },
          yAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月'],
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#132C57'
              }
            },
            axisLabel: {
              color: '#fff'
            }
          }],
          xAxis: {
            show: false,
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#fff'
            }
          },
          series: [
            {
              tooltip: {
                show: false
              },
              name: 'bg',
              type: 'pictorialBar',
              barWidth: '60%',
              silent: true,
              symbol: 'rect',
              symbolRepeat: true,
              symbolMargin: 1,
              symbolSize: [3, 12],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: 'rgba(20,200,212,0.5)' },
                    { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                    { offset: 1, color: 'rgba(20,200,212,0)' }
                  ]
                )
              },
              data: [390, 390, 390, 390, 390, 390],
              markPoint: {
                symbol: 'rect',
                symbolSize: [20, 1],
                symbolOffset: [28, 0],
                data: markData,
                itemStyle: {
                  color: '#bbb',
                  label: {
                    show: false
                  }
                }
              }
            },
            {
              type: 'pictorialBar',
              animation: true,
              animationDuration: 600,
              symbol: 'rect',
              symbolRepeat: true,
              symbolSize: [3, 12],
              symbolMargin: 1,
              barWidth: '60%',
              itemStyle: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#14c8d4' },
                    { offset: 1, color: '#43eec6' }
                  ]
                )
              },
              data: [10, 52, 200, 334, 390, 330],
              markPoint: {
                symbol: 'circle',
                symbolSize: 25,
                symbolOffset: [50, 0],
                data: markData,
                label: {
                  formatter: (params) => {
                    const arr = [88, 180, 126, 34, 12, 3].reverse();
                    return arr[params.dataIndex];
                  }
                },
                itemStyle: {
                  color: 'rgba(100,149,237, 0.3)',
                  label: {
                    show: false
                  }
                }
              }
            // markLine: {
            //   data: markLineData,
            //   symbol: 'circle',
            //   symbolSize: 25,
            //   symbolOffset: [50, 0]
            // }
            }
          ]
        };
        this.chart8.setOption(option);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.echarts-demo {
  display: flex;
  -js-display:flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
  background: #f2f2f4;
  .charts-box {
    height: 350px;
    width: calc(50% - 5px);
    margin-bottom: 10px;
    background: #fff;
    box-shadow: 0 5px 10px 0 #E9F1FF;
    border-radius: 4px;
  }
  .charts-box:nth-child(odd) {
    margin-right: 10px;
  }
  .chart {
    height: 310px;
    width: 100%;
  }
  .charts-box5 {
    width: 100%;
    height: 600px;
    margin-right: 0 !important;
    .chart5 {
      height: 550px;
    }
  }

  .title {
    position: relative;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 14px;
    background: #f7f9fa;
    border-bottom: 1px solid @devided;
    box-sizing: border-box;
  }
  .title:before {
    position: absolute;
    left: 10px;
    top: 13px;
    content: '';
    width: 3px;
    height: 16px;
    background: @theme-color;
  }
}
</style>
