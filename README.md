# Dhruvish's Portfolio

This is the personal portfolio of Dhruvish, built with Next.js and TypeScript.

## Features

- **Blog:** A personal blog with articles on web development and technology.
- **Projects:** A showcase of personal and professional projects.
- **Contact Form:** A contact form for inquiries.
- **Theme Switcher:** A theme switcher to toggle between light and dark mode.
- **Responsive Design:** A fully responsive design that works on all devices.

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `bun run dev`: Starts the development server.
- `bun run build`: Builds the application for production.
- `bun run start`: Starts the production server.
- `bun run lint`: Lints the code.
- `bun run fix`: Lints and formats the code.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MDX](https://mdxjs.com/)
- [Shadcn UI](https://ui.shadcn.com/)

## File Structure

```
.
├── apiHooks
│   ├── axiosclient.ts
│   ├── contactApi.ts
│   └── likeBtnApi.ts
├── app
│   ├── (normal)
│   │   ├── blog
│   │   │   ├── [slug]
│   │   │   │   └── page.tsx
│   │   │   ├── BlogPageClient.tsx
│   │   │   └── page.tsx
│   │   ├── contact-us
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── coder
│   │   ├── page.tsx
│   │   └── style.css
│   ├── apple-icon.png
│   ├── favicon.ico
│   ├── globals.css
│   ├── icon0.svg
│   ├── icon1.png
│   └── manifest.json
├── components
│   ├── ai-elements
│   │   └── open-in-chat.tsx
│   ├── blog
│   │   ├── BlogCard.tsx
│   │   ├── BlogComponents.tsx
│   │   ├── BlogContent.tsx
│   │   ├── BlogList.tsx
│   │   ├── CodeCopyButton.tsx
│   │   ├── LikeButton.tsx
│   │   └── ShareButton.tsx
│   ├── svgs
│   │   ├── devices
│   │   │   ├── Headphones.tsx
│   │   │   ├── Keyboard.tsx
│   │   │   ├── Laptop.tsx
│   │   │   ├── Monitor.tsx
│   │   │   ├── Mouse.tsx
│   │   │   └── Phone.tsx
│   │   ├── technologies
│   │   │   ├── Appwrite.tsx
│   │   │   ├── AWS.tsx
│   │   │   ├── BootStrap.tsx
│   │   │   ├── Bun.tsx
│   │   │   ├── CSS.tsx
│   │   │   ├── ExpoApp.tsx
│   │   │   ├── ExpressJs.tsx
│   │   │   ├── Figma.tsx
│   │   │   ├── Github.tsx
│   │   │   ├── Html.tsx
│   │   │   ├── JavaScript.tsx
│   │   │   ├── MDXIcon.tsx
│   │   │   ├── MongoDB.tsx
│   │   │   ├── Motion.tsx
│   │   │   ├── NestJs.tsx
│   │   │   ├── Netlify.tsx
│   │   │   ├── NextJs.tsx
│   │   │   ├── NodeJs.tsx
│   │   │   ├── PostgreSQL.tsx
│   │   │   ├── Postman.tsx
│   │   │   ├── Prisma.tsx
│   │   │   ├── ReactIcon.tsx
│   │   │   ├── Sanity.tsx
│   │   │   ├── Shadcn.tsx
│   │   │   ├── SocketIo.tsx
│   │   │   ├── TailwindCss.tsx
│   │   │   ├── ThreeJs.tsx
│   │   │   ├── TypeScript.tsx
│   │   │   └── Vercel.tsx
│   │   ├── ArrowLeft.tsx
│   │   ├── ArrowRight.tsx
│   │   ├── ArrowUpRight.tsx
│   │   ├── ArrowUUpRight.tsx
│   │   ├── Calender.tsx
│   │   ├── Chat.tsx
│   │   ├── ChatBubbleIcon.tsx
│   │   ├── CheckCircle.tsx
│   │   ├── Code.tsx
│   │   ├── Copied.tsx
│   │   ├── Copy.tsx
│   │   ├── CV.tsx
│   │   ├── Gear.tsx
│   │   ├── Github.tsx
│   │   ├── LinkedIn.tsx
│   │   ├── Mail.tsx
│   │   ├── Moon.tsx
│   │   ├── PlayCircle.tsx
│   │   ├── SendIcon.tsx
│   │   ├── Sun.tsx
│   │   ├── Website.tsx
│   │   ├── Whatsapp.tsx
│   │   └── X.tsx
│   ├── ui
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── command.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── kbd.tsx
│   │   ├── label.tsx
│   │   ├── scroll-area.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   ├── sonner.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── tooltip.tsx
│   ├── ClientMotion.tsx
│   ├── command-menu.tsx
│   ├── ContactPage.tsx
│   ├── Container.tsx
│   ├── FontSizeControls.tsx
│   ├── Footer.tsx
│   ├── Github.tsx
│   ├── Hero-section.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   ├── RecentPosts.tsx
│   ├── search-bar.tsx
│   ├── search-provider.tsx
│   ├── SwaggerUIClone.tsx
│   ├── Taskbar.tsx
│   ├── ThemeProviders.tsx
│   └── ThemeSwitch.tsx
├── config
│   ├── config.ts
│   ├── Github.tsx
│   ├── Meta.tsx
│   └── projects.ts
├── data
│   └── blog
│       └── [blog-posts]
├── hooks
│   ├── use-haptic-feedback.ts
│   └── use-mobile.ts
├── lib
│   ├── blog.ts
│   ├── lenis.ts
│   └── utils.ts
├── public
│   ├── blogs
│   │   └── [blog-assets]
│   ├── fonts
│   │   ├── HankenGrotesk-Italic-Variable.ttf
│   │   └── HankenGrotesk-Variable.ttf
│   ├── meta
│   ├── web-app-manifest-192x192.png
│   └── web-app-manifest-512x512.png
├── scripts
│   ├── generate-rss.ts
│   └── generate-sitemap.ts
├── types
│   └── blog.ts
├── .env
├── .prettierignore
├── bun.lock
├── components.json
├── env.example
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
```

## License

This project is licensed under the MIT License.
