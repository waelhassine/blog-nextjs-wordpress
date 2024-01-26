import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  coverImageUrl: string;
  slug?: string;
};

export default function CoverImage({ title, coverImageUrl, slug }: Props) {
  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      src={coverImageUrl}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title} legacyBehavior>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
