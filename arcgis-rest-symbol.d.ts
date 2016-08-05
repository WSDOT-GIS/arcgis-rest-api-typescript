declare namespace ArcGis.Rest {
    type Color = [number, number, number, number]
    type SimpleMarkerSymbolStyle = "esriSMSCircle" | "esriSMSCross" | "esriSMSDiamond" | "esriSMSSquare" | "esriSMSX" | "esriSMSTriangle"
    type SimpleLineSymbolStyle = "esriSLSDash" | "esriSLSDashDot" | "esriSLSDashDotDot" | "esriSLSDot" | "esriSLSNull" | "esriSLSSolid"
    type SimpleFillSymbolStyle = "esriSFSBackwardDiagonal" | "esriSFSCross" | "esriSFSDiagonalCross" | "esriSFSForwardDiagonal" | "esriSFSHorizontal" | "esriSFSNull" | "esriSFSSolid" | "esriSFSVertical"
    type SymbolType = "esriSLS" | "esriSMS" | "esriSFS" | "esriPMS" | "esriPFS" | "esriTS"

    interface Symbol {
        "type": SymbolType;
        "style"?: string;
    }

    interface SimpleLineSymbol extends Symbol {
        "type": "esriSLS",
        "style"?: SimpleLineSymbolStyle,
        "color"?: Color,
        "width"?: number,
    }

    interface MarkerSymbol extends Symbol {
        "angle"?: number,
        "xoffset"?: number,
        "yoffset"?: number,
    }

    interface SimpleMarkerSymbol extends MarkerSymbol {
        "type": "esriSMS",
        "style"?: SimpleMarkerSymbolStyle,
        "color"?: Color,
        "size"?: number,
        "outline"?: SimpleLineSymbol
    }

    interface SimpleFillSymbol extends Symbol {
        "type": "esriSFS",
        "style"?: SimpleFillSymbolStyle,
        "color"?: Color
        "outline"?: SimpleLineSymbol //if outline has been specified
    }

    interface PictureSourced {
        "url"?: string, //Relative URL for static layers and full URL for dynamic layers. Access relative URL using http://<mapservice-url>/<layerId1>/images/<imageUrl11>
        "imageData"?: string, //"<base64EncodedImageData>",
        "contentType"?: string,
        "width"?: number,
        "height"?: number,
        "angle"?: number,
        "xoffset"?: number,
        "yoffset"?: number

    }

    interface PictureMarkerSymbol extends MarkerSymbol, PictureSourced {
        "type": "esriPMS",
    }

    interface PictureFillSymbol extends Symbol, PictureSourced {
        "type": "esriPFS",
        "outline"?: SimpleLineSymbol, //if outline has been specified
        "xscale"?: number,
        "yscale"?: number,
    }

    interface Font {
        "family"?: string, //"<fontFamily>",
        "size"?: number, //<fontSize>,
        "style"?: "italic" | "normal" | "oblique"
        "weight"?: "bold" | "bolder" | "lighter" | "normal",
        "decoration"?: "line-through" | "underline" | "none"
    }

    interface TextSymbol extends MarkerSymbol {
        "type": "esriTS",
        "color"?: Color,
        "backgroundColor"?: Color,
        "borderLineSize"?: number, // <size>,
        "borderLineColor"?: Color,
        "haloSize"?: number, // <size>,
        "haloColor"?: Color,
        "verticalAlignment"?: "baseline" | "top" | "middle" | "bottom",
        "horizontalAlignment"?: "left" | "right" | "center" | "justify",
        "rightToLeft"?: boolean,
        "kerning"?: boolean,
        "font"?: Font,
        "text"?: string //only applicable when specified as a client-side graphic.
    }
}