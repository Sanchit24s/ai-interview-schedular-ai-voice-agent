import { Calendar, Clock, MessageCircleQuestionIcon } from "lucide-react";
import moment from "moment";
import React from "react";

function InterviewDetailContainer({ interviewDetail }) {
    // Safely parse interviewDetail.type
    let typeValue = "N/A";
    try {
        const parsed = JSON.parse(interviewDetail?.type);
        if (Array.isArray(parsed)) {
            typeValue = parsed[0] || "N/A";
        }
    } catch (err) {
        console.warn("Failed to parse interview type:", err);
    }

    return (
        <div className="p-5 bg-white rounded-lg mt-5">
            <h2>{interviewDetail?.jobPosition || "Untitled Position"}</h2>

            <div className="mt-4 flex items-center justify-between">
                <div>
                    <h2 className="text-sm text-gray-500">Duration</h2>
                    <h2 className="flex text-sm font-bold items-center gap-2">
                        <Clock className="h-4 w-4" /> {interviewDetail?.duration || "N/A"}
                    </h2>
                </div>
                <div>
                    <h2 className="text-sm text-gray-500">Created On</h2>
                    <h2 className="flex text-sm font-bold items-center gap-2">
                        <Calendar className="h-4 w-4" />{" "}
                        {interviewDetail?.created_at
                            ? moment(interviewDetail.created_at).format("MMM DD, YYYY")
                            : "N/A"}
                    </h2>
                </div>
                <div>
                    <h2 className="text-sm text-gray-500">Type</h2>
                    <h2 className="flex text-sm font-bold items-center gap-2">
                        <Clock className="h-4 w-4" /> {typeValue}
                    </h2>
                </div>
            </div>
            <div className="mt-5">
                <h2 className="font-bold">Job Description</h2>
                <p className="text-sm leading-6">{interviewDetail?.jobDescription}</p>
            </div>

            <div className="mt-5">
                <h2 className="font-bold">Interview Questions</h2>
                <div className="grid grid-cols-2 gap-3 mt-3">
                    {interviewDetail?.questionList.map((item, index) => (
                        <h2 key={index} className="text-xs flex"> {index + 1}.{item?.question}</h2>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InterviewDetailContainer;
