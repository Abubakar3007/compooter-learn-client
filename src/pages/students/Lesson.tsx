import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Bookmark, MoveLeft, MoveRight } from "lucide-react";
import { FunCard, GradientButton } from "@/components/ui-fun";
import { BinaryGame, FlowchartGame } from "@/components/games";
import { courses, getLesson, totalCourses } from "@/data/content";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/stores/useProgressStore";
import LessonImagePopup from "@/components/LessonImagePopup";

export default function Lesson() {
  const { courseId, questionId } = useParams<{
    topicId: string;
    courseId: string;
    questionId: string;
  }>();

  console.log(courseId, questionId)
  const questionNum = Number(questionId);
  console.log(questionNum);

  const completedLessons = useProgressStore((state) => state.completeLesson);

  if (!courseId) return <div className="p-10 text-center text-xl">Lesson not found</div>;

  const value = totalCourses.flatMap((c: any) => c.topics).find((topic: any) => topic.slug === courseId)?.qa.find((item: any) => item.id === Number(questionId));
  console.log(value)
  if (value) {
    console.log("Match found:", value);
  } else {
    console.log("No matching question found");
  }

  // const value = totalCourses.flatMap((c: any) => c.topics).find((topic) => topic.slug === courseId)?.qa.find((item: any) => item.id === Number(questionId));
  // console.log(value)

  const heading = useMemo(() => {
    return totalCourses
      .flatMap((c: any) => c.topics)
      .find((topic: any) => topic.slug === courseId)?.heading;
  }, [courseId]);


  const qaLength = useMemo(() => {
    return totalCourses.flatMap((c: any) => c.topics).find((topic: any) => topic.slug === courseId)?.qa.length
  }, [courseId]);

  const [cid, idxS] = courseId!.split("--");
  const idx = Number(idxS) || 0;
  const course = courses.find((c) => c.id === cid) ?? courses[0];
  const lesson = getLesson(course.id, idx);
  const { addXp } = useProgress();
  const [pick, setPick] = useState<number | null>(null);
  const correct = pick === lesson.quiz.answer;
  const activity = course.id === "data-digital" ? <BinaryGame /> : course.id === "algorithms-logic" ? <FlowchartGame /> : idx % 2 === 0 ? <BinaryGame /> : <FlowchartGame />;

  const [imageSource, setImageSource] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleImage = () => {
    setImageSource(value.image);
    setImageName(heading);
    console.log("hii");
    setIsOpen(true);
  }

  return (
    <>
      <div key={courseId} className="max-w-[980px] space-y-6">
        <div className="mt-4 flex items-center justify-between mr-5">
          <Link to={`/student/learn/${course.id}`} className="inline-flex items-center gap-1 text-base font-bold text-primary">
            <ArrowLeft className="h-4 w-4 mt-1" />
            <span>{course.title}</span>
          </Link>

          <div className="flex gap-8 items-center">
            {
              questionNum > 1 && (
                <Link to={`/student/learn/${courseId}/questions/${questionNum - 1}`} className="inline-flex items-center gap-1 font-semibold text-primary">
                  <MoveLeft className="h-4 w-4 mt-1" />
                  <span>Previous</span>
                </Link>
              )
            }

            {idx + 1 < course.topics.length && <Link
              to={`/student/learn/${courseId}/questions/${questionNum + 1}`}
              className="inline-flex items-center gap-1 font-semibold text-primary"
            >
              <span>Next lesson</span>
              <MoveRight className="h-4 w-4 mt-1" />
            </Link>}
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-hero p-8 text-on-fun shadow-pop relative">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-bold text-xl">{heading}</h3>
            <MoveRight className="mt-1" />
            <div className="text-sm font-bold opacity-80">Lesson {questionNum} of {qaLength}</div>
          </div>

          {/* <h1 className="text-4xl font-bold">{course.emoji} {value.question}</h1> */}
          <button title="Add to Bookmark" className="cursor-pointer bg-white w-12 h-12 rounded-full grid place-items-center absolute right-8 text-black top-[50%] -translate-y-1/2">
            <Bookmark />
          </button>
        </div>
        <div className="mt-12">

          <div
            className="cursor-pointer mb-12"
            onClick={handleImage}
          >
            <img src={value.image} />
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-10">📖 Let's learn</h2>
            {/* in english */}
            <div
              className="text-lg paragraph space-y-12"
              dangerouslySetInnerHTML={{ __html: value.answer }}
            />
            {/* in hindi */}
            <div className="mt-10 text-base paragraph space-y-12"
              dangerouslySetInnerHTML={{ __html: value.answerHi }}
            />
          </div>

          <FunCard>
            <video
              src={value.video}
              // autoPlay
              // loop
              muted
              playsInline
              controls
            />
          </FunCard>

          <FunCard className="bg-accent/50 mt-12">
            <h2 className="text-2xl font-bold">💡 Example</h2>

            <div
              className="mt-8 text-accent-foreground example space-y-10"
              dangerouslySetInnerHTML={{ __html: value.example }}
            />

            <div
              className="mt-6 leading-7 text-accent-foreground example space-y-10"
              dangerouslySetInnerHTML={{ __html: value.exampleHi }}
            />
          </FunCard>


          {/* <FunCard><h2 className="mb-3 text-xl">🎮 Try it!</h2>{activity}</FunCard> */}

          <FunCard className="p-8 mt-16">
            <h2 className="text-2xl font-bold">🧠 Mini Quiz</h2>
            <p className="mt-6 font-semibold text-xl">{value?.quiz?.q}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {value?.quiz?.options.map((o: any, i: number) => (
                <button key={o} onClick={() => setPick(i)} className={cn("rounded-2xl border-2 py-3 px-5 cursor-pointer text-left font-semibold transition", pick === i && (correct ? "border-fun-green bg-fun-green/15" : "border-destructive bg-destructive/10"), pick !== null && i === value?.quiz?.answer && "border-fun-green")}>{o}</button>
              ))}
            </div>
            {pick !== null && <p className="mt-3 font-bold">{correct ? "🎉 Correct! Great job!" : "Not quite — try another answer!"}</p>}
          </FunCard>
        </div>


        <div className="flex flex-wrap items-center justify-between gap-3">
          <GradientButton
            disabled={!correct}
            onClick={() => {
              completedLessons(courseId, questionNum);
              toast.success(`+${lesson.xp} XP earned! ⭐`);
            }}
          >
            Complete lesson (+{lesson.xp} XP)
          </GradientButton>

          <div className="flex gap-8 items-center">
            {
              questionNum > 1 && (
                <Link to={`/student/learn/${courseId}/questions/${questionNum - 1}`} className="inline-flex items-center gap-1 font-semibold text-primary">
                  <MoveLeft className="h-4 w-4 mt-1" />
                  <span>Previous</span>
                </Link>
              )
            }

            {idx + 1 < course.topics.length && <Link
              to={`/student/learn/${courseId}/questions/${questionNum + 1}`}
              className="inline-flex items-center gap-1 font-semibold text-primary"
            >
              <span>Next lesson</span>
              <MoveRight className="h-4 w-4 mt-1" />
            </Link>}
          </div>
        </div>
      </div>
      <LessonImagePopup imagePath={imageSource} imageName={imageName} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
