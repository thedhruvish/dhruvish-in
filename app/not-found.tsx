import Container from "@/components/Container";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReactLenis from "lenis/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <ReactLenis root>
      <Navbar isSearch={false} />
      <Container className=" py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          {/* The "404" number */}
          <h1 className="text-8xl font-extrabold tracking-tight text-primary md:text-9xl">
            404
          </h1>

          {/* The title */}
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Page Not Found
          </h2>

          {/* The description */}
          <p className="mt-2 max-w-md text-lg text-muted-foreground">
            Oops! The page you are looking for doesn&apos;t exist or has been
            moved.
          </p>

          {/* The "Go Home" button (styled like your primary button) */}
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg border bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-transform hover:scale-105 hover:shadow-md"
          >
            Go back home
          </Link>
        </div>
      </Container>
      <Footer />
    </ReactLenis>
  );
}
