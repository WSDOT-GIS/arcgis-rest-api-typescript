import { esriGeometryType, SpatialReference } from "./geometry";

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
