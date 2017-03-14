export interface IDomain {
    type: "codedValue" | "inherited" | "range";
}

export interface IRangeDomain extends IDomain {
    type: "range";
    name: string;
    range: [number, number];
}

export interface ICodedValueDomain extends IDomain {
    type: "codedValue";
    name: string;
    codedValues: Array<{
        name: string,
        code: number | string
    }>;
}

export interface IInheritedDomain {
    type: "inherited";
}
