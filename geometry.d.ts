export type Position2D = [number, number];
export type Position = Position2D | [number, number, number] | [number, number, number, number];

export interface ICircularArc {
    "c": [Position, Position2D];
}

export interface IArc {
    "a": [
        Position, // End point: x, y, <z>, <m>
        Position2D, // Center point: center_x, center_y
        number, // minor
        number, // clockwise
        number, // rotation
        number, // axis
        number, // ratio
    ];
}

export type ElipticArc = IArc;

export interface IOldCircularArc {
    "a": [
        Position, // End point: x, y, <z>, <m>
        Position2D, // Center point: center_x, center_y
        number, // minor
        number, // clockwise
    ];
}

export interface IBezierCurve {
    "b": [
        Position,
        Position2D,
        Position2D,
    ];
}

export type JsonCurve = ICircularArc | IArc | IOldCircularArc | IBezierCurve;

export interface ISpatialReference {
}

export interface ISpatialReferenceWkid extends ISpatialReference {
    wkid?: number;
    latestWkid?: number;
    vcsWkid?: number;
    latestVcsWkid?: number;
}

export interface ISpatialReferenceWkt extends ISpatialReference {
    wkt?: string;
    latestWkt?: string;
}

export interface IGeometry {
    spatialReference?: ISpatialReference;
}

export interface IHasZM {
    hasZ?: boolean;
    hasM?: boolean;
}

export interface IPoint extends IGeometry {
    x: number;
    y: number;
    z?: number;
    m?: number;
}

export interface IPolyline extends IHasZM, IGeometry {
    paths: Position[][];
}

export interface IPolylineWithCurves extends IHasZM, IGeometry {
    curvePaths: Array<Array<Position | JsonCurve>>;
}

export interface IPolygon extends IHasZM, IGeometry {
    rings: Position[][];
}

export interface IPolygonWithCurves extends IHasZM, IGeometry {
    curveRings: Array<Array<Position | JsonCurve>>;
}

export interface IMultipoint extends IHasZM, IGeometry {
    points: Position[];
}

export interface IEnvelope extends IGeometry {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;

    zmin?: number;
    zmax?: number;

    mmin?: number;
    mmax?: number;
}

export type esriGeometryType = "esriGeometryPoint" | "esriGeometryMultipoint" | "esriGeometryPolyline" |
                               "esriGeometryPolygon" | "esriGeometryEnvelope";
