import { esriGeometryType, SpatialReference } from "./geometry";

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
