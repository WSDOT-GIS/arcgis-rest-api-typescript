export interface Domain {
    "type": "coded" | "inherited" | "range";
}

export interface RangeDomain extends Domain {
    "type": "range";
    "name": string;
    "range": [number, number];
}

export interface CodedValueDomain {
    "type": "codedValue";
    "name": string;
    "codedValues": Array<{
        name: string,
        code: number | string,
    }>;
}

export interface InheritedDomain {
    type: "inherited";
}