import { FeedBack } from "@/api/model";
import { CommonSection } from "../Sections";
import { getFeedbacksApiFeedbacksGet } from "@/api/feedback/feedback";
import { FeedbackSlider } from "./FeedbackSlider";
import { UPWORK_URL } from "@/types/contacts";

export const FeedbackSection = async () => {


    let feedbacks: FeedBack[] = [];

    try {
        const data = await getFeedbacksApiFeedbacksGet()
        feedbacks = data?.data || [];
    } catch (error) {
        console.error(error);
    }

    return (
        <CommonSection title="What our clients say"
            subtitle="The right move at the right time saves your investments."
            buttonType="filled"
            contentOrder="row"
            redirectTo={UPWORK_URL}
            fullWidth >
            <FeedbackSlider feedbacks={feedbacks} />
        </CommonSection>
    );
};
