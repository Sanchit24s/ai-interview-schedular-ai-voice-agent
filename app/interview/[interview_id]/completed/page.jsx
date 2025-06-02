import { ArrowRight, Home, Check, Send, Clock } from "lucide-react";
import Image from "next/image";

export default function InterviewComplete() {
    return (
        <div className="bg-white text-gray-900 font-sans antialiased flex flex-col min-h-screen">
            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center space-y-8 py-16 px-4">
                {/* Success Icon */}
                <div className="rounded-full bg-emerald-500 p-4">
                    <Check className="h-12 w-12 text-white" />
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-bold text-center">Interview Complete!</h1>

                {/* Sub-Heading */}
                <p className="text-lg text-gray-600 text-center max-w-2xl">
                    Thank you for participating in the AI-driven interview with
                    AIrecruiter
                </p>

                {/* Image */}
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <div
                        className="w-full h-auto object-cover max-w-4xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center"
                        style={{
                            width: "800px",
                            height: "400px",
                        }}
                    >
                        <div className="text-white text-center">
                            <div className="text-6xl mb-4">🎉</div>
                            <p className="text-xl font-semibold">
                                Interview Successfully Completed
                            </p>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm w-full max-w-xl space-y-4">
                    <div className="flex items-center justify-center rounded-full bg-blue-50 w-12 h-12 mx-auto">
                        <Send className="h-6 w-6 text-blue-600" />
                    </div>

                    <h2 className="text-2xl font-semibold text-center">
                        What&apos;s Next?
                    </h2>
                    <p className="text-gray-600 text-center">
                        The recruiter will review your interview responses and will contact
                        you soon regarding the next steps.
                    </p>
                    <p className="text-gray-500 text-sm text-center flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Response within 2–3 business days
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md">
                    <button className="bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 border border-gray-300 rounded-lg py-3 px-6 flex items-center justify-center space-x-2 transition duration-300 ease-in-out flex-1">
                        <Home className="h-5 w-5" />
                        <span>Return to Homepage</span>
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-6 flex items-center justify-center space-x-2 transition duration-300 ease-in-out flex-1">
                        <span>View Other Opportunities</span>
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 text-center py-4">
                <p>&copy; 2024 AIrecruiter. All rights reserved.</p>
            </footer>
        </div>
    );
}
