
import Image from 'next/image'
import { FeedBack } from '@/api/model';
import { IMG_DOMAIN_SERVER } from '@/app/constants-server';


function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Props {
    feedback: FeedBack;
}

export const Feedback = ({ feedback }: Props) => {


    // we have 14 images in the feedbacks folder
    const imgSrc = `${IMG_DOMAIN_SERVER}/feedbacks/${randomInteger(1, 14)}.svg`;

    return (
        <div className="w-full h-full max-h-80 p-4 ">
            <div className='flex flex-col justify-between gap-6 p-4 h-full rounded-3xl shadow-[0px_0px_15px_0px_#81818126]  
'>
                <div className='flex'>
                    <div>
                        <Image src={imgSrc} alt="client" width={80} height={80} />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <div className='text-xl font-bold' >{feedback.clientName}</div>

                        {feedback.projectName && <div className='text-base'>{feedback.projectName}</div>}
                    </div>
                </div>
                <div className='h-full line-clamp-4'>
                    {feedback.comment}
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-center justify-center'>
                        <svg width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.9813 12.1573C20.6761 12.1573 19.453 11.6047 18.3418 10.7051L18.6124 9.43509L18.6242 9.38803C18.8651 8.03588 19.6295 5.76623 21.9813 5.76623C23.7451 5.76623 25.1798 7.2009 25.1798 8.96466C25.1738 10.7226 23.7393 12.1573 21.9813 12.1573ZM21.9813 2.5267C18.9768 2.5267 16.6486 4.4787 15.7021 7.6889C14.2557 5.51933 13.162 2.91478 12.5212 0.72168H9.28752V9.13517C9.28752 10.7932 7.93521 12.1454 6.27717 12.1454C4.61913 12.1454 3.26697 10.7932 3.26697 9.13517V0.72168H0.0329348V9.13517C0.0211701 12.5807 2.82572 15.4086 6.27105 15.4086C9.71654 15.4086 12.5211 12.5807 12.5211 9.13517V7.72419C13.1501 9.03525 13.9203 10.3581 14.8552 11.5341L12.8737 20.847H16.184L17.6185 14.0916C18.8767 14.8971 20.3231 15.4028 21.9812 15.4028C25.5264 15.4028 28.4133 12.4983 28.4133 8.9529C28.4133 5.41344 25.5266 2.5267 21.9813 2.5267Z" fill="#6FDA44" />
                        </svg>
                        <span className='pb-2'>
                            <svg width="53" height="19" viewBox="0 0 53 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.285 5.8912L12.3722 14.3047L14.6712 5.8912H17.411L13.8775 18.0499H11.1376L8.96815 9.58344L6.80439 18.044H4.06463L0.530823 5.8854H3.27074L5.56957 14.2989L7.65678 5.8854H10.2849V5.89136L10.285 5.8912ZM23.9666 5.52665C20.4096 5.52665 17.5286 8.4134 17.5286 11.9646C17.5286 15.5218 20.4154 18.4027 23.9666 18.4027C27.5238 18.4027 30.4105 15.5218 30.4105 11.9646C30.4105 8.40759 27.5238 5.52665 23.9666 5.52665ZM23.9666 15.7569C21.8736 15.7569 20.1802 14.0636 20.1802 11.9706C20.1802 9.8774 21.8794 8.18422 23.9666 8.18422C26.0598 8.18422 27.7529 9.8774 27.7529 11.9706C27.7529 14.0578 26.0598 15.7569 23.9666 15.7569ZM38.2361 8.6134C36.3959 8.6134 34.9084 10.1067 34.9084 11.9411V18.044H32.1507V5.8912H34.9084V7.76085C34.9084 7.76085 36.0842 5.88524 38.5007 5.88524H39.3473V8.6134H38.2361ZM47.4905 11.4943C49.4482 10.3889 50.7771 8.28995 50.7771 5.88524H48.0194C48.0194 7.91363 46.3733 9.55991 44.3449 9.55991H43.9744V0.0234375H41.2171V18.0438H43.9744V12.3174H44.3038C44.5743 12.3174 44.9271 12.4939 45.0858 12.7113L49.0014 18.044H52.3057L47.4905 11.4943Z" fill="#333333" />
                            </svg>
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center">
                            {[...Array(5).keys()].map((key) => <svg key={key} className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};