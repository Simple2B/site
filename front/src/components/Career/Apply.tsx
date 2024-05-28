import { getServerSession } from 'next-auth/next';
import { options } from '@/app/options';
import NavigateBtn from '../Buttons/NavigateBtn';
import { getRandomQuestion } from '@/api/question/question';


const BtnApply = async () => {

  const session = await getServerSession(options());
  const userUuid = session?.user.user_uuid;

  let isQuizCompleted = false;

  if (userUuid) {
    const res = await getRandomQuestion(userUuid);
    isQuizCompleted = !res.data.question;
  }

  return (
    <div>
      {session ? (
        <NavigateBtn
          title="Apply"
          pushTo={isQuizCompleted ? '/careers/contacts' : '/careers/quiz'}
        />
      ) : (
        <NavigateBtn title="Sign In to apply" pushTo="/signin" />
      )}
    </div>
  );
};

export default BtnApply;
