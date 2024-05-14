import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout/layout';

export default function BlogPost({ data }) {
  const post = data.markdownRemark;
  const date = new Date(post.frontmatter.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      <div className="w-100">
        <h1>{post.frontmatter.title}</h1>
        <small>{formattedDate}</small>
        <div className="mt-5" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
}
export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`;
