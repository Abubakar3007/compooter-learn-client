import { Link, useParams } from "react-router-dom";
import { ChevronDown, CheckCircle2, PlayCircle, ArrowRight } from "lucide-react";
import { EmojiTile, FunCard } from "@/components/ui-fun";
import { totalCourses } from "@/data/content";
import { useProgress } from "@/lib/progress";
import { useState } from "react";

export default function LearnCourse() {
  const { courseId } = useParams<{ courseId: string }>();
  console.log("id",courseId);



  const course = totalCourses.find((c) => c.slug === courseId);
  console.log(course)
  if (!course) return <div className="p-10 text-center text-xl">🙈 Course not found. <Link to="/student/learn" className="text-primary">Back to Learn</Link></div>;
  const { progress } = useProgress();

  const [isOpen, setIsOpen] = useState<number>(-1);

  const handleClick = (index: number) => {
    setIsOpen((prev) => (prev === index ? -1 : index));
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-4 rounded-4xl bg-gradient-hero p-6 text-on-fun shadow-pop">
        <div className="text-6xl">{course.emoji}</div>
        <div>
          <div className="text-sm font-bold opacity-80">{course.level} · {course.classes}</div>
          <h1 className="text-3xl md:text-4xl">{course.topic}</h1>
          <p className="opacity-90">{course.description}</p>
        </div>
      </div>
      <div className="grid gap-3">
        {
          course.topics.map((t, i) => {
            const done = true;
            return (
              <FunCard className="p-4 cursor-pointer" key={i}>
                {/* button */}
                <div
                  className="flex items-center gap-4 justify-between"
                  onClick={() => handleClick(i)}
                >
                  <div className="flex items-center gap-4">
                    <EmojiTile emoji={`${i + 1}`} color={course.color} size="sm" />
                    <div className="flex-1 font-display font-bold">{t?.heading}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">+{t?.qa?.length * 5} XP</span>
                      {done ? <CheckCircle2 className="text-fun-green" /> : <PlayCircle className="text-primary" />}
                    </div>
                    <div className="w-7 h-7 rounded-full transition duration-200 ease-in-out bg-gradient-hero text-white text-fun-gray flex items-center justify-center cursor-pointer">
                      <ChevronDown size={16} className={`transition-transform duration-200 ease-in-out ${isOpen == i ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>
                {/* dropdown */}
                <FunCard className={`p-6 ml-12 space-y-2 transition-height duration-200 ease-in overflow-hidden ${isOpen == i ? 'max-h-[2000px] opacity-100 mt-6 p-6' : 'max-h-0 opacity-0 mt-0 p-0 border-0'}`}>
                  {
                    t.qa.map((q, j) =>
                      <Link to={`/student/learn/${t.slug}/questions/${j + 1}/`} className="block">
                        <FunCard className="flex items-center gap-4 p-3">
                          <EmojiTile emoji={String(j + 1)} color={done ? "green" : course.color} size="sm" />
                          <div className="flex-1 font-display font-bold">{q.question}</div>
                          <span className="text-xs font-bold text-primary">+5 XP</span>
                          {done ? <CheckCircle2 className="text-fun-green" /> : <PlayCircle className="text-primary" />}
                          <div>
                            <ArrowRight className="text-primary" size={16} />
                          </div>
                        </FunCard>
                      </Link>
                    )
                  }
                </FunCard>
              </FunCard>
            )
          })
        }
      </div>
    </div>
  );
}
