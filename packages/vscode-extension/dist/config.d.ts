/**
 * Returns configured include and exclude patterns
 */
declare function getIncludeExclude(): Promise<any>;
declare const _default: {
    getIncludeExclude: typeof getIncludeExclude;
    options: {
        navigation: {
            scheme: string;
            authority: string;
        };
    };
};
export default _default;
