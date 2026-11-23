
import React from "react";
import { X } from "lucide-react";

interface LessonImagePopupProps {
    imagePath: string;
    imageName: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LessonImagePopup({
    imagePath,
    imageName,
    isOpen,
    setIsOpen,
}: LessonImagePopupProps) {

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
            <div
                className="relative w-full max-w-5xl h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute -right-3 -top-3 z-10 w-10 h-10 rounded-full bg-white shadow-lg grid place-items-center hover:bg-gray-100"
                >
                    <X size={22} />
                </button>

                {/* Image */}
                <img
                    src={imagePath}
                    alt={imageName}
                    className="w-full h-full object-contain rounded-xl"
                />
            </div>
        </div>
    );
}
