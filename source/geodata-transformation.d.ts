import { SpatialReference } from "./geometry";

export interface IGeodataTransformation {
    geodataTransform: "Polynomial" | "Projective" | "Identity";
    geodataTransformArguments: ITransformationArguments | {
        spatialReference: SpatialReference
    };
}

export interface ITransformPoint {
    x: number;
    y: number;
}

export interface ITransformationArguments {
    sourcePoints: ITransformPoint[];
    targetPoints: ITransformPoint[];
    coeffx: number[]; // array of doubles
    coeffy: number[]; // array of doubles
    inverseCoeffx: number[]; // array of doubles
    inverseCoeffy: number[]; // array of doubles
    spatialReference: SpatialReference;
    /**
     * integer: 1, 2, or 3. First order requires at least 3 pairs of control points; second order requires at
     * least 6 pairs of control points; third order requires at least 10 pairs of control points;
     * use more control points to get better fit (smaller RMS)
     */
    polynomialOrder: 1 | 2 | 3;
}

export interface IPolynomialTransformation extends IGeodataTransformation {
    geodataTransform: "Polynomial";
    geodataTransformArguments: ITransformationArguments;
}

export interface IProjectiveTransformation extends IGeodataTransformation {
    geodataTransform: "Projective";
    geodataTransformArguments: ITransformationArguments;
}

export interface IIdentityTransformation extends IGeodataTransformation {
    geodataTransform: "Identity";
    geodataTransformArguments: {
        spatialReference: SpatialReference
    };
}
