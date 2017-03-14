
export type HtmlPopupType = "esriServerHTMLPopupTypeNone" |
    "esriServerHTMLPopupTypeAsURL" | "esriServerHTMLPopupTypeAsHTMLText";

export type esriFieldType =
    "esriFieldTypeBlob" | "esriFieldTypeDate" | "esriFieldTypeDouble" | "esriFieldTypeGeometry" |
    "esriFieldTypeGlobalID" | "esriFieldTypeGUID" | "esriFieldTypeInteger" | "esriFieldTypeOID" |
    "esriFieldTypeRaster" | "esriFieldTypeSingle" | "esriFieldTypeSmallInteger" |
    "esriFieldTypeString" | "esriFieldTypeXML";

export interface IFeature {
    geometry: IGeometry;
    attributes: {
        [key: string]: string | number | boolean | null
    };
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
    spatialReference?: SpatialReference; // for feature layers only.
    fields?: IField[];
    features: IFeature[];
}

export interface IClassBreaks {
    type: "classBreaksDef";
    classificationField: string; // "<field name>",
    classificationMethod: "esriClassifyNaturalBreaks" | "esriClassifyEqualInterval" | "esriClassifyQuantile" |
                          "esriClassifyStandardDeviation" | "esriClassifyGeometricalInterval";
    breakCount: number;
    standardDeviationInterval: 1 | 0.5 | 0.33 | 0.25; // use when classificationMethod is esriClassifyStandardDeviation.

    // optional. use to normalize class breaks
    normalizationType: "<esriNormalizeByField | esriNormalizeByLog | esriNormalizeByPercentOfTotal>";
    normalizationField: "<field name>"; // use when normalizationType is esriNormalizeByField

    // optional. use to define symbol for classes
    baseSymbol: ISymbol;
    colorRamp: ColorRamp;
}

export interface IUniqueValue {
    type: "uniqueValueDef";
    uniqueValueFields: [string, string, string] | [string, string] | [string];
    fieldDelimiter: "field_delimiter_character";

    // optional. use to define symbol for unique values
    baseSymbol?: ISymbol;
    colorRamp?: ColorRamp;
}
export type Color = [number, number, number, number];

export type ColorRamp = IAlgorithmicColorRamp | IMultipartColorRamp;

export interface IAlgorithmicColorRamp {
  "type": "algorithmic";
  "fromColor": Color;
  "toColor": Color;
  "algorithm": "esriHSVAlgorithm" | "esriCIELabAlgorithm" | "esriLabLChAlgorithm";
}

export interface IMultipartColorRamp {
  "type": "multipart";
  "colorRamps": IAlgorithmicColorRamp[];
}

export interface IDataSource {
    type: string;
    workspaceId: string; // "<registered workspace id>",

}

export interface ITableDataSource extends IDataSource {
    type: "table";
    workspaceId: string; // "<registered workspace id>",
    dataSourceName: string; // "<table name>",
    gdbVersion: string; // "<version name>"
}

export interface IQueryTableDataSource extends IDataSource {
    type: "queryTable";
    workspaceId: string; // "<registered workspace id>",
    query: string; // "<SQL query>",
    oidFields: string; // "<field1>,<field2>,<field3>",
    geometryType: esriGeometryType;
    spatialReference: SpatialReference;
}

export interface IRasterDataSource extends IDataSource {
    type: "raster";
    workspaceId: string; // "<registered workspace id>",
    dataSourceName: string; // "<raster name>"
}

export interface IJoinTableDataSource {
    type: "joinTable";
    leftTableSource: IDataSource;
    rightTableSource: IDataSource;
    leftTableKey: string; // "<field name from left table>",
    rightTableKey: string; // "<field name from right table>",
    joinType: "esriLeftOuterJoin" | "esriLeftInnerJoin";
}
export interface IDomain {
    type: "codedValue" | "inherited" | "range";
}

export interface IRangeDomain extends IDomain {
    type: "range";
    name: string;
    range: [number, number];
}

export interface ICodedValueDomain extends IDomain {
    type: "codedValue";
    name: string;
    codedValues: Array<{
        name: string,
        code: number | string
    }>;
}

export interface IInheritedDomain {
    type: "inherited";
}

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
export type Position2D = [number, number];
export type Position = Position2D | [number, number, number] | [number, number, number, number];

export interface ICircularArc {
    "c": [Position, Position2D];
}

export interface IArc {
    "a": [
        /** End point: x, y, <z>, <m> */
        Position,
        /** Center point: center_x, center_y */
        Position2D,
        /** minor */
        number,
        /** clockwise */
        number, // clockwise
        /** rotation */
        number,
        /** axis */
        number,
        /** ratio */
        number
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

export type SpatialReference = ISpatialReferenceWkid | ISpatialReferenceWkt;

export interface ISpatialReferenceWkid {
    wkid?: number;
    latestWkid?: number;
    vcsWkid?: number;
    latestVcsWkid?: number;
}

export interface ISpatialReferenceWkt {
    wkt?: string;
    latestWkt?: string;
}

export interface IGeometry {
    spatialReference?: SpatialReference;
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
export interface IHistogram {
    /**
     * int, number of bins
     */
    "size": number;
    /** minimum value */
    "min": number;
    /** maximum value */
    "max": number;
    /**
     * integer(64bit), counts of pixels in each bin. The width of each bin is (max-min)/size.
     */
    "counts": number[];
}
export type ImageCoordinateSystem = IIcsBasedImageCoordinateSystem | IIcsBasedImageCoordinateSystem;

export interface IIcsImageCoordinateSystem {
    icsid: number;
}

export interface IIcsBasedImageCoordinateSystem {
    /**
     * the full ics json, which include transformations and map spatial reference information and specific to each
     * image.
     * @see http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#/Image_coordinate_systems/02r30000029w000000/
     */
    ics: object;
}

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
