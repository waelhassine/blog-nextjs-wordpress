import CardBlog from "@/components/component/card-blog";
import CardHero from "@/components/component/card-horo";
import type { Metadata } from "next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import { getAllPosts } from "@/lib/backend";
import Link from "next/link";

interface HomePageParams {
  searchParams: {
    page: string;
  };
}
export const metadata: Metadata = {
  title: "Final Answer",
  description:
    "Welcome to our website covering blogger, technology, and lifestyle.",
};

export default async function Home({ searchParams }: HomePageParams) {
  const perPage = 10;
  const pageNumber = Number(searchParams.page ?? 1);
  const { posts, totalPosts } = await getAllPosts(pageNumber, 10);
  const morePosts = posts.slice(1);
  return (
    <main className="w-full flex ease-in-out duration-300  flex-col space-y-16 items-center justify-between py-12 px-2">
      <CardHero post={posts[0]} />
      <p className="text-3xl font-medium pt-24">Latest articles</p>
      <div className="grid lg:grid-cols-3 gap-6 lg:px-16">
        {morePosts.map((post: any) => {
          const { title, featured_media, date, categories, slug, excerpt } =
            post;
          const coverImageUrl = featured_media
            ? post._embedded["wp:featuredmedia"][0].source_url
            : null;
          const categoryName =
            categories.length > 0 ? post._embedded["wp:term"][0][0].name : null;
          const author = post._embedded["author"][0];
          return (
            <div key={post.id}>
              <CardBlog
                title={title}
                coverImageUrl={coverImageUrl}
                date={date}
                author={author}
                slug={slug}
                excerpt={excerpt}
              />
            </div>
          );
        })}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Link href={`/?page=${Math.max(1, pageNumber - 1)}`} legacyBehavior>
              <PaginationPrevious />
            </Link>
          </PaginationItem>

          {[...Array(Math.ceil((totalPosts as number) / perPage))].map(
            (_, index) => (
              <PaginationItem key={index}>
                <Link href={`/?page=${index + 1}`} legacyBehavior>
                  <PaginationLink isActive={index + 1 === pageNumber}>
                    {index + 1}
                  </PaginationLink>
                </Link>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <Link
              href={`/?page=${Math.min(
                Math.ceil((totalPosts as number) / perPage),
                pageNumber + 1,
              )}`}
              legacyBehavior
            >
              <PaginationNext />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
