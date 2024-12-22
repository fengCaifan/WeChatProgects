// components/QrcodeModal.js
import drawQrcode from '../../common/utils/weapp.qrcode.min.js'

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer: 'onShowChange'
    },
    title: {
      type: String,
      value: '标题'
    },
    drawQrcodeText: {
      type: String,
      value: ''
    },
    buttonText: {
      type: String,
      value: '确定'
    }
  },

  data: {
    canvasId: 'qrcodeCanvas'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal() {
      this.setData({
        visible: false
      });
    },

    onButtonTap() {
      this.triggerEvent('buttontap');
    },

    preventTouchMove() {
      // Prevent touch move
    },

    // generateQRCode(newVal) {
    //   console.log('开始生成二维码', newVal)
    //   drawQrcode({
    //     width: 200,
    //     height: 200,
    //     canvasId: this.data.canvasId,
    //     text: newVal,
    //     callback: (e) => {
    //       if (e.errMsg) {
    //         console.error('二维码生成失败:', e.errMsg);
    //       } else {
    //         console.log('二维码生成成功');
    //       }
    //     }
    //     // 如果需要在二维码上绘制图片，可以取消注释以下代码并提供图片路径
    //     // image: {
    //     //   imageResource: '../../images/icon.png',
    //     //   dx: 70,
    //     //   dy: 70,
    //     //   dWidth: 60,
    //     //   dHeight: 60
    //     // }
    //   });
    // },
    generateQRCode(newVal) {
      console.log('开始生成二维码', newVal);
      this.createSelectorQuery().select(`#${this.data.canvasId}`)
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res[0] || !res[0].node) {
            console.error('无法获取canvas节点');
            return;
          }

          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');

          drawQrcode({
            width: 200,
            height: 200,
            canvas: canvas,
            ctx: ctx,
            text: newVal,
            callback: (e) => {
              if (e.errMsg) {
                console.error('二维码生成失败:', e.errMsg);
              } else {
                console.log('二维码生成成功');
              }
            }
          });
        });
    },

    onShowChange(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.generateQRCode(this.data.drawQrcodeText);
        }, 100);
      }
    }
  }
})