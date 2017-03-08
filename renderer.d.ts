import { ISimpleFillSymbol, ISymbol } from "./symbol";

export type RotationType = "arithmetic" | "geographic";

export interface IRenderer {
    type: "simple" | "uniqueValue" | "classBreaks";
    rotationType: RotationType;
    rotationExpression: string;
}

export interface ISimpleRenderer extends IRenderer {
    type: "simple";
    symbol: ISymbol;
    label: string;
    description: string;
}

export interface IUniqueValueRenderer extends IRenderer {
    type: "uniqueValue";
    field1: string;
    field2: string;
    field3: string;
    fieldDelimiter: string;
    defaultSymbol: ISymbol;
    defaultLabel: string;
    uniqueValueInfos: [
        {
            value: string,
            label: string,
            description: string,
            symbol: ISymbol,
        },
    ];
}

export interface IClassBreaksRenderer extends IRenderer {
    type: "classBreaks";
    field: string;
    classificationMethod: string;
    normalizationType: "esriNormalizeByField" | "esriNormalizeByLog" | "esriNormalizeByPercentOfTotal";
    normalizationField: string; // when normalizationType is esriNormalizeByField
    normalizationTotal: number; // when normalizationType is esriNormalizeByPercentOfTotal
    defaultSymbol: ISymbol;
    defaultLabel: string;
    backgroundFillSymbol: ISimpleFillSymbol; // supported only for polygon features
    minValue: number;
    classBreakInfos: [
        {
            classMinValue?: number, // optional
            classMaxValue: number,
            label: string,
            description: string,
            symbol: ISymbol,
        },
    ];
}
