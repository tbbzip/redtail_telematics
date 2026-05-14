import { defineQuery } from "next-sanity";

export const LATEST_BLOG_POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    postType == "blogArticle" &&
    defined(seo.slug.current) &&
    defined(publishedAt) &&
    dateTime(publishedAt) <= dateTime(now())
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

export const ALL_BLOG_POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    postType == "blogArticle" &&
    defined(seo.slug.current) &&
    defined(publishedAt) &&
    dateTime(publishedAt) <= dateTime(now())
  ]
  | order(coalesce(publishedAt, _createdAt) desc){
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

export const ALL_CASE_STUDIES_QUERY = defineQuery(`
  *[
    _type == "post" &&
    postType == "caseStudy" &&
    defined(seo.slug.current) &&
    defined(publishedAt) &&
    dateTime(publishedAt) <= dateTime(now())
  ]
  | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    "excerpt": seo.excerpt,
    "slug": seo.slug.current,
    "mainImage": coalesce(seo.metaImage, blogImage),
    publishedAt,
    "category": coalesce(category->name, "Case Study"),
    "authorName": author->name
  }
`);

export const ALL_GUIDES_QUERY = defineQuery(`
  *[
    _type == "guide" &&
    defined(seo.slug.current) &&
    defined(publishedAt) &&
    dateTime(publishedAt) <= dateTime(now())
  ]
  | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    description,
    "slug": seo.slug.current,
    "mainImage": thumbnail,
    publishedAt,
    "pdfUrl": pdfFile.asset->url
  }
`);

export const ALL_EVENTS_QUERY = defineQuery(`
  *[
    _type == "event" &&
    defined(seo.slug.current) &&
    defined(startDate)
  ]
  | order(startDate asc){
    _id,
    title,
    "excerpt": seo.excerpt,
    "slug": seo.slug.current,
    "mainImage": coalesce(seo.metaImage, eventImage),
    "publishedAt": startDate,
    eventType,
    location,
    organizer,
    registrationUrl
  }
`);

export const RESOURCE_POST_SLUGS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    postType == $postType &&
    defined(seo.slug.current) &&
    defined(publishedAt) &&
    dateTime(publishedAt) <= dateTime(now())
  ]{
    "slug": seo.slug.current
  }
`);

export const RESOURCE_POST_DETAIL_QUERY = defineQuery(`
  *[
    _type == "post" &&
    postType == $postType &&
    seo.slug.current == $slug &&
    defined(publishedAt) &&
    dateTime(publishedAt) <= dateTime(now())
  ][0]{
    _id,
    title,
    "description": coalesce(seo.excerpt, seo.metaDescription),
    "slug": seo.slug.current,
    "image": coalesce(seo.metaImage, blogImage),
    publishedAt,
    content,
    "category": coalesce(category->name, select(postType == "caseStudy" => "Case Study", "Blog")),
    "authorName": author->name,
    "authorImage": author->image
  }
`);

export const EVENT_SLUGS_QUERY = defineQuery(`
  *[
    _type == "event" &&
    defined(seo.slug.current) &&
    defined(startDate)
  ]{
    "slug": seo.slug.current
  }
`);

export const EVENT_DETAIL_QUERY = defineQuery(`
  *[
    _type == "event" &&
    seo.slug.current == $slug &&
    defined(startDate)
  ][0]{
    _id,
    title,
    "descriptionText": seo.excerpt,
    "slug": seo.slug.current,
    "image": coalesce(seo.metaImage, eventImage),
    "publishedAt": startDate,
    "category": eventType,
    "content": description,
    location,
    organizer,
    registrationUrl,
    startDate,
    endDate
  }
`);

export const ACTIVE_CAREER_VACANCIES_QUERY = defineQuery(`
  *[_type == "careerVacancy" && active == true] | order(_createdAt desc){
    _id,
    title,
    department,
    location,
    type,
    summary
  }
`);
