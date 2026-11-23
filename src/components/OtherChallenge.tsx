import React from 'react'
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { badges, careers, type Fun } from "@/data/content";
import { EmojiTile, FunCard, Stat } from "@/components/ui-fun";
export default function OtherChallenge() {

    const challenges: { e: string; t: string; c: Fun; to: string }[] = [
        { e: "🧠", t: "Logic Challenge", c: "purple", to: "/student/quiz" },
        { e: "🎯", t: "Binary Challenge", c: "cyan", to: "/student/lesson/data-digital--5" },
        { e: "💻", t: "Coding Challenge", c: "blue", to: "/student/code" },
        { e: "🏆", t: "Daily Quiz", c: "orange", to: "/student/quiz" },
    ];

    return (
        <div className='mt-12'>
            <h3 className='text-3xl mb-6'>Join Other Challenges</h3>
            <div className='rounded-md p-6 shadow-md border border-primary-500'>
                {/* challenges */}
                <div className='space-y-4'>
                    {challenges.map((c) => (
                        <Link
                            key={c.t}
                            to={c.to as never}
                            className='border border-primary-500 group rounded-md shadow-md block w-full p-4 flex items-center justify-between gap-6 '>
                            <div className='flex gap-2 items-center'>
                                <EmojiTile emoji={c.e} color={c.c} size="md" />
                                <div>
                                    <h4>Binary Challenge</h4>
                                    <span className="text-sm text-primary font-semibold">30XP</span>
                                </div>
                            </div>
                            <span className='w-10 h-10 grid place-items-center bg-primary/10 rounded-full transition-all group-hover:bg-primary'>
                                <MoveRight size={18} className='text-primary transition-all group-hover:text-white' />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}