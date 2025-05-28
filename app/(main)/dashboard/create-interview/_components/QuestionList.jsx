import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader, Loader2, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuid4 } from "uuid";

function QuestionList({ formData }) {
    const [loading, setLoading] = useState(false);
    const [questionList, setQuestionList] = useState([]);
    const { user } = useUser();
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        if (formData) {
            generateQuestionList();
        }
    }, [formData]);

    const generateQuestionList = async () => {
        setLoading(true);
        try {
            const result = await axios.post("/api/ai-model", { ...formData });
            const raw = result.data.content.replace(/```json|```/g, "").trim();

            const parsed = JSON.parse(raw);
            const questions = parsed?.interviewQuestions || [];

            setQuestionList(questions);
            console.log("Generated Questions:", questions);
        } catch (error) {
            console.error("Error generating questions:", error);
            toast("Server error, try again!");
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async () => {
        const interview_id = uuid4();
        setSaveLoading(true);
        const { data, error } = await supabase
            .from("Interviews")
            .insert([
                {
                    ...formData,
                    questionList: questionList,
                    userEmail: user?.email,
                    interview_id: interview_id,
                },
            ])
            .select();

        setSaveLoading(false);
    };

    return (
        <div>
            {loading && (
                <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
                    <Loader2Icon className="animate-spin" />
                    <div>
                        <h2 className="font-medium">Generating Interview Questions</h2>
                        <p className="text-primary">
                            Our AI is crafting personalized questions based on your job
                            position.
                        </p>
                    </div>
                </div>
            )}

            {questionList.length > 0 && (
                <div>
                    <QuestionListContainer questionList={questionList} />
                </div>
            )}

            <div className="flex justify-end mt-10">
                <Button onClick={() => onFinish()} disabled={saveLoading}>
                    {saveLoading && <Loader2 className="animate-spin" />} Finish
                </Button>
            </div>
        </div>
    );
}

export default QuestionList;
