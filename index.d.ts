// Type definitions for arcgis-to-geojson-utils 10.5
// Project: http://resources.arcgis.com/en/help/arcgis-rest-api/
// Definitions by: Jeff Jacobson <https://github.com/JeffJacobson>
// Definitions: https://github.com/WSDOT-GIS/arcgis-rest-api-typescript


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

}

export interface IDataSourceWithWorkspaceID extends IDataSource {
    workspaceId: string; // "<registered workspace id>",
}

export interface IDataSourceWithDataSourceName extends IDataSource {
    dataSourceName: string; // "<table name>",
}

export interface ITableDataSource extends IDataSourceWithWorkspaceID, IDataSourceWithDataSourceName {
    type: "table";
    gdbVersion: string; // "<version name>"
}

export interface IQueryTableDataSource extends IDataSourceWithWorkspaceID {
    type: "queryTable";
    query: string; // "<SQL query>",
    oidFields: string; // "<field1>,<field2>,<field3>",
    geometryType: esriGeometryType;
    spatialReference: SpatialReference;
}

export interface IRasterDataSource extends IDataSourceWithWorkspaceID , IDataSourceWithDataSourceName {
    type: "raster";
}

export interface IJoinTableDataSource extends IDataSource {
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

export type PointLabelPlacement = "esriServerPointLabelPlacementAboveCenter" | "esriServerPointLabelPlacementAboveLeft" |
    "esriServerPointLabelPlacementAboveRight" | "esriServerPointLabelPlacementBelowCenter" |
    "esriServerPointLabelPlacementBelowLeft" | "esriServerPointLabelPlacementBelowRight" |
    "esriServerPointLabelPlacementCenterCenter" | "esriServerPointLabelPlacementCenterLeft" |
    "esriServerPointLabelPlacementCenterRight";

export type LineLabelPlacement = "esriServerLinePlacementAboveAfter" |
    "esriServerLinePlacementAboveAlong" |
    "esriServerLinePlacementAboveBefore" |
    "esriServerLinePlacementAboveStart" |
    "esriServerLinePlacementAboveEnd" |
    "esriServerLinePlacementBelowAfter" |
    "esriServerLinePlacementBelowAlong" |
    "esriServerLinePlacementBelowBefore" |
    "esriServerLinePlacementBelowStart" |
    "esriServerLinePlacementBelowEnd" |
    "esriServerLinePlacementCenterAfter" |
    "esriServerLinePlacementCenterAlong" |
    "esriServerLinePlacementCenterBefore" |
    "esriServerLinePlacementCenterEnd";

export type PolygonLabelPlacement = "esriServerPolygonPlacementAlwaysHorizontal";

export type LabelPlacement = PointLabelPlacement | LineLabelPlacement | PolygonLabelPlacement;

export interface ILabelClass {
    "labelPlacement": LabelPlacement;
    /**
     * Use labelExpression to adjust the formatting of labels. A label expression is limited to a single line of code.
     * Apart from specifying a string value and/or an attribute field value, the following keywords are supported
     *
     * CONCAT
     * Concatenate two values.
     * @example
     * "\"State: \" CONCAT [State_Name]"
     *
     * NEWLINE
     * Insert a new line.
     * @example
     * "\"State: \" CONCAT NEWLINE CONCAT [State_Name]"
     *
     * UCASE([Field])
     * Convert string value to uppercase string.
     * @example
     * "\"State: \" CONCAT UCASE([State_Name])"
     * LCASE([Field])
     * Convert string value to lowercase string.
     * @example
     * "\"State: \" CONCAT LCASE([State_Name])"
     *
     * ROUND([Field], n)
     * Round a decimal number to set number of decimals as specified by (n).
     * @example
     * "\"Area: \" CONCAT ROUND([Area], 3)"
     *
     * FORMATDATETIME([Field], "FormatString")
     * Format a date/time value with the specified format (FormatString*). The following keywords are recognized:
     *    d—Day of the month
     *    ddd—Abbreviated day of the week
     *    dddd—Full day of the week
     *    M—Month in number
     *    MMM—Abbreviated month name
     *    MMMM—Full month name
     *    y—Two digit year
     *    yyyy—Four digit year
     *    h—Hour in 12-hour format
     *    H—Hour in 24-hour format
     *    m—Two digit minute
     *    s—Two digit second
     * FormatString also supports full range of Python date/time formats.
     * @example
     * "\"Date Modified: \" CONCAT FORMATDATETIME([modified],\"dddd, MMM d, yyyy\")"
     */
    "labelExpression": string;
    "useCodedValues": boolean;
    "symbol": ITextSymbol;
    "minScale": number;
    "maxScale": number;
    /**
     * Use where to determine the features that are labeled with the label class that contains it.
     */
    "where": string;
}

export interface ILabelingInfo extends Array<ILabelClass> { }

export interface ILayerSource {
    type: "mapLayer" | "dataLayer";
}

export interface IDynamicMapLayer extends ILayerSource {
    type: "mapLayer"; // required
    mapLayerId: number; // required
    gdbVersion?: "<version name>";
}

export interface IDynamicDataLayer extends ILayerSource {
    type: "dataLayer"; // required
    dataSource: IDataSource; // required
    fields: IField[] | null;
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
// TODO: Add types from http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#/Mosaic_rule_objects/02r3000000s4000000/


export type MosaicMethod =
    /** None */
    "esriMosaicNone" |
    /** Center */
    "esriMosaicCenter" |
    /** NorthWest */
    "esriMosaicNorthwest" |
    /** Nadir */
    "esriMosaicNadir" |
    /** Viewpoint */
    "esriMosaicViewpoint" |
    /** ByAttribute */
    "esriMosaicAttribute" |
    /** LockRaster */
    "esriMosaicLockRaster" |
    /** Seamline */
    "esriMosaicSeamline";

export interface IMosaicRule {
    mosaicMethod: MosaicMethod;
    where: string; // "<where>", //Use where clause to define a subset of rasters used in the mosaic, be aware that the rasters may not be visible at all scales
    sortField: string; // "<sortFieldName>", //The field name used together with esriMosaicAttribute method
    sortValue: number; // The base sort value used together with esriMosaicAttribute method and sortField parameter
    ascending: boolean; // Indicate whether to use ascending or descending order.
    lockRasterIds: number[]; // Lock a few rasters in the image service. Used together with esriMosaicLockRaster. These rasters are forced to be visible at all scales.Be aware of the maxMosaicImageCount limit of the service.
    viewpoint: IPoint; // Use a view point along with esriMosaicViewpoint.
    fids: number[]; // use the raster id list to define a subset of rasters used in the mosaic, be aware that the rasters may not be visible at all scales.
    mosaicOperation: "MT_FIRST" | "MT_LAST" | "MT_MIN" | "MT_MAX" | "MT_MEAN" | "MT_BLEND" | "MT_SUM"; // Use the mosaic operation to resolve overlap pixel values: from first or last raster, use the min, max or mean of the pixel values, or blend them.
    itemRenderingRule?: any; // <renderingRule> optional. new at 10.2. the rendering rule applies on items before mosaicking.
    multidimensionalDefinition?: IDimensionalDefinition[]; // optional. new at 10.3. filtering by variable/dimensions
}

export interface IDimensionalDefinition {
    variableName: string;
    dimensionName: string;
    /**
     * each element can be a single value, or an array of two values (lower and upper bound)
     */
    values: Array<number | number[]>;
    isSlice?: boolean;
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

export interface IBasemap {
    basemapLayers: IBaseMapLayer[];
    title: string;
}

export interface IBaseMapLayer {
    /**
     * A unique identifying string for the layer.
     */
    id: string;

    /**
     * Boolean property determining whether the basemap layer appears on top of all operational layers (true) or beneath all operational layers (false). Typically, this value is set to true on reference layers such as road networks, labels, or boundaries. The default value is false.
     */
    isReference?: boolean;

    /**
     * The degree of transparency applied to the layer, where 0 is full transparency and 1 is no transparency.
     */
    opacity?: number;

    /**
     * A special string identifier used when the basemap is from Bing Maps or OpenStreetMap. When this property is included, the url property is not required. Acceptable values include: OpenStreetMap | BingMapsAerial | BingMapsRoad | BingMapsHybrid
     */
    type?: "OpenStreetMap" | "BingMapsAerial" | "BingMapsRoad" | "BingMapsHybrid";

    /**
     * The URL to the layer.
     */
    url?: string;

    /**
     * Boolean property determining whether the layer is initially visible in the web map.
     */
    visibility?: boolean;
}

export interface IBookmark {
    extent: IEnvelope;
    name: string;
}

export interface IDrawingInfo {
    /**
     * A Boolean indicating whether symbols should stay the same size in screen units as you zoom in. A value of true means the symbols stay the same size in screen units regardless of the map scale.
     */
    fixedSymbols: boolean;
    /**
     * A renderer object, defined using the syntax of the ArcGIS REST API. This provides the symbology for the layer.
     */
    renderer: IRenderer;
}

export interface IFeatureCollection {
    layers: ILayer[];
    showLegend?: boolean;
}

export interface ILayerDefinitionField extends IField {
    editable?: boolean;
    nullable?: boolean;
}

export interface ILayerDefinition {
    /**
     * An optional SQL-based definition expression string that narrows the data to be displayed in the layer. Used with feature services and single layers from ArcGIS for Server map services.
     * @example
     * "STATE_NAME='Kansas' and POP2007>25000"
     */
    definitionExpression?: string;

    /** A string containing the name of the field that best summarizes the feature. Values from this field are used by default as the titles for pop-up windows. */
    displayField: string;

    /** A drawingInfo object containing drawing, labeling, and transparency information for the layer. */
    drawingInfo: IDrawingInfo;

    /** An array of field objects containing information about the attribute fields for the feature collection or layer. */
    fields: ILayerDefinitionField;

    /**
     * A string defining the type of geometry used in the layer definition. Available values are: esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon | esriGeometryEnvelope.
     *
     * This property is used with feature collections and CSV files. The only supported geometry for CSV files is esriGeometryPoint.
     */
    geometryType: esriGeometryType;

    /** A Boolean indicating whether attachments should be loaded for the layer. */
    hasAttachments: boolean;

    /** A number representing the maximum scale at which the layer definition will be applied. The number is the scale's denominator; thus, a value of 2400 represents a scale of 1/2,400. A value of 0 indicates that the layer definition will be applied regardless of how far you zoom in. */
    maxScale: number;

    /** A number representing the minimum scale at which the layer definition will be applied. The number is the scale's denominator; thus, a value of 2400 represents a scale of 1/2,400. */
    minScale: number;

    /** A string containing a unique name for the layer that can be displayed in a legend. */
    name: string;

    /** A string indicating the name of the object ID field in the dataset. */
    objectIdField: string;

    /**
     * An array of template objects describing features that can be created in this layer. Templates are used with map notes, other feature collections, and editable web-based CSV layers. They are not used with ArcGIS feature services, which already have feature templates defined in the service.
     *
     * Templates are defined as a property of the layer definition when there are no types defined; otherwise, templates are defined as properties of the types.
     */
    templates: ITemplate;

    /** A string indicating whether the layerDefinition applies to a Feature Layer or a Table. */
    type: string;

    /** A string containing the name of the field holding the type ID for the features, if types exist for the dataset. Each available type has an ID, and each feature's typeIdField can be read to determine the type for each feature. */
    typeIdField: string;

    /**
     * An array of type objects available for the dataset. This is used when the typeIdField is populated.
     * Types contain information about the combinations of attributes that are allowed for features in the dataset. Each feature in the dataset can have a type, indicated in its typeIdField.
     */
    types: IType;

}

export interface IFieldInfo {
    /**
     * A string containing the field name as defined by the service.
     */
    fieldName: string;

    /**
     * A format object used with numerical or date fields to provide more detail about how the value should be displayed in a web map pop-up window.
     */
    format?: IFormat;

    /**
     * A Boolean determining whether users can edit this field.
     */
    isEditable: boolean;

    /**
     * A string containing the field alias. This can be overridden by the web map author.
     */
    label: string;

    /**
     * A string determining what type of input box editors see when editing the field. Applies only to string fields. Acceptable values are as follows:
     *  textbox — A single-line input box
     *  textarea — A multiple-line input box
     *  richtext — A rich text editor allowing for bold text, highlighting, and so forth
     */
    stringFieldOption: "textbox" | "textarea" | "richtext";

    /**
     * A string providing an editing hint for editors of the field. This string can provide a short description of the field and how editors should format or supply its value.
     */
    tooltip: string;

    /**
     * A Boolean determining whether the field is visible in the pop-up window.
     */
    visible: true;
}

export interface IFormat {
    dateFormat?:
    /** 12/30/1997 */
    "shortDate" |
    /** 30/12/1997 */
    "shortDateLE" |
    /** December 30, 1997 */
    "longMonthDayYear" |
    /** 30 Dec 1997 */
    "dayShortMonthYear" |
    /** Tuesday, December 30, 1997 */
    "longDate" |
    /** 12/30/1997 6:00 PM */
    "shortDateShortTime" |
    /** 30/12/1997 6:00 PM */
    "shortDateLEShortTime" |
    /** 12/30/1997 18:00 */
    "shortDateShortTime24" |
    /** 30/12/1997 18:00 */
    "shortDateLEShortTime24" |
    /** 12/30/1997 5:59:59 PM */
    "shortDateLongTime" |
    /** 30/12/1997 5:59:59 PM */
    "shortDateLELongTime" |
    /** 12/30/1997 17:59:59 */
    "shortDateLongTime24" |
    /** 30/12/1997 17:59:59 */
    "shortDateLELongTime24" |
    /** December 1997 */
    "longMonthYear" |
    /** Dec 1997 */
    "shortMonthYear" |
    /** 1997 */
    "year";
    /**
     * A Boolean used with numerical fields.
     *  A value of true allows the number to have a digit (or thousands) separator when the value appears in pop-up windows.
     * Depending on the locale, this separator is a decimal point or a comma. A value of false means that no separator will be used.
     */
    digitSeparator?: string;
    /**
     * An integer used with numerical fields to specify the number of supported decimal places that should appear in pop-up windows. Any places beyond this value are rounded.
     */
    places?: number;
}

export interface IWebMapLayer {
    /** A featureSet object containing the geometry and attributes of the features in the layer. Used with feature collections only. */
    featureSet: IFeatureSet;

    /** A number indicating the index position of the layer in the WMS or map service. */
    id: number;

    /** An array of layerDefinition objects defining the attribute schema and drawing information for the layer. */
    layerDefinition: ILayerDefinition;

    /** A string URL to a service that should be used for all queries against the layer. Used with hosted tiled map services on ArcGIS Online when there is an associated feature service that allows for queries. */
    layerUrl: string;

    /** A string URL to a legend graphic for the layer. Used with WMS layers. The URL usually contains a GetLegendGraphic request. */
    legendUrl: string;

    /** A string containing a unique name for the layer. Used with WMS layers, where it can sometimes be derived from the layer's index position. */
    name: string;

    /** A user-friendly string title for the layer that can be used in a table of contents. Used with WMS layers. */
    title: string;

    /** A popupInfo object defining the pop-up window content for the layer. */
    popupInfo: IPopupInfo;
}

export interface ILocationInfo {
    locationInfo: {
        locationType: "coordinates",
        latitudeFieldName: string,
        longitudeFieldName: string
    };
}

export interface IMediaInfo {
    /** A string caption describing the media. This can contain a field name enclosed in {}, such as {IMAGECAPTION}. */
    caption: string;

    /** A string title for the media. This can contain a field name enclosed in {}, such as {IMAGETITLE}. */
    title: string;

    /** A string defining the type of media. This can be one of the following: image | barchart | columnchart | linechart | piechart. */
    type: "image" | "barchart" | "columnchart" | "linechart" | "piechart";

    /** A value object containing information about how the image should be retrieved or how the chart should be constructed. */
    value: WebMapValue;

}

export interface IOperationalLayer {
    /** A comma-separated string listing which editing operations are allowed on an editable feature service. Available operations include: Create | Delete | Query | Update | Editing.
     * For example, the string "Create,Query" allows users to create and query features but not update or delete them.
     * By default, all operations already allowed by the service are enabled. You cannot use this property to allow operations that the service publisher or administrator has already forbidden on the service.
     * The Editing operation is for backward compatibility with ArcGIS 10.0, when only the Query and Editing operations were available.
     */
    capabilities: "Create" | "Delete" | "Query" | "Update" | "Editing";

    /** A string defining the character used to separate columns in a CSV file. You can set this property using any of the following: ",", " ", ";", "|", "\t". Used with CSV layers only. */
    columnDelimiter?: "," | " " | ";" | "|" | "\t";

    /** A string containing copyright and access information for a WMS layer. This is copied from the capabilities document exposed by the WMS. */
    copyright?: string;

    /** The rectangular map extent that should be requested from the service, given in the format [[xmin, ymin],[xmax,ymax]]. Used with WMS layers. */
    extent: [[number, number], [number, number]];

    /** A featureCollection object defining a layer of features whose geometry and attributes will be stored directly within the web map. This is only used when no url property is supplied. */
    featureCollection: IFeatureCollection;

    /** An optional string containing the image format to be requested from a WMS. The default is png, and this property only needs to be specified if a different image format will be requested, such as jpg. */
    format?: string;

    /** A unique identifying string for the layer. You can additionally supply the itemId property if the layer comes from an item registered in ArcGIS Online or your organization's portal. */
    id: string;

    /** Optional string containing the item ID of the service if it's registered on ArcGIS Online or your organization's portal. The web map applies any styling and pop-up information contained in the saved item. */
    itemId?: string;

    /** A layerDefinition object defining the attribute schema and drawing information for the layer. Used with CSV layers. */
    layerDefinition: ILayerDefinition;

    /** An array of layer objects, allowing overrides on pop-up content and drawing behavior for the individual layers of a map service. Used with map services. */
    layers: IWebMapLayer;

    /** A locationInfo object defining how location information will be retrieved from a CSV file. Used with CSV layers only. */
    locationInfo: ILocationInfo;

    /** For WMS layers, a string containing the URL of the WMS map. This property is not used with layer types other than WMS. When using a WMS operational layer, you should also supply the url property, which is the URL of the WMS capabilities document. */
    mapUrl?: string;

    /** A number defining the maximum height, in pixels, that should be requested from the service. Used with WMS layers. */
    maxHeight?: number;

    /** A number representing the maximum scale at which the layer will be visible. The number is the scale's denominator; thus, a value of 2400 represents a scale of 1/2,400. A value of 0 indicates that the layer will be visible regardless of how far you zoom in. */
    maxScale?: number;

    /** A number defining the maximum width, in pixels, that should be requested from the service. Used with WMS layers. */
    maxWidth?: number;

    /** A number representing the minimum scale at which the layer will be visible. The number is the scale's denominator; thus, a value of 2400 represents a scale of 1/2,400. */
    minScale?: number;

    /**
     *
     * Used with ArcGIS feature services and individual layers in ArcGIS map services, this property determines how the features are retrieved from the server. This property is represented as 0, 1, or 2.
     *
     * 0—Snapshot mode. Immediately retrieves all features when the map is loaded.
     * 1—On-demand mode. Features within the current view extent are retrieved as the user navigates the map. This is the default and the most common way to use feature services in web maps.
     * 2—Selection-only mode. No features are initially retrieved. This mode is used when you have a map service and a feature service from the same parent URL that are working together in the same map,
     * with the map service being used for display and the feature service used for editing.
     */
    mode: 0 | 1 | 2;

    /** The degree of transparency applied to the layer on the client side, where 0 is full transparency and 1 is no transparency. */
    opacity: number;

    /** A popupInfo object defining the content of pop-up windows when you click or query a feature. */
    popupInfo: IPopupInfo;

    /** An array of numbers containing well-known IDs for spatial references supported by the service. Used with WMS layers. */
    spatialReferences?: number[];

    /** A user-friendly string title for the layer that can be used in a table of contents. If this is not included, a title is derived from the service. */
    title?: string;

    /** If the layer is referenced through a URL, but is not an ArcGIS web service, this parameter can be supplied to denote the layer type. Acceptable values include: CSV | WMS | KML. */
    type: "CSV" | "WMS" | "KML";

    /**
     *
     * The URL to the layer. The URL can reference any of the following:
     *
     * An ArcGIS map service (hosted on ArcGIS for Server or ArcGIS Online).
     * An ArcGIS image service.
     * A single layer in an ArcGIS map service. When using this option, features are retrieved through queries and displayed as client-side graphics.
     * A single layer in an ArcGIS feature service (hosted on ArcGIS for Server or ArcGIS Online).
     * A capabilities document for a WMS service.
     * A KMZ file on a web server.
     * A CSV file on a web server.
     *
     * If the layer is not from a web service but rather a feature collection, then the url property is omitted.
     */
    url: string;

    /** A string containing the version number of the service. Used with WMS layers. */
    version?: string;

    /** Boolean property determining whether the layer is initially visible in the web map. */
    visibility?: boolean;

    /**
     * An array of layers that should appear visible. Used with ArcGIS map services that are not tiled as well as WMS layers.
     * With ArcGIS map services, the array contains integers of the index positions of each visible layer. With WMS layers, the array contains the ID strings of the visible layers
     */
    visibleLayers: number[] | string[];
}

export interface IPopupInfo {
    /** A string that appears in the body of the pop-up window as a description. This can contain a field name enclosed in {}, such as {DETAILS}. */
    description: string;

    /** An array of fieldInfo objects defining how each field in the dataset participates (or does not participate) in the pop-up window. The order of the array is the order that fields are shown in the pop-up window. */
    fieldInfos: IFieldInfo[];

    /** An array of mediaInfo objects that define images and charts displayed in the pop-up window. */
    mediaInfos: IMediaInfo[];

    /** A Boolean property determining whether attachments will be loaded for feature layers that have attachments. */
    showAttachments: boolean;

    /** A string that appears at the top of the pop-up window as a title. This can contain a field name enclosed in {}, such as {NAME}. */
    title: string;
}

export interface ITemplate {
    /** A string containing a detailed description of the template. */
    description: string;

    /** An optional string that can define a client-side drawing tool to be used with this feature. For example, the map notes used by the ArcGIS.com map viewer use the following strings to represent the viewer's different drawing tools  */
    drawingTool?: "esriFeatureEditToolPolygon" | "esriFeatureEditToolTriangle" | "esriFeatureEditToolRectangle" |
    "esriFeatureEditToolLeftArrow" | "esriFeatureEditToolRightArrow" | "esriFeatureEditToolEllipse" | "esriFeatureEditToolUpArrow" |
    "esriFeatureEditToolDownArrow" | "esriFeatureEditToolCircle" | "esriFeatureEditToolFreehand" | "esriFeatureEditToolLine" |
    "esriFeatureEditToolText" | "esriFeatureEditToolPoint";

    /** A string containing a user-friendly name for the template. This name can appear on a menu of feature choices displayed in the client editing environment. */
    name: string;

    /** A feature object representing a prototypical feature for the template. The feature is defined using the syntax of the ArcGIS REST API. */
    prototype: IFeature;

}

export interface IType {

    /**
     * A comma-delimited series of domain objects for each domain in the type. The domain objects are defined using the syntax of the ArcGIS REST API. The domains are listed in the following format:
     * @example
     * "domains" : {
     *   "<domainField1>" : <domain1>,
     *   "<domainField2>" : <domain2>
     * }
     */
    domains: {
        [name: string]: string
    };

    /** A unique numerical ID for the type. */
    id: number;

    /** A string containing a user-friendly name for the type. This can be shown on a menu of feature types that editors can create in the collection. */
    name: string;

    /**
     * An array of template objects describing features that can be created in this layer. Templates are used with map notes, other feature collections, and editable web-based CSV layers.
     * They are not used with ArcGIS feature services, which already have feature templates defined in the service.
     *
     * Templates are defined as a property of the layer definition when there are no types defined; otherwise, templates are defined as properties of the types.
     *
     * You can have more than one template per type if the attributes of available features vary slightly. For example, you might have a type named Copper pipe containing two templates:
     * one whose DIAMETER property is 12 and another whose DIAMETER property is 10.
     */
    templates: ITemplate[];

}

export type WebMapValue = IChartValue | IImageValue;

export interface IChartValue {
    /** Used with charts. An array of strings, with each string containing the name of a field to display in the chart. */
    fields: string[];

    /** Used with charts. An optional string containing the name of a field. The values of all fields in the chart will be normalized (divided) by the value of this field. */
    normalizeField?: string;
}

export interface IImageValue {
    /** Used with images. A string containing a URL to be launched in a browser when a user clicks the image. */
    linkURL: string;

    /** Used with images. A string containing the URL to the image. */
    sourceURL: string;
}
