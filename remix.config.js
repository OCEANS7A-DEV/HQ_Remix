/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {},
  ignoredRouteFiles: ["**/.*"],
  server: false, // 👈 これで静的ビルドにする
  serverBuildPath: "build/index.js",
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/HQ_Remix/build/",
};
