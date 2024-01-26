import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Author {
  name: string;
  avatar_urls: {
    24: string;
  };
}

interface AvatarBlogProps {
  author: Author;
}

export default function AvatarBlog({ author }: AvatarBlogProps) {
  return (
    <div className="flex flex-row space-x-2 items-center">
      <Avatar>
        <AvatarImage src={author.avatar_urls[24]} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>{author.name}</p>
    </div>
  );
}
