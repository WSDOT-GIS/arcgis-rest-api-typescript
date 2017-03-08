import { SimpleFillSymbol, Symbol } from "./arcgis-rest-symbol";

export type RotationType = "arithmetic" | "geographic";

export interface Renderer {
    type: "simple" | "uniqueValue" | "classBreaks";
    rotationType: RotationType;
    rotationExpression: string;
}

export interface SimpleRenderer extends Renderer {
    type: "simple";
    symbol: Symbol;
    label: string;
    description: string;
}

export interface UniqueValueRenderer extends Renderer {
    type: "uniqueValue";
    field1: string;
    field2: string;
    field3: string;
    fieldDelimiter: string;
    defaultSymbol: Symbol;
    defaultLabel: string;
    uniqueValueInfos: [
        {
            value: string,
            label: string,
            description: string,
            symbol: Symbol,
        },
    ];
}

export interface ClassBreaksRenderer extends Renderer {
    type: "classBreaks";
    field: string;
    classificationMethod: string;
    normalizationType: "esriNormalizeByField" | "esriNormalizeByLog" | "esriNormalizeByPercentOfTotal";
    normalizationField: string; //when normalizationType is esriNormalizeByField
    normalizationTotal: number; //when normalizationType is esriNormalizeByPercentOfTotal
    defaultSymbol: Symbol;
    defaultLabel: string;
    backgroundFillSymbol: SimpleFillSymbol; //supported only for polygon features
    minValue: number;
    classBreakInfos: [
        {
            classMinValue?: number, //optional
            classMaxValue: number,
            label: string,
            description: string,
            symbol: Symbol,
        },

    ];
}