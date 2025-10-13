import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="container mx-auto px-6 md:px-8">
        <Hero />
        {/* <TrustedLogos /> */}
        <InDemandCourses />
        <LatestCourses />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="border-b bg-white/60 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-gradient-to-r from-indigo-500 to-emerald-400 p-2 text-white font-bold">EDU</div>
          <div className="font-semibold">EduJunction</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-indigo-600" href="#in-demand">
            In Demand
          </a>
          <a className="hover:text-indigo-600" href="#latest">
            Latest
          </a>
          <a className="hover:text-indigo-600" href="#faq">
            FAQ
          </a>
          <Button variant="ghost" className="ml-2">
            Sign In
          </Button>
          <Button>Get Started</Button>
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
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight">
            Deliver better learning outcomes.
            <br />
            Build courses. Track learners. Scale revenue.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-slate-600 max-w-2xl">
            End-to-end EdTech platform built for instructors and schools. Course authoring, cohort management, analytics, and payments.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
            <Button className="shadow-md">Get Started</Button>
            <Button variant="outline">Request Demo</Button>
          </motion.div>
          <motion.form variants={fadeUp} className="mt-8 max-w-xl">
            <div className="flex gap-2">
              <Input placeholder="Enter your work email" />
              <Button>Join</Button>
            </div>
            <div className="mt-3 text-xs text-slate-500">No credit card required. Cancel anytime.</div>
          </motion.form>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Course Builder preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56 w-full rounded-md bg-gradient-to-br from-white to-slate-100 flex items-center justify-center">
                <div className="text-slate-400">Mock course editor preview</div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between items-center">
                <Badge>New</Badge>
                <div className="text-sm text-slate-500">Preview of the drag & drop course builder.</div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function TrustedLogos() {
  const logos = ["Google", "Udemy", "Coursera", "Stripe", "Zoom"];
  return (
    <div className="mt-6 mb-10">
      <div className="flex flex-wrap items-center gap-6 justify-center opacity-80 text-sm">
        {logos.map((l) => (
          <div key={l} className="px-3 py-1 rounded-md bg-white/60 shadow-sm">
            {l}
          </div>
        ))}
      </div>
    </div>
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
                <p className="text-sm text-slate-600">Course description goes here.</p>
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
                <p className="text-sm text-slate-600">Course description goes here.</p>
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
  const questions = Array.from({ length: 5 }, (_, i) => ({ q: `Question ${i + 1}`, a: `Answer for question ${i + 1}` }));
  return (
    <section id="faq" className="py-12">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold">Frequently asked questions</h3>
          <p className="mt-2 text-slate-600">Click to expand answers for common questions.</p>
        </div>
        <div className="flex flex-col gap-2">
          {questions.map((q, i) => (
            <Collapsible key={i}>
              <CollapsibleTrigger className="w-full text-left font-semibold py-2 px-3 bg-white rounded-md shadow-sm hover:bg-slate-50">
                {q.q}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 text-sm text-slate-600 bg-white rounded-md shadow-inner">{q.a}</CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-12 border-t bg-white/60">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-gradient-to-r from-indigo-500 to-emerald-400 p-2 text-white font-bold">EDU</div>
          <div>EduJunction © {new Date().getFullYear()}</div>
        </div>
        <div className="text-sm text-slate-600">Privacy · Terms · Status</div>
      </div>
    </footer>
  );
}
