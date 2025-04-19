import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import {
    getCurrentUser,
    getInterviewsByUserId,
    getLatestInterviews,
} from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function page() {
    const user = await getCurrentUser();

    const [userInterviews, latestInterviews] = await Promise.all([
        await getInterviewsByUserId(user?.id),
        await getLatestInterviews({ userId: user?.id }),
    ]);

    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpcomingInterviews = latestInterviews?.length > 0;

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
                    {hasPastInterviews ? (
                        userInterviews.map((interview) => {
                            return (
                                <InterviewCard
                                    {...interview}
                                    key={interview.id}
                                />
                            );
                        })
                    ) : (
                        <p>You haven't taken any interviews</p>
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an interview</h2>

                <div className="interviews-section">
                    {hasUpcomingInterviews ? (
                        latestInterviews.map((interview) => {
                            return (
                                <InterviewCard
                                    {...interview}
                                    key={interview.id}
                                />
                            );
                        })
                    ) : (
                        <p>No upcoming interviews</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default page;
