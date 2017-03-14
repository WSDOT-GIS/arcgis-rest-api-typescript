
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
export interface IDomain {
    "type": "coded" | "inherited" | "range";
}

export interface IRangeDomain extends IDomain {
    "type": "range";
    "name": string;
    "range": [number, number];
}

export interface ICodedValueDomain {
    "type": "codedValue";
    "name": string;
    "codedValues": Array<{
        name: string,
        code: number | string
    }>;
}

export interface IInheritedDomain {
    type: "inherited";
}
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
        number // ratio
    ];
}

export type ElipticArc = IArc;

export interface IOldCircularArc {
    "a": [
        Position, // End point: x, y, <z>, <m>
        Position2D, // Center point: center_x, center_y
        number, // minor
        number // clockwise
    ];
}

export interface IBezierCurve {
    "b": [
        Position,
        Position2D,
        Position2D
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

export interface ILayerReference {
    id: number;
    name: string;
}

export type TimeOffsetUnits = "esriTimeUnitsCenturies" | "esriTimeUnitsDays" | "esriTimeUnitsDecades" |
    "esriTimeUnitsHours" | "esriTimeUnitsMilliseconds" | "esriTimeUnitsMinutes" |
    "esriTimeUnitsMonths" | "esriTimeUnitsSeconds" | "esriTimeUnitsWeeks" | "esriTimeUnitsYears" |
    "esriTimeUnitsUnknown";

export interface ITimeInfo {
    startTimeField: string; // "<startTimeFieldName>",
    endTimeField: string; // "<endTimeFieldName>",
    trackIdField: string; // "<trackIdFieldName>",
    timeExtent: [number, number];
    timeReference: {
        timeZone: string,
        respectsDaylightSaving: boolean
    };
    timeInterval: number;
    timeIntervalUnits: string;
    // the default time-related export options for this layer
    exportOptions: {
        // If true, use the time extent specified by the time parameter
        useTime: boolean,
        // If true, draw all the features from the beginning of time for that data
        timeDataCumulative: boolean,
        // Time offset for this layer so that it can be overlaid on the top of a previous or future time period
        timeOffset: number,
        timeOffsetUnits: TimeOffsetUnits
    };
    hasLiveData: boolean;
}

export interface ILayer {
    currentVersion: number; // Added at 10.0 SP1
    id: number;
    name: string;
    type: "Layer" | "Table"; // string, // "<layerOrTableType>", // for tables, the type will be "Table"
    description: string;
    definitionExpression: string;

    // properties specific to layers only
    geometryType: esriGeometryType;
    hasZ: boolean; // added in 10.1
    hasM: boolean; // added in 10.1
    copyrightText: string; // "<copyrightText>",
    parentLayer: ILayerReference;
    subLayers: ILayerReference[];
    minScale: number;
    maxScale: number;
    effectiveMinScale: number;
    effectiveMaxScale: number;
    defaultVisibility: boolean;
    extent: IEnvelope;

    // from 10 onward - if the layer / table supports querying and exporting maps based on time
    timeInfo: ITimeInfo;

    // from 10.0 onward - for feature layers only
    drawingInfo: {
        renderer: IRenderer,
        transparency: number,
        labelingInfo: any | null // <labelingInfo> // TODO: figure out info for this type.
    };

    // from 10 onward - indicates whether the layer / table has attachments or not
    hasAttachments: boolean;

    // from 10 onward - indicates whether the layer / table has htmlPopups
    htmlPopupType: HtmlPopupType;

    // layer / table field information
    displayField: string;
    // the typeIdField is new at 10.0
    typeIdField: string;
    // from 10.0 fields of type (String, Date, GlobalID, GUID and XML) have an additional length property
    // from 10.0 onward the field domains are also included
    fields: IField[];
    // new at 10.0 - if the layer has sub-types, they'll be included
    types: Array<
    {
        id: number,
        name: number,
        domains: {
            [domainField: string]: IDomain
        }
    }
    >;

    // new at 10 - if the layer / table participates in relationships with other layers / tables
    relationships: Array<{
        id: number,
        name: string,
        relatedTableId: number,
        role: "esriRelRoleOrigin" | "esriRelRoleDestination", // Added at 10.1
        // Added at 10.1
        cardinality: "esriRelCardinalityOneToOne" | "esriRelCardinalityOneToMany" | "esriRelCardinalityManyToMany",
        keyField: string, // "<keyFieldName2>",//Added at 10.1
        composite: boolean, // Added at 10.1
        // Added in 10.1. Returned only for attributed relationships
        relationshipTableId: number, // <attributedRelationshipClassTableId>,
        // Added in 10.1. Returned only for attributed relationships
        keyFieldInRelationshipTable: string // "<key field in AttributedRelationshipClass table that matches keyField>"

    }>;
    // Added at 10.1
    maxRecordCount: number;
    // Added at 10.1 - if the layer / table supports modifying its renderer, data source, or join information.
    canModifyLayer: boolean;
    // Added at 10.1 - if the layer / table supports statistical functions in query operation.
    supportsStatistics: boolean;
    // Added at 10.1 - if the layer / table supports orderBy parameter in query operation.
    supportsAdvancedQueries: boolean;
    // Added at 10.1 - if the layer has labels defined on it.
    hasLabels: boolean;
    // Added at 10.1 - if the layer renders its symbols based on scale.
    canScaleSymbols: boolean;
    // comma separated list of supported capabilities - e.g. "Map,Query,Data"
    capabilities: string; // "<capabilities>",
    // comma separated list of supported query output formats - e.g. "JSON, AMF"
    supportedQueryFormats: string; // "<supported query output formats>",
    // true if the layer is versioned.
    isDataVersioned: boolean;
    // Added at 10.1 SP1.

    // Added at 10.1 SP1.
    ownershipBasedAccessControlForFeatures: { allowOthersToQuery: boolean };
    // Added at 10.3 - container for below properties.
    advancedQueryCapabilities: {
        // Added at 10.2.
        useStandardizedQueries: boolean,
        // Added at 10.3.1.
        supportsStatistics: boolean,
        // Added at 10.3.
        supportsOrderBy: true,
        // Added at 10.3.
        supportsDistinct: true,
        // Added at 10.3.
        supportsPagination: false,
        // Added at 10.3.
        supportsTrueCurve: true
    };
}

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
            symbol: ISymbol
        }
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
            symbol: ISymbol
        }
    ];
}
export type Color = [number, number, number, number];
export type SimpleMarkerSymbolStyle = "esriSMSCircle" | "esriSMSCross" | "esriSMSDiamond" | "esriSMSSquare" |
                                      "esriSMSX" | "esriSMSTriangle";
export type SimpleLineSymbolStyle = "esriSLSDash" | "esriSLSDashDot" | "esriSLSDashDotDot" | "esriSLSDot" |
                                    "esriSLSNull" | "esriSLSSolid";
export type SimpleFillSymbolStyle = "esriSFSBackwardDiagonal" | "esriSFSCross" | "esriSFSDiagonalCross" |
                                    "esriSFSForwardDiagonal" | "esriSFSHorizontal" | "esriSFSNull" |
                                    "esriSFSSolid" | "esriSFSVertical";
export type SymbolType = "esriSLS" | "esriSMS" | "esriSFS" | "esriPMS" | "esriPFS" | "esriTS";

export interface ISymbol {
    "type": SymbolType;
    "style"?: string;
}

export interface ISimpleLineSymbol extends ISymbol {
    "type": "esriSLS";
    "style"?: SimpleLineSymbolStyle;
    "color"?: Color;
    "width"?: number;
}

export interface IMarkerSymbol extends ISymbol {
    "angle"?: number;
    "xoffset"?: number;
    "yoffset"?: number;
}

export interface ISimpleMarkerSymbol extends IMarkerSymbol {
    "type": "esriSMS";
    "style"?: SimpleMarkerSymbolStyle;
    "color"?: Color;
    "size"?: number;
    "outline"?: ISimpleLineSymbol;
}

export interface ISimpleFillSymbol extends ISymbol {
    "type": "esriSFS";
    "style"?: SimpleFillSymbolStyle;
    "color"?: Color;
    "outline"?: ISimpleLineSymbol; // if outline has been specified
}

export interface IPictureSourced {
    /**
     * Relative URL for static layers and full URL for dynamic layers.
     * Access relative URL using http://<mapservice-url>/<layerId1>/images/<imageUrl11>
     */
    "url"?: string;
    "imageData"?: string; // "<base64EncodedImageData>",
    "contentType"?: string;
    "width"?: number;
    "height"?: number;
    "angle"?: number;
    "xoffset"?: number;
    "yoffset"?: number;

}

export interface IPictureMarkerSymbol extends IMarkerSymbol, IPictureSourced {
    "type": "esriPMS";
}

export interface IPictureFillSymbol extends ISymbol, IPictureSourced {
    "type": "esriPFS";
    "outline"?: ISimpleLineSymbol; // if outline has been specified
    "xscale"?: number;
    "yscale"?: number;
}

export interface IFont {
    "family"?: string; // "<fontFamily>",
    "size"?: number; // <fontSize>,
    "style"?: "italic" | "normal" | "oblique";
    "weight"?: "bold" | "bolder" | "lighter" | "normal";
    "decoration"?: "line-through" | "underline" | "none";
}

export interface ITextSymbol extends IMarkerSymbol {
    "type": "esriTS";
    "color"?: Color;
    "backgroundColor"?: Color;
    "borderLineSize"?: number; // <size>,
    "borderLineColor"?: Color;
    "haloSize"?: number; // <size>,
    "haloColor"?: Color;
    "verticalAlignment"?: "baseline" | "top" | "middle" | "bottom";
    "horizontalAlignment"?: "left" | "right" | "center" | "justify";
    "rightToLeft"?: boolean;
    "kerning"?: boolean;
    "font"?: IFont;
    "text"?: string; // only applicable when specified as a client-side graphic.
}
