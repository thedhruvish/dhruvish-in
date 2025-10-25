import Container from "@/components/Container";
import { Footer } from "@/components/Footer";
import Github from "@/components/Github";
import { HeroSection } from "@/components/Hero-section";
import { Projects } from "@/components/Projects";
import { RecentPosts } from "@/components/RecentPosts";
import ReactIcon from "@/components/svgs/technologies/ReactIcon";
import Taskbar from "@/components/Taskbar";

export default function Home() {
  return (
    <>
      <Container>
        <HeroSection />
        <RecentPosts />
        <Projects
          projects={[
            {
              title: "Hello World",
              description: "Hello World",
              github: "https://github.com/thedhruvish",
              link: "https://github.com/thedhruvish",
              tech: [
                {
                  name: "React",
                  icon: <ReactIcon />,
                },
              ],
            },
          ]}
        />
        <Github />
        <Footer />
      </Container>
      <Taskbar />
    </>
  );
}
