export default function useMDXComponents(components) {
  return {
    h2: (props) => (
      <h2 className="text-xl font-semibold mt-8 mb-3" {...props} />
    ),
    p: (props) => (
      <p
        className="leading-7 text-gray-700 dark:text-gray-300 my-3"
        {...props}
      />
    ),
    ul: (props) => <ul className="list-disc pl-6 my-3" {...props} />,
    li: (props) => <li className="my-1" {...props} />,
    a: (props) => <a className="underline" {...props} />,
    ...components,
  };
}
