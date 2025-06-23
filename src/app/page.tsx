import { ArrowRight, File, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-4xl mx-auto text-center py-40">
          <Badge>
            <Sparkles /> For final year students
          </Badge>
          <div className="text-6xl font-bold mt-5">
            <h1>Create Your Compilo.</h1>
            <h1 className="mt-2">Build Your Portfolio.</h1>
            <h1 className="text-primary mt-2">In Minutes</h1>
          </div>
          <p className="mt-8 text-lg">
            Compilo helps students generate professional PDF biodata and
            personalized portfolios like name.compilo.com to showcase education,
            experience, and projects.
          </p>
          <div className="flex gap-5 max-w-xl mx-auto mt-10">
            <Button
              asChild
              className="flex flex-1 text-lg font-bold py-6 items-center justify-center gap-5"
            >
              <Link href={"/create-biodata"}>
                Try without signup <ArrowRight />
              </Link>
            </Button>
            <Button
              variant={"outline"}
              className="flex flex-1 text-lg font-bold py-6 items-center justify-center gap-5"
            >
              Claim your compilo
            </Button>
          </div>
        </div>
      </section>
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold">Everything You Need to Stand Out</h2>
        <p className="mt-4 text-lg">
          Professional tools designed specifically for students entering the job
          <br /> market
        </p>
        <div className="max-w-6xl mt-10 grid grid-cols-4 gap-10 mx-auto">
          <div className="rounded-lg px-4 py-6 flex flex-col items-center border">
            <div className="p-3 rounded-lg w-max bg-primary/20 hover:bg-primary/50 text-primary hover:text-white hover:shadow-2xl transition-all">
              <File />
            </div>
            <p className="mt-3 font-bold text-lg">
              Export Professional BioData
            </p>
            <p className="mt-2 font-medium text-muted-foreground">
              Generate clean, ATS-friendly PDF biodata with professional
              formatting and layouts.
            </p>
          </div>
          <div className="rounded-lg px-4 py-6 flex flex-col items-center border">
            <div className="p-3 rounded-lg w-max bg-primary/20 hover:bg-primary/50 text-primary hover:text-white hover:shadow-2xl transition-all">
              <File />
            </div>
            <p className="mt-3 font-bold text-lg">
              Export Professional BioData
            </p>
            <p className="mt-2 font-medium text-muted-foreground">
              Generate clean, ATS-friendly PDF biodata with professional
              formatting and layouts.
            </p>
          </div>
          <div className="rounded-lg px-4 py-6 flex flex-col items-center border">
            <div className="p-3 rounded-lg w-max bg-primary/20 hover:bg-primary/50 text-primary hover:text-white hover:shadow-2xl transition-all">
              <File />
            </div>
            <p className="mt-3 font-bold text-lg">
              Export Professional BioData
            </p>
            <p className="mt-2 font-medium text-muted-foreground">
              Generate clean, ATS-friendly PDF biodata with professional
              formatting and layouts.
            </p>
          </div>
          <div className="rounded-lg px-4 py-6 flex flex-col items-center border">
            <div className="p-3 rounded-lg w-max bg-primary/20 hover:bg-primary/50 text-primary hover:text-white hover:shadow-2xl transition-all">
              <File />
            </div>
            <p className="mt-3 font-bold text-lg">
              Export Professional BioData
            </p>
            <p className="mt-2 font-medium text-muted-foreground">
              Generate clean, ATS-friendly PDF biodata with professional
              formatting and layouts.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold">See Compilo in Action</h2>
        <p className="mt-4 text-lg">
          Professional biodata and portfolio examples created with Compilo
        </p>
        <div className="mt-10 grid grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/60 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-32 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-24 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                PDF Biodata
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="h-96 bg-gradient-to-br from-primary/20 to-primary/50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-6 bg-primary/60 rounded w-32"></div>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-white rounded shadow"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-white rounded shadow"></div>
                    <div className="h-20 bg-white rounded shadow"></div>
                  </div>
                  <div className="h-12 bg-white rounded shadow"></div>
                </div>
              </div>
              <div className="absolute -top-2 -left-2 bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                name.compilo.com
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center py-10 bg-accent">
        © 2024 Compilo. All rights reserved. Built for students, by students.
      </section>
    </div>
  );
}
