import { Link, useParams } from "react-router-dom";
import { ChevronDown, CheckCircle2, PlayCircle, ArrowRight, Zap, Droplets, BookOpen } from "lucide-react";
import { EmojiTile, FunCard } from "@/components/ui-fun";
import { totalCourses } from "@/data/content";
import { useProgress } from "@/lib/progress";
import { useState, useEffect } from "react";
import CircularProgress from "@/components/CircularProgress";
import { useProgressStore } from "@/stores/useProgressStore";

interface Lesson {
  id: string;
  title: string;
}

interface Props {
  lessons: Lesson[];
}

const badgeProfile = [
  {
    icon: Zap,
    total: "240 XP",
    title: "Total earned"
  },
  {
    icon: Droplets,
    total: "5 Days",
    title: "Learning Streak"
  },
  {
    icon: BookOpen,
    total: "12 Lessons",
    title: "Lessons done"
  },
]

export default function LearnCourse() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = totalCourses.find((c) => c.slug === courseId);
  console.log(course)
  const [isOpen, setIsOpen] = useState<number>(-1);

  const completedLessons = useProgressStore((state) => state.completedLessons);
  const fetchProgress = useProgressStore((state) => state.fetchProgress);

  // Fetch completed lessons from MongoDB
  useEffect(() => {
    if (courseId) {
      fetchProgress(courseId);
    }
  }, [courseId, fetchProgress]);

  const handleClick = (index: number) => {
    setIsOpen((prev) => (prev === index ? -1 : index));
  };

  if (!course) {
    return (
      <div className="p-10 text-center text-xl">
        🙈 Course not found.{" "}
        <Link to="/student/learn" className="text-primary">
          Back to Learn
        </Link>
      </div>
    );
  }

  //   // Total lessons in course
  const totalLessons = course.topics.reduce((total, topic) => total + (topic.qa?.length || 0), 0);

  //   // Completed lessons in course
  const completedCount = completedLessons.length;

  //   // Overall progress percentage
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  //   // Calculate XP
  const totalXP = completedCount * 5;

  const badgeProfile = [
    {
      icon: Zap,
      total: `${totalXP} XP`,
      title: "Total earned",
    },
    {
      icon: BookOpen,
      total: `${completedCount}/${totalLessons}`,
      title: "Lessons completed",
    },
    {
      icon: CheckCircle2,
      total: `${progressPercentage}%`,
      title: "Course progress",
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-4 rounded-4xl bg-gradient-hero p-6 text-on-fun shadow-pop">
        <div className="text-6xl">{course.emoji}</div>
        {/* course description */}
        <div className="w-full">
          <div className="text-sm font-bold opacity-80">{course.level} · {course.classes}</div>
          <h1 className="text-3xl md:text-4xl">{course.topic}</h1>
          <p className="opacity-90">{course.description}</p>
          {/* percentage */}
          <div className="mt-4">
            <div className="flex justify-between gap-2 items-center">
              <h3 className="font-bold text-xl">Course Progress</h3>
              <span className="text-base font-semibold">{progressPercentage}%</span>
            </div>

            <div className="w-full h-3 bg-white/50 rounded-full shadow-sm mt-2 overflow-hidden">
              <div className='h-full bg-white' style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <p className="mt-1 text-xs opacity-90">
              {completedCount} of {totalLessons} lessons completed
            </p>
          </div>
        </div>

      </div>
      {/* course badge */}
      <div className="grid grid-cols-5 mt-10">
        {
          badgeProfile.map((data, i) => {
            const Icon = data.icon;
            return (
              <div key={i}>
                <Icon size={32} className="text-primary" />
                <h4 className="text-3xl my-1">{data.total}</h4>
                <p className="text-gray-600">{data.title}</p>
              </div>
            )
          })
        }
      </div>
      <div className="grid gap-3 mt-10">
        <h2 className="text-2xl mb-4">Course Curriculum</h2>
        {
          course.topics.map((t: any, i: number) => {
            const questions = t.qa || [];
            // Stable ID for every lesson
            const topicLessonIds = questions.map((_, j: number) => `${t.slug}:${j + 1}`);

            // Completed lessons in this topic
            const topicCompletedCount = topicLessonIds.filter((id: any) => completedLessons.includes(id)).length;

            const topicTotal = questions.length;

            const topicPercentage = topicTotal > 0 ? Math.round((topicCompletedCount / topicTotal) * 100) : 0;
            const isTopicCompleted = topicTotal > 0 && topicCompletedCount === topicTotal;

            return (
              <FunCard className="p-4 cursor-pointer" key={i}>
                {/* button */}
                <div
                  className="flex items-center gap-4 justify-between"
                  onClick={() => handleClick(i)}
                >
                  <div className="flex items-center gap-4">
                    <EmojiTile
                      emoji={`${i + 1}`}
                      color={isTopicCompleted ? "green" : course.color}
                      size="sm"
                    />
                    <div>
                      <h3 className="font-display font-bold">
                        {t.heading}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 font-semibold">
                        {topicCompletedCount}/{topicTotal} lessons
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">+{topicTotal * 5} XP</span>
                      {isTopicCompleted ? (
                        <CheckCircle2
                          className="text-green-500"
                          size={30}
                        />
                      ) : (
                        <CircularProgress
                          percentage={topicPercentage}
                        />
                      )}
                    </div>
                    <div className="w-7 h-7 rounded-full transition duration-200 ease-in-out bg-gradient-hero text-white text-fun-gray flex items-center justify-center cursor-pointer">
                      <ChevronDown size={16} className={`transition-transform duration-200 ease-in-out ${isOpen == i ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* dropdown */}
                <FunCard className={`p-6 ml-12 space-y-2 transition-height duration-200 ease-in overflow-hidden ${isOpen == i ? 'max-h-[2000px] opacity-100 mt-6 p-6' : 'max-h-0 opacity-0 mt-0 p-0 border-0'}`}>
                  {
                    t.qa.map((q: any, j: number) => {
                      const lessonId = `${t.slug}:${q.id}`;
                      const isCompleted = completedLessons.includes(lessonId);
                      return (
                        <Link
                          key={q.id}
                          to={`/student/learn/${course.slug}/${t.slug}/${j + 1}`}
                          className="block"
                        >
                          <FunCard className="flex items-center gap-4 p-3">
                            <EmojiTile
                              emoji={String(j + 1)}
                              color={isCompleted ? "green" : course.color}
                              size="sm"
                            />

                            <div className="flex-1 font-display font-bold">
                              {q.question}
                            </div>

                            <span className="text-xs font-bold text-primary">+5 XP</span>

                            {isCompleted ? (
                              <CheckCircle2 className="text-green-500" />
                            ) : (
                              <PlayCircle className="text-primary" />
                            )}

                            <ArrowRight className="text-primary" size={16} />
                          </FunCard>
                        </Link>
                      );
                    })
                  }
                </FunCard>
              </FunCard>
            )
          })
        }
      </div>
    </div >
  );
}
