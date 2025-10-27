import { ContactPage } from "@/components/ContactPage";
import Container from "@/components/Container";
import Taskbar from "@/components/Taskbar";
import { getPageMetadata } from "@/config/Meta";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...getPageMetadata("/contact-us"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function ContactUs() {
  return (
    <>
      <Container className="py-16">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Contact Us
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Have a question or want to work with us? Fill out the form below.
            </p>
          </div>
          <ContactPage />
        </div>
      </Container>
      <Taskbar />
    </>
  );
}
