export enum QrcodeType {
  Line = 0,
  Round = 1,
}

export {
  CorrectLevel,
  LineOptionsType,
  OptionsPosType,
  RoundOptionsType,
  encodeData,
  rendererLine,
  rendererRound,
} from "beautify-qrcode";
export type { Options, LineOptions, RoundOptions } from "beautify-qrcode";
