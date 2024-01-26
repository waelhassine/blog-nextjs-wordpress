import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import DateComponent from "./date";
import Link from "next/link";

type Author = {
  name: string;
  avatar_urls: {
    24: string;
  };
};

type CardBlogProps = {
  title: { rendered: string };
  coverImageUrl: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export default function CardBlog({
  title,
  coverImageUrl,
  date,
  excerpt,
  author,
  slug,
}: CardBlogProps) {
  return (
    <Link href={`/posts/${slug}`}>
      <Card className="flex flex-col rounded-lg">
        <Image
          alt={`Cover Image for ${title.rendered}`}
          src={coverImageUrl}
          className="w-full rounded-lg max-h-72 min-h-72"
          height={100}
          width={400}
        />
        <div className="p-4">
          <p
            className="font-medium"
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          ></p>
          <div className="flex flex-row justify-between items-center py-4 text-sm font-thin">
            <div className="flex flex-row space-x-2 items-center">
              <Avatar>
                <AvatarImage src={author.avatar_urls[24]} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{author.name}</p>
            </div>
            <p>
              <DateComponent dateString={date} />
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
