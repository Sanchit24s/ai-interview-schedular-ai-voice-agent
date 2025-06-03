import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview, viewDetail = false }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;
    const copyLink = () => {
        navigator.clipboard.writeText(url);
        toast("Copied");
    };

    const onSend = () => {
        const subject = encodeURIComponent("AiCruiter Interview Link");
        const body = encodeURIComponent("Interview Link: " + url);
        const recipient = encodeURIComponent("sanchitbhoyar17@gmail.com");

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;

        window.open(gmailUrl, "_blank");
    };

    return (
        <div className="p-5 bg-white rounded-lg border">
            <div className="flex items-center justify-between">
                <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
                <h2 className="text-sm text-gray-500">
                    {moment(interview?.created_at).format("DD MMM YYYY")}
                </h2>
            </div>

            <h2 className="mt-3 font-bold text-lg text-gray-800">
                {interview?.jobPosition}
            </h2>
            <h2 className="mt-2 text-gray-600 flex justify-between">{interview?.duration}
                <span className="text-green-700">{interview['Interview-feedback'].length} Candidates</span>
            </h2>

            {!viewDetail ? (
                <div className="flex gap-3 mt-4">
                    <Button
                        variant="outline"
                        className="flex-1 flex items-center justify-center gap-2"
                        onClick={copyLink}
                    >
                        <Copy className="h-4 w-4" />
                        Copy Link
                    </Button>
                    <Button
                        className="flex-1 flex items-center justify-center gap-2"
                        onClick={onSend}
                    >
                        <Send className="h-4 w-4" />
                        Send
                    </Button>
                </div>
            ) : (
                <Button className="mt-5 w-full" variant="outline">
                    View Detail <ArrowRight />
                </Button>
            )}
        </div>
    );
}

export default InterviewCard;
