export type Color = [number, number, number, number];

export type ColorRamp = IAlgorithmicColorRamp | IMultipartColorRamp;

export interface IAlgorithmicColorRamp {
  "type": "algorithmic";
  "fromColor": Color;
  "toColor": Color;
  "algorithm": "esriHSVAlgorithm" | "esriCIELabAlgorithm" | "esriLabLChAlgorithm";
}

export interface IMultipartColorRamp {
  "type": "multipart";
  "colorRamps": IAlgorithmicColorRamp[];
}
