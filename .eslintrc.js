module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        // "semi": [
        //     "error",
        //     "always"
        // ],
        "no-console": ["error", {"allow": ["error", "warn", "log"]}],
        "no-extra-parens": ["error"],
        "no-prototype-builtins": ["error"],
        "no-template-curly-in-string": ["error"],
        "accessor-pairs": ["error", {"setWithoutGet": true, "getWithoutSet": true}],
        "block-scoped-var": ["error"],
        // "curly": ["error"],
        "default-case": ["error", { "commentPattern": "^skip\\sdefault" }],
        "dot-location": ["error", "property"],
        "dot-notation": ["error"],
        "eqeqeq": ["error", "always"],
        "no-empty-function": ["error"],
        "no-extra-bind": ["error"],
        "no-global-assign": ["error", {"exceptions": ["Object"]}],
        "no-useless-call":["error"],
        "radix": ["error"],
        "require-await": ["error"],
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "array-bracket-spacing": ["error", "always"],
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        "camelcase": ["error"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "computed-property-spacing": ["error", "never"],
        "key-spacing": ["error", { "afterColon": true, "mode": "strict" }],
        "keyword-spacing": ["error"],
        "lines-around-comment": ["error", { "beforeBlockComment": true, "beforeLineComment": true }],
        "object-curly-spacing": ["error", "always"],
        "operator-assignment": ["error", "always"],
        quotes: ["error", "single"],
        "semi-spacing": ["error", {"before": false, "after": true}],
        // "space-in-parens": ["error", "always"],
        "space-infix-ops": ["error"],
        "switch-colon-spacing": ["error", {"after": true, "before": false}],
        "spaced-comment": ["error", "always"],
        "arrow-spacing": ["error"],
        "generator-star-spacing": ["error", {"before": true, "after": false}],
        "no-confusing-arrow": ["error"],
        "no-duplicate-imports": ["error"],
        "prefer-template": ["error"],
        "sort-imports": ["error", {
            "ignoreCase": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": ["all", "multiple", "single", "none"]
        }],
        "yield-star-spacing": ["error", {"before": true, "after": false}]
    }
};
