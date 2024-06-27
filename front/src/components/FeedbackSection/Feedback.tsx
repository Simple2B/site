
import { FeedBack } from '@/api/model';


interface Props {
    feedback: FeedBack;
}

export const Feedback = ({ feedback }: Props) => {

    return (
        <div className="w-full h-full max-h-80 p-4 ">
            <div className='p-4 h-full rounded-3xl shadow-[0px_0px_15px_0px_#81818126]  
'>
                {feedback.clientName}
            </div>
        </div>
    );
};