declare namespace ArcGis.Rest {
    interface Feature {
        geometry: Geometry;
        attributes: any;
    }

    interface Field {
        name: string;
        type: string;
        alias?: string;
        length?: number;
    }

    interface FeatureSet extends HasZM {
        objectIdFieldName?: string; // optional
        globalIdFieldName?: string; // optional
        displayFieldName?: string; // optional
        geometryType?: esriGeometryType; // for feature layers only
        spatialReference?: SpatialReference; // for feature layers only.
        fields?: Field[];
        features: Feature[];
    }
}