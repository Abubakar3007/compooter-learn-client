<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- CodeQuest content lives in `src/data/content.ts` and student progress in localStorage (`src/lib/progress.ts`) — demo mode until real accounts are added.
- Role areas are layout routes (`_student`, `parent`, `teacher`, `admin`) wrapping the shared `AppShell`; admin tables use one dynamic `admin.$section` route to avoid duplicated CRUD pages.
