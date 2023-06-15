const FS_LAYERS = [
	'routers',
	'controllers',
	'middleware',
	'models',
	'services',
	'shared',
	'src',
];

module.exports = {
	root: true,
	env: {
		browser: false,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:import/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	plugins: ['prettier', '@typescript-eslint', 'import', 'check-file'],
	rules: {
		'check-file/folder-naming-convention': [
			'error',
			{ 'src/**/': 'KEBAB_CASE' },
		],
		'import/order': [
			'error',
			{
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'always',
				pathGroups: [
					...FS_LAYERS.map((layer) => ({
						pattern: `**/?(*)${layer}{,/**}`,
						group: 'internal',
						position: 'after',
					})),
					{
						pattern: `**/?(*)types{,/**}`,
						group: 'type',
						position: 'after',
					},
				],
				distinctGroup: false,
				groups: [
					'builtin',
					'external',
					'internal',
					'type',
					'parent',
					'sibling',
					'index',
				],
			},
		],
		// 'boundaries/element-types': [
		// 	'warn',
		// 	{
		// 		// Allow or disallow any dependency by default
		// 		default: 'allow',
		// 		// Define a custom message for this rule
		// 		message: '${file.type} is not allowed to import ${dependency.type}',
		// 		rules: [
		// 			{
		// 				from: ['@models'],
		// 				disallow: ['@src/constants', { family: from.family }],
		// 				message: `Models must not import others thing than constants, models`,
		// 			},
		// 			{
		// 				// In this type of files...
		// 				from: ['@services'],
		// 				// ...allow importing this type of elements
		// 				disallow: ['@src/constants', '@shared', '@models'],
		// 				// ...and return this custom error message
		// 				message: `Servies must not import others thing than constants, models and stuff from shared`,
		// 			},
		//
		// 			{
		// 				from: ['@controllers'],
		// 				disallow: ['@src/constants', { family: from.family }],
		// 				message: `Models must not import others thing than constants, models`,
		// 			},
		// 		],
		// 	},
		// ],
	},
};
