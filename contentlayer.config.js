import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.@(en|zh).mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    subtitle: { type: "string" },
    status: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    cover: { type: "string" },
    links: { type: "json" },
    date: { type: "date" },
  },
  computedFields: {
    locale: {
      type: "string",
      resolve: (doc) =>
        doc._raw.flattenedPath.match(/\.([a-z]{2})$/)?.[1] ?? "en",
    },
    slug: {
      type: "string",
      resolve: (doc) =>
        doc._raw.flattenedPath
          .replace(/^projects\//, "")
          .replace(/\.en$|\.zh$/, ""),
    },
    url: {
      type: "string",
      resolve: (doc) => `/${doc.locale}/projects/${doc.slug}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Project],
  mdx: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
});
