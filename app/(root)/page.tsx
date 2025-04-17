import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-ready with ai </h2>

                    <p className="text-lg">Practice bro</p>

                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>

                <Image
                    src="/robot.png"
                    width={400}
                    height={400}
                    alt="Robot Logo"
                    className="max-md:hidden"
                />
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>

                <div className="interviews-section">
                    {dummyInterviews.map((interview) => {
                        return (
                            <InterviewCard {...interview} key={interview.id} />
                        );
                    })}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an interview</h2>

                <div className="interviews-section">
                    {dummyInterviews.map((interview) => {
                        return (
                            <InterviewCard {...interview} key={interview.id} />
                        );
                    })}
                </div>
            </section>
        </>
    );
}

export default page;
