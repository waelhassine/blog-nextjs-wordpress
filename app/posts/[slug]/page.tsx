import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Date from "@/components/component/date";
import { getPostBySlug } from "@/lib/backend";
import parse from "html-react-parser";
import type { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params

  const slug = params.slug;

  // fetch data
  const { post } = await getPostBySlug(slug);
  const titt = parse(post.title.rendered);
  console.log(parse(post.title.rendered));
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: parse(post.title.rendered).toString(),
    description: parse(post.title.rendered).toString(),
  };
}
export default async function Post({ params }: { params: { slug: string } }) {
  const { post } = await getPostBySlug(params.slug);

  if (!post) {
    // Handle the case where the post is not available
    return <div>Post not found</div>;
  }

  const { title, featured_media, date, categories, slug, excerpt } = post;
  const coverImageUrl = featured_media
    ? post._embedded["wp:featuredmedia"][0].source_url
    : null;
  const categoryName =
    categories.length > 0 ? post._embedded["wp:term"][0][0].name : null;
  const author = post._embedded["author"][0];

  return (
    <article className="w-full flex flex-col justify-center items-center space-y-2 pt-12 px-8">
      {categoryName && <Badge variant="outline">{categoryName}</Badge>}
      <p
        className="text-3xl font-medium text-center lg:max-w-[500px]"
        dangerouslySetInnerHTML={{ __html: title.rendered }}
      ></p>
      <div className="flex flex-row space-x-2 items-center pb-16">
        {author.avatar_urls[24] ? (
          <Avatar>
            <AvatarImage src={author.avatar_urls[24]} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <div>No avatar available</div>
        )}
        <div className="flex flex-col">
          <p className="">{author.name}</p>
          <p className="font-thin text-gray-500">
            <Date dateString={date} /> · 8 min read
          </p>
        </div>
      </div>

      <Image
        src={coverImageUrl} // Assuming the structure of your media object
        className="rounded-2xl lg:min-w-[900px] w-[900px] min-h-[400px] max-h-[500px]"
        alt="image-blog"
        height={400}
        width={900}
      />
      <div className="max-w-[700px] py-16">
        <p
          className="font-thin"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></p>
      </div>
    </article>
  );
}
