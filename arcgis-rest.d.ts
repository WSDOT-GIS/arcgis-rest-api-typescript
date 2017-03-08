import { esriGeometryType, Geometry, HasZM, SpatialReference } from "./arcgis-rest-geometry";
import { Domain } from "./domain";

export type HtmlPopupType = "esriServerHTMLPopupTypeNone" | "esriServerHTMLPopupTypeAsURL" | "esriServerHTMLPopupTypeAsHTMLText";

export interface Feature {
    geometry: Geometry;
    attributes: any;
}

export interface Field {
    name: string;
    type: string;
    alias?: string;
    length?: number;
    domain?: Domain;
}

export interface FeatureSet extends HasZM {
    objectIdFieldName?: string; // optional
    globalIdFieldName?: string; // optional
    displayFieldName?: string; // optional
    geometryType?: esriGeometryType; // for feature layers only
    spatialReference?: SpatialReference; // for feature layers only.
    fields?: Field[];
    features: Feature[];
}
