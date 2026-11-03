import { useState } from "react";
import { toast } from "sonner";
import { Hero, SiteLayout } from "@/components/site";
import { GradientButton } from "@/components/ui-fun";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <Hero emoji="💌" title="Say Hello!" subtitle="Parents, teachers and schools — we'd love to hear from you." />
      <div className="mx-auto max-w-xl px-4 py-14">
        {sent ? (
          <div className="rounded-3xl bg-card p-10 text-center shadow-sm"><div className="text-5xl">🎉</div><h2 className="mt-3 text-2xl">Message sent!</h2><p className="text-muted-foreground">We'll reply within one working day.</p></div>
        ) : (
          <form className="space-y-4 rounded-3xl bg-card p-8 shadow-sm" onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Thanks! We got your message."); }}>
            <Input required placeholder="Your name" className="h-12 rounded-xl" />
            <Input required type="email" placeholder="Email" className="h-12 rounded-xl" />
            <Textarea required placeholder="How can we help?" rows={5} className="rounded-xl" />
            <GradientButton type="submit" className="w-full">Send Message</GradientButton>
          </form>
        )}
      </div>
    </SiteLayout>
  );
}
