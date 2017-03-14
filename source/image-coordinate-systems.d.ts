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
