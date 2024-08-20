declare module 'papaparse' {
    interface ParseResult<T> {
        data: T[];
        errors: { code: string; message: string }[];
        meta: {
            delimiter: string;
            linebreak: string;
            aborted: boolean;
            fields: string[];
        };
    }
    interface PapaParse {
        parse<T>(input: string | File, config?: ParseConfig): ParseResult<T>;
        unparse<T>(data: T[], config?: UnparseConfig): string;
    }

    interface ParseConfig {
        delimiter?: string;
        header?: boolean;
        dynamicTyping?: boolean;
        skipEmptyLines?: boolean;
        comments?: string;
        transform?: (value: any, header: string) => any;
    }

    interface UnparseConfig {
        delimiter?: string;
        quotes?: boolean | ((field: string) => boolean);
        newline?: string;
        header?: boolean;
    }

    const Papa: PapaParse;
    export default Papa;
}
