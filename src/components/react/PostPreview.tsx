import * as React from "react";

interface IPostPreviewProps {
  post: any;
}

const PostPreview: React.FunctionComponent<IPostPreviewProps> = ({ post }) => {
  return (
    <div className="flex justify-start gap-6 w-[48em]">
      <a href={post.url}>
        <img
          className="rounded-md"
          src={post.frontmatter.coverImage}
          width={300}
          height={200}
          alt={post.frontmatter.title}
        />
      </a>
      <div className="w-[70%]">
        <h3 className="text-orange-500 text-lg font-medium hover:underline">
          <a href={post.url}>{post.frontmatter.title}</a>
        </h3>
        <p className="dark:text-white line-clamp-4">
          {post.frontmatter.description}
        </p>
      </div>
    </div>
  );
};

export default PostPreview;
