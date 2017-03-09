import { IDomain } from "./domain";
import { esriGeometryType, IGeometry, IHasZM, ISpatialReference } from "./geometry";

export type HtmlPopupType = "esriServerHTMLPopupTypeNone" |
    "esriServerHTMLPopupTypeAsURL" | "esriServerHTMLPopupTypeAsHTMLText";

export type esriFieldType =
    "esriFieldTypeBlob" | "esriFieldTypeDate" | "esriFieldTypeDouble" | "esriFieldTypeGeometry" |
    "esriFieldTypeGlobalID" | "esriFieldTypeGUID" | "esriFieldTypeInteger" | "esriFieldTypeOID" |
    "esriFieldTypeRaster" | "esriFieldTypeSingle" | "esriFieldTypeSmallInteger" |
    "esriFieldTypeString" | "esriFieldTypeXML";

export interface IFeature {
    geometry: IGeometry;
    attributes: any;
}

export interface IField {
    name: string;
    type: esriFieldType;
    alias?: string;
    length?: number;
    domain?: IDomain;
}

export interface IFeatureSet extends IHasZM {
    objectIdFieldName?: string; // optional
    globalIdFieldName?: string; // optional
    displayFieldName?: string; // optional
    geometryType?: esriGeometryType; // for feature layers only
    spatialReference?: ISpatialReference; // for feature layers only.
    fields?: IField[];
    features: IFeature[];
}
