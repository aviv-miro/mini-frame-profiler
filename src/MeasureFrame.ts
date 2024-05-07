import { FrameStatistics } from "./FrameStatistics";

export class MeasureFrame {
  frameTimes: number[] = [];
  lastTime: number = Infinity;
  isMeasuring: boolean = false;

  start() {
    if (this.isMeasuring) return;
    this.isMeasuring = true;
    this.measure();
  }

  stop() {
    this.isMeasuring = false;
    this.lastTime = Infinity;
  }

  statistics(): FrameStatistics | void {
    if (this.isMeasuring) {
      console.warn("You should stop measuring before getting statistics.");
      return;
    }
    return new FrameStatistics(this.frameTimes);
  }

  private measure() {
    if (!this.isMeasuring) return;
    requestAnimationFrame(() => this.measure());

    let now = performance.now();
    if (this.lastTime > now) {
      this.lastTime = now;
      return;
    }
    this.frameTimes.push(now - this.lastTime);
    this.lastTime = now;
  }

  static async measureFramesWithTimer(
    timeInSeconds: number = 5,
    delayInSeconds: number = 0,
  ): Promise<MeasureFrame> {
    let measureFrame = new MeasureFrame();
    const measureTime = timeInSeconds * 1000;
    const delayTime = delayInSeconds * 1000;
    console.log(
      `Measuring frames for ${timeInSeconds} seconds, starting in ${delayInSeconds} seconds...`,
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Starting measuring frames.");
        measureFrame.start();
        setTimeout(() => {
          measureFrame.stop();
          console.log("Finished measuring frames.");
          resolve(measureFrame);
        }, measureTime);
      }, delayTime);
    });
  }
}
