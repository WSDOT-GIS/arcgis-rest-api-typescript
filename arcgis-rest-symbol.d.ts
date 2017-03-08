export type Color = [number, number, number, number];
export type SimpleMarkerSymbolStyle = "esriSMSCircle" | "esriSMSCross" | "esriSMSDiamond" | "esriSMSSquare" | "esriSMSX" | "esriSMSTriangle";
export type SimpleLineSymbolStyle = "esriSLSDash" | "esriSLSDashDot" | "esriSLSDashDotDot" | "esriSLSDot" | "esriSLSNull" | "esriSLSSolid";
export type SimpleFillSymbolStyle = "esriSFSBackwardDiagonal" | "esriSFSCross" | "esriSFSDiagonalCross" | "esriSFSForwardDiagonal" | "esriSFSHorizontal" | "esriSFSNull" | "esriSFSSolid" | "esriSFSVertical";
export type SymbolType = "esriSLS" | "esriSMS" | "esriSFS" | "esriPMS" | "esriPFS" | "esriTS";

export interface Symbol {
    "type": SymbolType;
    "style"?: string;
}

export interface SimpleLineSymbol extends Symbol {
    "type": "esriSLS";
    "style"?: SimpleLineSymbolStyle;
    "color"?: Color;
    "width"?: number;
}

export interface MarkerSymbol extends Symbol {
    "angle"?: number;
    "xoffset"?: number;
    "yoffset"?: number;
}

export interface SimpleMarkerSymbol extends MarkerSymbol {
    "type": "esriSMS";
    "style"?: SimpleMarkerSymbolStyle;
    "color"?: Color;
    "size"?: number;
    "outline"?: SimpleLineSymbol;
}

export interface SimpleFillSymbol extends Symbol {
    "type": "esriSFS";
    "style"?: SimpleFillSymbolStyle;
    "color"?: Color;
    "outline"?: SimpleLineSymbol; //if outline has been specified
}

export interface PictureSourced {
    "url"?: string; //Relative URL for static layers and full URL for dynamic layers. Access relative URL using http://<mapservice-url>/<layerId1>/images/<imageUrl11>
    "imageData"?: string; //"<base64EncodedImageData>",
    "contentType"?: string;
    "width"?: number;
    "height"?: number;
    "angle"?: number;
    "xoffset"?: number;
    "yoffset"?: number;

}

export interface PictureMarkerSymbol extends MarkerSymbol, PictureSourced {
    "type": "esriPMS";
}

export interface PictureFillSymbol extends Symbol, PictureSourced {
    "type": "esriPFS";
    "outline"?: SimpleLineSymbol; //if outline has been specified
    "xscale"?: number;
    "yscale"?: number;
}

export interface Font {
    "family"?: string; //"<fontFamily>",
    "size"?: number; //<fontSize>,
    "style"?: "italic" | "normal" | "oblique";
    "weight"?: "bold" | "bolder" | "lighter" | "normal";
    "decoration"?: "line-through" | "underline" | "none";
}

export interface TextSymbol extends MarkerSymbol {
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
    "font"?: Font;
    "text"?: string; //only applicable when specified as a client-side graphic.
}