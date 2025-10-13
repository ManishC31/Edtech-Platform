import { Button } from "../ui/button";

export const Hero = () => {
  return (
    <section className="py-20 text-center">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Learn Frm Professionals</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Free and open-source landing page template built with React, TypeScript, Shadcn UI, and Tailwind CSS.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Star on GitHub</Button>
      </div>
    </section>
  );
};
