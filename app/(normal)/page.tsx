import Container from "@/components/Container";
import Github from "@/components/Github";
import { HeroSection } from "@/components/Hero-section";
import { Projects } from "@/components/Projects";
import { RecentPosts } from "@/components/RecentPosts";
import Taskbar from "@/components/Taskbar";

export default function Home() {
  return (
    <>
      <Container>
        <HeroSection />
        <RecentPosts />
        <Projects />
        <Github />
      </Container>
      <Taskbar />
    </>
  );
}
