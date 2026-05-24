import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['assets/js/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',   // assets/js files are plain scripts (no ESM)
            globals: {
                document:   'readonly',
                window:     'readonly',
                navigator:  'readonly',
                setTimeout: 'readonly',
                Fuse:       'readonly',
                Plotly:     'readonly',
            },
        },
        rules: {
            'no-unused-vars':    ['warn', { argsIgnorePattern: '^_' }],
            'no-console':         'warn',
            'prefer-const':       'error',
            'eqeqeq':             ['error', 'always'],
            'curly':              ['error', 'all'],
            'semi':               ['error', 'always'],
            'quotes':             ['error', 'single', { avoidEscape: true }],
            'indent':             ['error', 4],
            'no-trailing-spaces': 'error',
            'eol-last':           'error',
        },
    },
];
