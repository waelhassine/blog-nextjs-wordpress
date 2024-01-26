import Image from "next/image";
import { Card } from "@/components/ui/card";

import DateComponent from "./date";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type Post = {
  key: string;
  title: { rendered: string };
  featured_media: number | null;
  date: string;
  categories: { name: string }[];
  slug: string;
  _embedded: {
    "wp:featuredmedia": { source_url: string }[];
    "wp:term": { name: string }[][];
    author: { name: string; avatar_urls: { 24: string } }[];
  };
};

type CardHeroProps = {
  post: Post;
};

export default function CardHero({ post }: CardHeroProps) {
  const { title, featured_media, date, categories, slug, key } = post;
  const coverImageUrl = featured_media
    ? post._embedded["wp:featuredmedia"][0].source_url
    : "";
  const categoryName =
    categories.length > 0 ? post._embedded["wp:term"][0][0].name : null;
  const author = post._embedded["author"][0];

  return (
    <Link href={`/posts/${slug}`}>
      <Card className="grid lg:grid-cols-2" key={key}>
        <Image
          alt={`Cover Image for ${title}`}
          src={coverImageUrl}
          className="rounded-l-xl"
          height={700}
          width={700}
        />
        <div className="flex flex-col h-full justify-center items-start space-y-4 lg:p-12 p-8 lg:px-12 px-4">
          <div className="flex flex-row space-x-2 items-center">
            <Avatar>
              <AvatarImage src={author.avatar_urls[24]} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{author.name}</p>
          </div>
          <div
            className="text-2xl font-medium"
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          />

          <div className="flex flex-col space-y-1 text-sm font-thin">
            <p>{categoryName}</p>
            <DateComponent dateString={date} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
