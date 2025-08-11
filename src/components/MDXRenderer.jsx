"use client";
import { useMDXComponent } from "next-contentlayer2/hooks";

export default function MDXRenderer({ code, components }) {
  const MDX = useMDXComponent(code);
  return <MDX components={components} />;
}
