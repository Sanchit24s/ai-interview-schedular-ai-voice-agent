"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";

function ScheduledInterview() {
    const [interviewList, setInterviewList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && getInterviewList();
    }, [user]);

    const getInterviewList = async () => {
        const result = await supabase
            .from("Interviews")
            .select("jobPosition,duration,interview_id,Interview-feedback(userEmail)")
            .eq("userEmail", user?.email)
            .order("id", { ascending: false });

        setInterviewList(result?.data);
    };

    return (
        <div className="mt-5">
            <h2 className="font-bold text-2xl">
                Interview List with Candidate Feedback
            </h2>

            {interviewList.length == 0 && (
                <div className="p-5 flex flex-col gap-3 items-center mt-5 bg-white">
                    <Video className="h-10 w-10 text-primary" />
                    <h2>You don't have any interview created!</h2>
                    <Button>+ Create New Interview</Button>
                </div>
            )}

            {interviewList && (
                <div className="grid mt-5 grid-cols-2 xl:grid-cols-3 gap-5">
                    {interviewList.map((interview, index) => (
                        <InterviewCard interview={interview} key={index} viewDetail={true} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ScheduledInterview;
