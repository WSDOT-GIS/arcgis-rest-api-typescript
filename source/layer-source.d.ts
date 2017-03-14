import { IField } from "./arcgis-rest";
import { IDataSource } from "./data-source";

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
