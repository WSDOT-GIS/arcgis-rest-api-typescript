import { IFeature, IFeatureSet, IField } from "./arcgis-rest";
import { esriGeometryType, IEnvelope } from "./geometry";
import { ILayer } from "./layer";
import { IRenderer } from "./renderer";

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
    value: IValue;

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
