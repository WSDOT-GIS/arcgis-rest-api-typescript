export type Position2D = [number, number];
export type Position = Position2D | [number, number, number] | [number, number, number, number];

export interface CircularArc {
    "c": [Position, Position2D];
}

export interface Arc {
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

export type ElipticArc = Arc;

export interface OldCircularArc {
    "a": [
        Position, // End point: x, y, <z>, <m>
        Position2D, // Center point: center_x, center_y
        number, // minor
        number, // clockwise
    ];
}

export interface BezierCurve {
    "b": [
        Position,
        Position2D,
        Position2D,
    ];
}

export type JsonCurve = CircularArc | Arc | OldCircularArc | BezierCurve;

export interface SpatialReference {
}

export interface SpatialReferenceWkid extends SpatialReference {
    wkid?: number;
    latestWkid?: number;
    vcsWkid?: number;
    latestVcsWkid?: number;
}

export interface SpatialReferenceWkt extends SpatialReference {
    wkt?: string;
    latestWkt?: string;
}

export interface Geometry {
    spatialReference?: SpatialReference;
}

export interface HasZM {
    hasZ?: boolean;
    hasM?: boolean;
}

export interface Point extends Geometry {
    x: number;
    y: number;
    z?: number;
    m?: number;
}

export interface Polyline extends HasZM, Geometry {
    paths: Position[][];
}

export interface PolylineWithCurves extends HasZM, Geometry {
    curvePaths: Array<Array<Position | JsonCurve>>;
}

export interface Polygon extends HasZM, Geometry {
    rings: Position[][];
}

export interface PolygonWithCurves extends HasZM, Geometry {
    curveRings: Array<Array<Position | JsonCurve>>;
}

export interface Multipoint extends HasZM, Geometry {
    points: Position[];
}

export interface Envelope extends Geometry {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;

    zmin?: number;
    zmax?: number;

    mmin?: number;
    mmax?: number;
}

export type esriGeometryType = "esriGeometryPoint" | "esriGeometryMultipoint" | "esriGeometryPolyline" | "esriGeometryPolygon" | "esriGeometryEnvelope";
