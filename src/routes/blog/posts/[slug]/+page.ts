import { error } from "@sveltejs/kit";

import { slugFromPath } from "../../../../lib/posts";

export async function load({ params }) {
  const modules = import.meta.glob('../../../../content/posts/*.md');

  let match: { path?: string; resolver?: App.MdsvexResolver } = {};
  for (const [path, resolver] of Object.entries(modules)) {
    if (params.slug === slugFromPath(path)) {
      match = { path, resolver: resolver as unknown as App.MdsvexResolver };
    }
  }

  const post = await match?.resolver?.();
  if (!post) {
    throw error(404, 'Not found');
  }
  
  return {
    component: post.default,
    metadata: post.metadata
  }
}
