import pluginJs from "@eslint/js";


export default [
  {files: [
      "**/*.js"
    ], 
    languageOptions: {
      sourceType: "commonjs"
    }
  },
  {
    rules: {
        "no-unused-vars": "warn",
        "no-param-reassign": "off",
        "no-undef": "off",
        "globals": {
          "ethers": "readonly"
      }
    }
  },
  
  pluginJs.configs.recommended,
];