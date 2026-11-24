import { Compass } from "lucide-react";
import { ButtonLink, Container } from "../../components/ui";
import { useTitle } from "../usePageTitle";

export function NotFoundPage() {
  useTitle("Page not found");
  return (
    <Container className="py-20 text-center sm:py-28">
      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary-soft text-primary"><Compass aria-hidden className="size-8" /></div>
      <h1 className="mt-6 text-4xl">We couldn't find that page</h1>
      <p className="mx-auto mt-3 max-w-md text-lg text-muted">The link may be mistyped, or the content isn't published yet.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/courses">Browse courses</ButtonLink>
        <ButtonLink to="/search" variant="secondary">Search</ButtonLink>
      </div>
    </Container>
  );
}
