import type { ReactNode } from "react";
import { Alert, ButtonLink, Container, PageHeader } from "../../components/ui";
import { useTitle } from "../usePageTitle";

function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-lesson space-y-4 pb-10 [&_h2]:mt-8 [&_h2]:text-2xl [&_li]:mt-1 [&_ul]:list-disc [&_ul]:pl-6">{children}</div>;
}

const Draft = () => (
  <Alert tone="warning" title="Draft policy" className="mt-4 max-w-2xl">This policy describes how the site works today. It must be reviewed by a qualified lawyer before the site is promoted to students.</Alert>
);

export function AboutPage() {
  useTitle("About");
  return (
    <Container className="max-w-4xl">
      <PageHeader title="About Eureka and Beyond" lead="High-quality, interactive STEM education should be available to everyone, completely free." />
      <Prose>
        <p>Eureka and Beyond teaches mathematics, physics and chemistry from algebra readiness through AP. Each lesson pairs careful explanation with simulations you can change, because understanding usually arrives when you try something and watch what happens.</p>
        <h2>What "free" means</h2>
        <ul>
          <li>Every lesson, simulation and practice set is free. No subscriptions, trials or premium tiers.</li>
          <li>You can use every published lesson without an account.</li>
          <li>Accounts add saved progress, bookmarks, practice history and the ability to ask questions.</li>
        </ul>
        <h2>How we build courses</h2>
        <p>All 24 pathways have a full outline. Every lesson has worked examples, a simulation or figure where it helps, and checked practice. Honors and AP pathways share core lessons with on-level courses and add deeper topics and harder problems.</p>
        <p>AP outlines follow the unit structure of the College Board course frameworks. That structure is not an endorsement: the College Board isn't affiliated with this site, and alignment hasn't been reviewed topic by topic.</p>
        <h2>Accuracy</h2>
        <p>Correctness matters more than spectacle. Simulations calculate their results from the underlying equations and list their assumptions. If you find a mistake, use "Report a problem" on any lesson.</p>
        <ButtonLink to="/courses">Browse the catalog</ButtonLink>
      </Prose>
    </Container>
  );
}

export function PrivacyPage() {
  useTitle("Privacy policy");
  return (
    <Container className="max-w-4xl">
      <PageHeader title="Privacy policy"><Draft /></PageHeader>
      <Prose>
        <h2>Without an account</h2>
        <p>You can use every lesson anonymously. We don't use advertising or tracking cookies. Your theme choice is stored in your browser's local storage and never leaves your device. When you check a practice answer anonymously, the answer is checked and not stored.</p>
        <h2>With an account</h2>
        <ul>
          <li><strong>What we store:</strong> your email address, display name, a salted password hash (never your password), when you confirmed you're 13 or older, your enrollments, lesson progress, bookmarks, practice answers, posts and support requests.</li>
          <li><strong>What we don't collect:</strong> birth dates, real names, schools, locations or contact lists. Profiles are private; there are no public leaderboards.</li>
          <li><strong>Who can see it:</strong> you, and staff whose role requires it (for example, moderators see posts you submit). Staff never see passwords or reset links.</li>
          <li><strong>Your controls:</strong> download your data or delete your account at any time from Settings. Deleting removes your progress, practice history, bookmarks, posts and support requests. A record that an account was deleted stays in our audit log, without your email.</li>
        </ul>
        <h2>Age</h2>
        <p>Accounts are for people 13 and older. Younger learners can use every lesson without an account.</p>
        <h2>Hosting and email</h2>
        <p>The site runs on Cloudflare, which processes technical request data (such as IP addresses) to deliver pages and prevent abuse. Account emails are sent through a transactional email provider.</p>
      </Prose>
    </Container>
  );
}

export function TermsPage() {
  useTitle("Terms of use");
  return (
    <Container className="max-w-4xl">
      <PageHeader title="Terms of use"><Draft /></PageHeader>
      <Prose>
        <h2>Using the site</h2>
        <p>You may read, study and share links to any published lesson for personal or classroom learning, free of charge.</p>
        <h2>Community guidelines</h2>
        <ul>
          <li>Be kind and stay on topic. Posts are reviewed before they appear.</li>
          <li>Don't share personal information about yourself or anyone else.</li>
          <li>No spam, advertising, cheating help on live assessments, or harassment.</li>
        </ul>
        <p>Moderators may remove posts and suspend accounts that break these guidelines.</p>
        <h2>Accuracy</h2>
        <p>We work hard to keep content correct, but it's provided for learning and may contain errors. For AP exams, use the official College Board course framework. Simulations are models with stated assumptions, not substitutes for real measurements.</p>
      </Prose>
    </Container>
  );
}

export function AccessibilityPage() {
  useTitle("Accessibility");
  return (
    <Container className="max-w-4xl">
      <PageHeader title="Accessibility" lead="Everyone should be able to learn here, however they use the web." />
      <Prose>
        <h2>What's built in</h2>
        <ul>
          <li>Every page, control and simulation can be used with a keyboard, and focus is always visible.</li>
          <li>Draggable points in graphs can also be moved with the arrow keys; sliders work with standard keyboard controls.</li>
          <li>Simulation readouts update in a live region so screen readers announce results.</li>
          <li>Mathematics is rendered with MathML alongside the visual layout.</li>
          <li>Light and dark themes, colors chosen for WCAG 2.2 AA text contrast, and subject colors are never the only way information is shown.</li>
          <li>Animations stop or reduce when your device asks for reduced motion.</li>
          <li>Layouts adapt to phones, tablets and desktops, and to 200% zoom.</li>
        </ul>
        <h2>Known gaps</h2>
        <p>Some simulation visuals (such as the particle animation in the gas lab) are decorative and have no text equivalent beyond the numeric readouts. We haven't yet completed testing with every major screen reader. Tell us about barriers through Feedback and support.</p>
      </Prose>
    </Container>
  );
}
