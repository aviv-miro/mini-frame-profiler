import { MeasureFrame } from "./MeasureFrame";
import { TFramesStatistics } from "./TFramesStatistics";

export class FrameStatistics {
  frameTimes: number[];
  sortedFrameTimes: number[] = [];
  median: number | null = null;
  mean: number | null = null;
  p99: number | null = null;
  p95: number | null = null;
  zScores: number[] | null = null;
  zScoresMean: number | null = null;
  stdDev: number | null = null;

  constructor(frameTimes: MeasureFrame | number[]) {
    this.frameTimes = Array.isArray(frameTimes)
      ? frameTimes
      : frameTimes.frameTimes;
    this.sortedFrameTimes = this.frameTimes.slice().sort((a, b) => a - b);
    this.median = this.calcMedian();
    this.p99 = this.calcPercentile(99);
    this.p95 = this.calcPercentile(95);
    this.mean = this.calcMean();
    this.stdDev = this.calcStdDev();
    this.zScores = this.calcZScores();
    this.zScoresMean = this.calcZScoresMean();
  }

  calcPercentile(percentile: number): number {
    let index = Math.floor(this.sortedFrameTimes.length * (percentile / 100));
    return this.sortedFrameTimes[index];
  }

  calcMedian(): number {
    return this.calcPercentile(50);
  }

  calcMean(): number {
    // using a regular for loop instead of reduce to avoid errors when the array is bigger than the call stack
    let sum = 0;
    for (let i = 0; i < this.frameTimes.length; i++) {
      sum += this.frameTimes[i];
    }
    return sum / this.frameTimes.length;
  }

  calcStdDev(): number {
    let mean = this.mean || this.calcMean();
    let sum = 0;
    for (let i = 0; i < this.frameTimes.length; i++) {
      sum += Math.pow(this.frameTimes[i] - mean, 2);
    }
    return Math.sqrt(sum / this.frameTimes.length);
  }

  calcZScores(): number[] {
    const mean = this.mean || this.calcMean();
    const stdDev = this.stdDev || this.calcStdDev();
    const zScores = [];
    for (let i = 0; i < this.frameTimes.length; i++) {
      zScores.push((this.frameTimes[i] - mean) / stdDev);
    }
    return zScores;
  }

  calcZScoresMean(): number {
    let sum = 0;
    for (let i = 0; i < this.zScores!.length; i++) {
      sum += this.zScores![i];
    }
    return sum / this.zScores!.length;
  }

  filterOutliersByZScore(threshold: number = 2): FrameStatistics {
    const filteredFrameTimes = this.frameTimes.filter(
      (_, i) => Math.abs(this.zScores![i]) < threshold,
    );
    return new FrameStatistics(filteredFrameTimes);
  }

  getStatistics(): TFramesStatistics {
    return {
      p95: this.p95,
      p99: this.p99,
      mean: this.mean,
      median: this.median,
      stdDev: this.stdDev,
      zScoresMean: this.zScoresMean,
    };
  }
}
