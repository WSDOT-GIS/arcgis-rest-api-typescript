// TODO: Add types from http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#/Mosaic_rule_objects/02r3000000s4000000/

import { IPoint } from "./geometry";

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
