
const CircularProgress = ({ percentage = 70 }) => {
    const radius = 68;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex items-center justify-center">
            <div className="relative h-9 w-9">
                <svg
                    className="-rotate-90 h-full w-full"
                    viewBox="0 0 160 160"
                >
                    {/* Background Circle */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke="#DDE1E5"
                        strokeWidth="11"
                    />

                    {/* Progress Circle */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke="#E64B38"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                        className="transition-all duration-700 ease-in-out"
                    />
                </svg>

                {/* Percentage Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-black">
                        {percentage}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CircularProgress;