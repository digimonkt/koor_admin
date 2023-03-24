// craco.config.js
const path = require("path");
const alias = (prefix = "src") => ({
  "@components": `${prefix}/components`,
  "@assets": `${prefix}/assets`,
  "@redux": `${prefix}/redux`,
  "@utils": `${prefix}/utils`,
  "@api": `${prefix}/api`,
  "@firebaseProvider": `${prefix}/firebaseProvider`,
  "@pages": `${prefix}/pages`,
});

const SRC = "./src";
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

module.exports = {
  webpack: {
    alias: resolvedAliases,
    headers: {
      "X-Frame-Options": "sameorigin",
      "Strict-Transport-Security":
        "max-age=31536000; includeSubDomains; preload",
    },
  },
};
