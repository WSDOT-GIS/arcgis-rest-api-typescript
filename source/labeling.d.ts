import { ITextSymbol } from "./symbol";

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
