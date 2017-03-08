import { HtmlPopupType, IField } from "./arcgis-rest";
import { IDomain } from "./domain";
import { esriGeometryType, IEnvelope } from "./geometry";
import { IRenderer } from "./renderer";

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
        respectsDaylightSaving: boolean,
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
        timeOffsetUnits: TimeOffsetUnits,
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
        labelingInfo: any | null, // <labelingInfo> // TODO: figure out info for this type.
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
            [domainField: string]: IDomain,
        },
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
        keyFieldInRelationshipTable: string, // "<key field in AttributedRelationshipClass table that matches keyField>"

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
        supportsTrueCurve: true,
    };
}
