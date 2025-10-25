import ExpressJs from "@/components/svgs/technologies/ExpressJs";
import MongoDB from "@/components/svgs/technologies/MongoDB";
import NodeJs from "@/components/svgs/technologies/NodeJs";
import ReactIcon from "@/components/svgs/technologies/ReactIcon";

export type Tech = {
  name: string;
  icon: React.ComponentType;
};

export type Project = {
  title: string;
  description: string;
  image?: string;
  github?: string;
  link?: string;
  tech?: Tech[];
};

export const projectList: Project[] = [
  {
    title: "storage-web-app",
    description:
      "A modern, full-stack web application for secure file storage, sharing, and management with a Google Drive-like interface.",
    github: "https://github.com/thedhruvish/storage-web-app",
    tech: [
      {
        name: "React",
        icon: ReactIcon,
      },
      {
        name: "Nodejs",
        icon: NodeJs,
      },
      {
        name: "Expressjs",
        icon: ExpressJs,
      },
      {
        name: "MongoDB",
        icon: MongoDB,
      },
    ],
  },
];
