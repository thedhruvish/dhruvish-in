import Container from "@/components/Container";
import { FileSearch } from "lucide-react";
import { Metadata } from "next";
import { Link } from "next-view-transitions-react-19";

export const metadata: Metadata = {
  title: "Blog Not Found",
  description:
    "The blog post you're looking for either doesn't exist, was moved, or is still a draft.",
};

export default function NotFoundBlog() {
  return (
    <Container className=" py-16 ">
      <div className="flex flex-col items-center gap-4">
        <FileSearch className="h-20 w-20 text-primary md:h-24 md:w-24" />

        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Blog Not Found
        </h2>

        <p className="mt-2 max-w-md text-lg text-muted-foreground">
          Oops! The blog post you&apos;re looking for either doesn&apos;t exist,
          was moved, or is still a draft.
        </p>

        <Link
          href="/blog"
          className="mt-6 inline-block rounded-lg border bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-transform hover:scale-105 hover:shadow-md"
        >
          View All Posts
        </Link>
      </div>
    </Container>
  );
}
