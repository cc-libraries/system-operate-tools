module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": 0,
        "no-console": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "no-debugger": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "comma-dangle": 'always',
        "no-unused-vars": ['all']
    }
};