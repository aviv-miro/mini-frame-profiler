import { init } from "./init";
import { MeasureFrame } from "./MeasureFrame";

/** Please feel free to change this file as you see fit. */
/** these are only examples */

function ready() {
  console.log('Library "miniFrameProfiler" is ready!');
  // @ts-ignore
  window.MFP = window.miniFrameProfiler;
}

export async function measureFramesWithTimer(
  timeInSeconds?: number,
  delayInSeconds?: number,
): Promise<MeasureFrame> {
  return MeasureFrame.measureFramesWithTimer(timeInSeconds, delayInSeconds);
}

init(ready);
