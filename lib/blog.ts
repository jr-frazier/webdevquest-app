import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  content: string;
}

export function getAllPosts(fileName: string): BlogPost[] {
    const blogDirectory = path.join(process.cwd(), fileName);
  // Get all markdown files
  const fileNames = fs.readdirSync(blogDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Parse frontmatter
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        excerpt: data.excerpt || '',
        author: data.author || '',
        tags: data.tags || [],
        content,
      };
    });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      author: data.author || '',
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}
