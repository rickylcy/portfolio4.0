// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
var Project = defineDocumentType(() => ({
  name: "Project",
  // Your files live under src/content/projects/*.en.mdx / *.zh.mdx
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    subtitle: { type: "string", required: false },
    status: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    cover: { type: "string", required: false },
    date: { type: "date", required: false },
    // ✅ keep links as JSON (avoid 'nested' to dodge the bug)
    links: { type: "json", required: false },
    // ✅ screenshots as list of strings
    screenshots: { type: "list", of: { type: "string" }, required: false },
    // Optional flags
    featured: { type: "boolean", required: false, default: false },
    featuredRank: { type: "number", required: false },
    description: { type: "string", required: false }
  },
  computedFields: {
    // src/content/projects/anyportal.en.mdx -> 'projects/anyportal.en'
    locale: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.match(/\.([a-z]{2})$/)?.[1] ?? "en"
    },
    // remove leading "projects/" and trailing ".en"/".zh"
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^projects\//, "").replace(/\.en$|\.zh$/, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/${doc.locale}/projects/${doc.slug}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/content",
  documentTypes: [Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug]
  }
  // (optional) silence the alias warning on Windows
  // disableImportAliasWarning: true,
});
export {
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-M3KPOFQL.mjs.map
