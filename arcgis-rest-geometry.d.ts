declare namespace ArcGis.Rest {
    type Position2D = [number, number];
    type Position = Position2D | [number, number, number] | [number, number, number, number];

    interface CircularArc {
        "c": [Position, Position2D];
    }

    interface Arc {
        "a": [
            Position, // End point: x, y, <z>, <m>
            Position2D, // Center point: center_x, center_y
            number, // minor
            number, // clockwise
            number, // rotation
            number, // axis
            number // ratio
        ];
    }

    type ElipticArc = Arc;

    interface OldCircularArc {
        "a": [
            Position, // End point: x, y, <z>, <m>
            Position2D, // Center point: center_x, center_y
            number, // minor
            number // clockwise
        ];
    }

    interface BezierCurve {
        "b": [
            Position,
            Position2D,
            Position2D
        ];
    }

    type JsonCurve = CircularArc | Arc | OldCircularArc | BezierCurve;

    interface SpatialReference {
    }

    interface SpatialReferenceWkid extends SpatialReference {
        wkid?: number;
        latestWkid?: number;
        vcsWkid?: number;
        latestVcsWkid?: number;
    }

    interface SpatialReferenceWkt extends SpatialReference {
        wkt?: string;
        latestWkt?: string;
    }

    interface Geometry {
        spatialReference?: SpatialReference;
    }

    interface HasZM {
        hasZ?: boolean;
        hasM?: boolean;
    }

    interface Point extends Geometry {
        x: number;
        y: number;
        z?: number;
        m?: number;
    }

    interface Polyline extends HasZM, Geometry {
        paths: Position[][];
    }

    interface PolylineWithCurves extends HasZM, Geometry {
        curvePaths: (Position | JsonCurve)[][];
    }

    interface Polygon extends HasZM, Geometry {
        rings: Position[][];
    }

    interface PolygonWithCurves extends HasZM, Geometry {
        curveRings: (Position | JsonCurve)[][];
    }

    interface Multipoint extends HasZM, Geometry {
        points: Position[];
    }

    interface Envelope extends Geometry {
        xmin: number;
        xmax: number;
        ymin: number;
        ymax: number;

        zmin?: number;
        zmax?: number;

        mmin?: number;
        mmax?: number;
    }

    type esriGeometryType = "esriGeometryPoint" | "esriGeometryMultipoint" | "esriGeometryPolyline" | "esriGeometryPolygon" | "esriGeometryEnvelope";
}