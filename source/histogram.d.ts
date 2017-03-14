export interface IHistogram {
    /**
     * int, number of bins
     */
    "size": number;
    /** minimum value */
    "min": number;
    /** maximum value */
    "max": number;
    /**
     * integer(64bit), counts of pixels in each bin. The width of each bin is (max-min)/size.
     */
    "counts": number[];
}
