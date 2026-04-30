import { defineQuery } from "next-sanity";

export const LATEST_BLOG_POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    postType == "blogArticle" &&
    defined(seo.slug.current)
  ]
  | order(coalesce(publishedAt, _createdAt) desc)[0...4]{
    _id,
    title,
    "excerpt": seo.excerpt,
    "slug": seo.slug.current,
    "mainImage": coalesce(seo.metaImage, blogImage),
    publishedAt,
    "category": coalesce(category->name, "Blog"),
    "authorName": author->name
  }
`);
