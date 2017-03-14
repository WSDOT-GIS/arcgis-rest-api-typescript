import { ColorRamp } from "./color-ramp";
import { ISymbol } from "./symbol";

export interface IClassBreaks {
    type: "classBreaksDef";
    classificationField: string; // "<field name>",
    classificationMethod: "esriClassifyNaturalBreaks" | "esriClassifyEqualInterval" | "esriClassifyQuantile" |
                          "esriClassifyStandardDeviation" | "esriClassifyGeometricalInterval";
    breakCount: number;
    standardDeviationInterval: 1 | 0.5 | 0.33 | 0.25; // use when classificationMethod is esriClassifyStandardDeviation.

    // optional. use to normalize class breaks
    normalizationType: "<esriNormalizeByField | esriNormalizeByLog | esriNormalizeByPercentOfTotal>";
    normalizationField: "<field name>"; // use when normalizationType is esriNormalizeByField

    // optional. use to define symbol for classes
    baseSymbol: ISymbol;
    colorRamp: ColorRamp;
}

export interface IUniqueValue {
    type: "uniqueValueDef";
    uniqueValueFields: [string, string, string] | [string, string] | [string];
    fieldDelimiter: "field_delimiter_character";

    // optional. use to define symbol for unique values
    baseSymbol?: ISymbol;
    colorRamp?: ColorRamp;
}
