export function createElement(tag: string, attrs?: Record<string, any>) {
  const node = document.createElement(tag);
  attrs &&
    Object.keys(attrs).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      node.setAttribute(key, attrs[key]);
    });
  return node;
}

export function removeNode(node: Node) {
  node.parentNode?.removeChild(node);
}
