import { encodeData, rendererLine, rendererRound } from "beautify-qrcode";

export const useGen = () => {};

export default useGen;

/**
 * 生成二维码数据
 * @param {Object} options
 * @param {String} options.text 二维码内容
 * @param {Number} [options.width]  生成svg的宽度 默认100%
 * @param {Number} [options.height] 生成svg的高度 默认100%
 * @param {Number} [options.correctLevel] 容错率 1=>7% 0 =>15% 3=>25% 2=>30%
 * @param {Boolean} [options.isSpace] 生成内容是否预留空隙 默认true
 */
const qrcode = encodeData({
  text: "aaa",
  correctLevel: 0,
});
/**
 * A_a1
 * @param {Object} qrcode
 * @param {Object} options
 * @param {String} [options.type]  连线方向 0=>左右 1=>上下 2=>纵横 3=>回环 4=>左上—右下 5=>右上—左下 6=>交叉"
 * @param {String} [options.size] 连线粗细
 * @param {String} [options.opacity] 连线不透明度
 * @param {String} [options.posType] 定位点样式  0=>矩形 1=>圆形 2=>行星 3=>圆角矩形
 * @param {String} [options.otherColor] 连线颜色
 * @param {String} [options.posColor] 定位点颜色
 */
const A_a1 = rendererLine(qrcode);
/**
 * A2
 * @param {Object} qrcode
 * @param {Object} options
 * @param {Number} [options.type]  信息点样式 0=>矩形 1=>圆形,2=>随机
 * @param {Number} [options.size] 信息点缩放
 * @param {String} [options.opacity]  信息点不透明度
 * @param {String} [options.posType] 定位点样式 0=>矩形 1=>圆形 2=>行星
 * @param {String} [options.otherColor] 信息点颜色
 * @param {String} [options.posColor] 定位点点颜色
 * @return {String} svg图片
 */
const A2 = rendererRound(qrcode);
