module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  rules: {
    "@turbo/no-undeclared-env-vars": "off",
    "@next/next/no-img-element": "off",
  },
};
