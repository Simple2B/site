import { FeedBack } from "@/api/model";
import { CommonSection } from "../Sections";
import { getFeedbacksApiFeedbacksGet } from "@/api/feedback/feedback";
import { FeedbackSlider } from "./FeedbackSlider";
import { UPWORK_URL } from "@/types/contacts";
import { getTranslateDictionary } from "@/i18n/dictionaries";

export const FeedbackSection = async () => {


    const { content } = await getTranslateDictionary();
    let feedbacks: FeedBack[] = [];

    try {
        const data = await getFeedbacksApiFeedbacksGet()
        feedbacks = data?.data || [];
    } catch (error) {
        console.error(error);
    }

    return (
        <CommonSection title={content.feedbacks.title}
            subtitle={content.feedbacks.subtitle}
            buttonType="filled"
            contentOrder="row"
            buttonText={content.feedbacks.btn}
            redirectTo={UPWORK_URL}
            fullWidth >
            <FeedbackSlider feedbacks={feedbacks} />
        </CommonSection>
    );
};
