const importedPosts = import.meta.glob('../content/posts/*.md', { eager: true });

interface PostMetaData {
  title: string;
  slug: string;
  date: string;
}

export const posts: PostMetaData[] = [];
export const postContent: Record<string, string> = {};
for (const path of Object.keys(importedPosts)) {
  const post = importedPosts[path] as { default: unknown, metadata: Omit<PostMetaData, "slug"> };
  const { metadata } = post;
  const { title, date } = metadata;
  posts.push({ title, slug: slugFromPath(path), date });
}

export function slugFromPath(path: string): string {
  const slug = path.split('/').pop();
  if (!slug) {
    return "";
  }
  return slug.replace('.md', '');
}
