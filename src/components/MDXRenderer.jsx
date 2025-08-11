// src/components/MDXRenderer.jsx
"use client";
import { useMDXComponent } from "next-contentlayer2/hooks";
import useMDXComponents from "@/app/mdx-components";
import Image from "next/image";

export default function MDXRenderer({ code }) {
  const MDX = useMDXComponent(code);
  // Build the map on the client (do NOT pass from server)
  const components = useMDXComponents({ Image });
  return <MDX components={components} />;
}
