import casesRaw from '@/data/cases.json';
import feedbacksRaw from '@/data/feedbacks.json';
import stacksRaw from '@/data/stacks.json';
import type { CaseData, FeedBackData, StackData } from '@/types/data';

const cases = casesRaw as CaseData[];
const feedbacks = feedbacksRaw as FeedBackData[];
const stacks = stacksRaw as StackData[];

export function getCases({ is_main, lang }: { is_main?: boolean; lang?: string } = {}): CaseData[] {
  return cases.filter(
    (c) =>
      (is_main === undefined || c.is_main === is_main) &&
      (lang === undefined || c.lang === lang),
  );
}

export function getCaseBySlug(slugName: string, lang?: string): CaseData | undefined {
  return cases.find((c) => c.slugName === slugName && (!lang || c.lang === lang));
}

export function getAllSlugs(): { lang: string; slug_name: string }[] {
  return cases.map((c) => ({ lang: c.lang, slug_name: c.slugName }));
}

export function getStacks(): StackData[] {
  return stacks;
}

export function getFeedbacks(): FeedBackData[] {
  return feedbacks;
}
