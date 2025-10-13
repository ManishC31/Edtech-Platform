import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
import AppLogo from "@/components/custom/Logo";
import { ModeToggle } from "@/components/mode-toggle";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: 0.06 * i, duration: 0.48 } }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-6 md:px-8">
        <Hero />
        <InDemandCourses />
        <LatestCourses />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  return (
    <header className="border-b bg-background/60 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <AppLogo />
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Button variant="ghost" className="ml-2" onClick={() => navigate("/login")}>
            Sign In
          </Button>
          <Button onClick={() => navigate("/register")}>Sign Up</Button>
          <ModeToggle />
        </nav>
        <div className="md:hidden">
          <Button variant="ghost">Menu</Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-16 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div className="lg:col-span-7" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold leading-tight">
            Deliver better learning outcomes.
            <br />
            Build courses. Track learners. Scale revenue.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground max-w-2xl">
            End-to-end EdTech platform built for instructors and schools. Course authoring, cohort management, analytics, and payments.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
            <Button className="shadow-md">Join as an Educator</Button>
            <Button variant="outline">Continue as a Student</Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Course Builder preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56 w-full rounded-md bg-card text-muted-foreground flex items-center justify-center">Mock course editor preview</div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between items-center">
                <Badge variant="secondary">New</Badge>
                <div className="text-sm text-muted-foreground">Preview of the drag & drop course builder.</div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function InDemandCourses() {
  const courses = Array.from({ length: 4 }, (_, i) => ({ title: `In-Demand Course ${i + 1}` }));
  return (
    <section id="in-demand" className="py-12">
      <h2 className="text-2xl font-bold mb-6">In-Demand Courses</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Course description goes here.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link">Enroll Now</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LatestCourses() {
  const courses = Array.from({ length: 4 }, (_, i) => ({ title: `Latest Course ${i + 1}` }));
  return (
    <section id="latest" className="py-12">
      <h2 className="text-2xl font-bold mb-6">Latest Courses</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Course description goes here.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link">Enroll Now</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const questions = Array.from({ length: 10 }, (_, i) => ({ q: `Question ${i + 1}`, a: `Answer for question ${i + 1}` }));
  return (
    <section id="faq" className="py-12">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold">Frequently asked questions</h3>
          <p className="mt-2 text-muted-foreground">Click to expand answers for common questions.</p>
        </div>
        <div className="flex flex-col gap-2">
          {questions.map((q, i) => (
            <Collapsible key={i}>
              <CollapsibleTrigger className="w-full text-left font-semibold py-2 px-3 bg-card text-foreground rounded-md shadow-sm hover:bg-accent/50">
                {q.q}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 text-sm text-muted-foreground bg-card rounded-md shadow-inner">{q.a}</CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-12 border-t bg-background/60">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-primary p-2 text-primary-foreground font-bold">EDU</div>
          <div>EduJunction © {new Date().getFullYear()}</div>
        </div>
        <div className="text-sm text-muted-foreground">Privacy · Terms · Status</div>
      </div>
    </footer>
  );
}
