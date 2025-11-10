(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/src/pages/HomePage.tsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/client_src_936f4d17._.js",
  "static/chunks/node_modules_d46a928d._.js",
  {
    "path": "static/chunks/client_src_acdcd990._.css",
    "included": [
      "[project]/client/src/components/homepage/Navbar.css [app-client] (css)",
      "[project]/client/src/components/homepage/Hero.css [app-client] (css)",
      "[project]/client/src/components/homepage/FeaturesSection.css [app-client] (css)",
      "[project]/client/src/components/homepage/Footer.css [app-client] (css)",
      "[project]/client/src/pages/HomePage.css [app-client] (css)"
    ],
    "moduleChunks": [
      "static/chunks/client_src_components_homepage_Navbar_css_bad6b30c._.single.css",
      "static/chunks/client_src_components_homepage_Hero_css_bad6b30c._.single.css",
      "static/chunks/client_src_components_homepage_FeaturesSection_css_bad6b30c._.single.css",
      "static/chunks/client_src_components_homepage_Footer_css_bad6b30c._.single.css",
      "static/chunks/client_src_pages_HomePage_css_bad6b30c._.single.css"
    ]
  },
  "static/chunks/client_src_pages_HomePage_tsx_28f86941._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/client/src/pages/HomePage.tsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);