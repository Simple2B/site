import { CommonSection } from '../Sections';
import { FeedbackSlider } from './FeedbackSlider';
import { UPWORK_URL } from '@/types/contacts';
import { getDictionaryByLang } from '@/i18n/dictionaries';
import { getFeedbacks } from '@/lib/staticData';
import type { FeedBackData } from '@/types/data';

export const FeedbackSection = async ({ lang }: { lang: string }) => {
  const { content } = await getDictionaryByLang(lang);
  const feedbacks: FeedBackData[] = getFeedbacks();

  return (
    <CommonSection
      title={content.feedbacks.title}
      subtitle={content.feedbacks.subtitle}
      buttonType="filled"
      contentOrder="row"
      buttonText={content.feedbacks.btn}
      redirectTo={UPWORK_URL}
      fullWidth
    >
      <FeedbackSlider feedbacks={feedbacks} />
    </CommonSection>
  );
};
