import Sidebar from "./sidebar";
import Image from "../applelogo.jpg"
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO, differenceInDays } from 'date-fns';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Applyform from "./applyform";
function Module({ position, company, location ,date}) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [applicantsCount, setApplicantsCount] = useState(0);
  const nav = () => {
    setShowForm(true);
  };
  const updateApplicantsCount = (count) => {
    setApplicantsCount(count);
  };

  let postedAgo = '';
  if (date) {
    const parsedDate = parseISO(date);
  
    if (!isNaN(parsedDate)) {
      postedAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
    }
  }
  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  };
  const calculateDaysAgo = (date) => {
    const currentDate = getCurrentDate();
    const daysAgo = differenceInDays(new Date(currentDate), new Date(date));
    return daysAgo;
  };
  const{t,i18n}=useTranslation(); 


  return (
    <div className=" w-844 h-204 top-316 left-478 mb-5">
      <div class="header col-span-12 rounded-lg border border-gray-400 bg-gray-700 py-6 ">
        
        <div class="flex pt-2 allign-justify text-sm text-gray-400">
          <img src={Image} class="w-20 h-20 pb-2 pl-2" alt="Logo" />
          <div class="flex-1 inline-flex items-center">
            <div className=" flex pl-3 flex-col text-white">
              <div className=" inline-flex flex-nowrap  text-sm font-bold leading-none">
                {position}
              </div>
              <br />
              <div className="flex-auto text-sm my-1">
                <span className="mr-3 inline-flex ">{company}</span>
                <br />
                <span>{location}</span>
              </div>
            </div>
            <div class=" flex-1 inline-flex place-items-center pr-3 justify-end">
              <div>
                <div className=" text-white ">{t('module.skillMatch')}</div>
              </div>
              <div class="">
                <svg width="73" height="74" viewBox="0 0 73 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <svg width="73" height="74" viewBox="0 0 73 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.2199 42.5918L27.3799 30.8718V29.2518H17.7599V31.3118H24.6799L19.6399 42.5918H22.2199ZM33.8245 42.8318C36.5445 42.8318 38.9445 41.5518 38.9445 39.1518C38.9445 37.4718 37.5645 36.2518 35.9445 35.7118C37.4445 35.2318 38.7245 34.2318 38.7245 32.5518C38.7245 30.0718 36.1845 29.0518 33.8245 29.0518C31.4645 29.0518 28.9245 30.0718 28.9245 32.5518C28.9245 34.2318 30.2045 35.2318 31.7045 35.7118C30.0845 36.2518 28.7045 37.4718 28.7045 39.1518C28.7045 41.5518 31.0845 42.8318 33.8245 42.8318ZM33.8245 34.7718C33.0245 34.6318 31.3045 34.1518 31.3045 32.9118C31.3045 31.7718 32.3845 31.1318 33.8245 31.1318C35.2645 31.1318 36.3445 31.7718 36.3445 32.9118C36.3445 34.1518 34.6445 34.6318 33.8245 34.7718ZM33.8245 40.7518C32.3045 40.7518 31.0845 40.0318 31.0845 38.8518C31.0845 37.4718 32.9845 36.8718 33.8245 36.7518C34.6445 36.8718 36.5645 37.4718 36.5645 38.8518C36.5645 40.0318 35.3045 40.7518 33.8245 40.7518ZM43.6585 35.6718C45.6585 35.6718 46.9785 34.2318 46.9785 32.3718C46.9785 30.4918 45.6585 29.0518 43.6585 29.0518C41.6785 29.0518 40.3385 30.4918 40.3385 32.3718C40.3385 34.2318 41.6785 35.6718 43.6585 35.6718ZM43.6985 42.5918L52.2385 29.2518H50.8785L42.3585 42.5918H43.6985ZM50.8385 42.8318C52.8185 42.8318 54.1585 41.3918 54.1585 39.5318C54.1585 37.6518 52.8185 36.2118 50.8385 36.2118C48.8585 36.2118 47.5185 37.6518 47.5185 39.5318C47.5185 41.3918 48.8585 42.8318 50.8385 42.8318ZM43.6585 34.3318C42.6385 34.3318 41.8985 33.5318 41.8985 32.3718C41.8985 31.1918 42.6385 30.3718 43.6585 30.3718C44.6985 30.3718 45.4385 31.1918 45.4385 32.3718C45.4385 33.5318 44.6985 34.3318 43.6585 34.3318ZM50.8385 41.4918C49.7985 41.4918 49.0585 40.6918 49.0585 39.5318C49.0585 38.3518 49.7985 37.5318 50.8385 37.5318C51.8785 37.5318 52.6185 38.3518 52.6185 39.5318C52.6185 40.6918 51.8785 41.4918 50.8385 41.4918Z" fill="white" />
                    <circle cx="36.4519" cy="37.0573" r="34.3112" stroke="#E83363" stroke-width="2.41369" />
                    <mask id="path-3-outside-1_0_137" maskUnits="userSpaceOnUse" x="2.39453" y="0" width="71" height="74" fill="black">
                      <rect fill="white" x="2.39453" width="71" height="74" />
                      <path d="M4.37523 49.4948C3.58363 49.8105 3.19478 50.7099 3.5443 51.4871C5.99179 56.9297 9.76491 61.6823 14.5284 65.304C19.7019 69.2374 25.8486 71.6885 32.3092 72.3943C38.7698 73.1001 45.3006 72.0341 51.2015 69.3106C57.1023 66.587 62.1505 62.3087 65.8048 56.9343C69.4591 51.56 71.5816 45.2923 71.9447 38.8034C72.3078 32.3145 70.8978 25.8492 67.866 20.1007C64.8341 14.3522 60.2948 9.53731 54.7346 6.17242C49.6152 3.07424 43.8082 1.31288 37.8469 1.03801C36.9956 0.99875 36.3023 1.69103 36.2997 2.54326C36.2972 3.39549 36.9864 4.08462 37.8376 4.12734C43.2384 4.39838 48.4966 6.00467 53.1367 8.81277C58.2176 11.8876 62.3657 16.2874 65.1362 21.5404C67.9067 26.7934 69.1951 32.7014 68.8633 38.631C68.5315 44.5605 66.5919 50.2879 63.2527 55.199C59.9134 60.1101 55.3003 64.0197 49.9081 66.5084C44.516 68.9972 38.548 69.9713 32.6443 69.3263C26.7407 68.6813 21.1239 66.4416 16.3963 62.8472C12.0788 59.5646 8.65165 55.2654 6.4138 50.3425C6.06111 49.5667 5.16682 49.1791 4.37523 49.4948Z" />
                    </mask>
                    <path d="M4.37523 49.4948C3.58363 49.8105 3.19478 50.7099 3.5443 51.4871C5.99179 56.9297 9.76491 61.6823 14.5284 65.304C19.7019 69.2374 25.8486 71.6885 32.3092 72.3943C38.7698 73.1001 45.3006 72.0341 51.2015 69.3106C57.1023 66.587 62.1505 62.3087 65.8048 56.9343C69.4591 51.56 71.5816 45.2923 71.9447 38.8034C72.3078 32.3145 70.8978 25.8492 67.866 20.1007C64.8341 14.3522 60.2948 9.53731 54.7346 6.17242C49.6152 3.07424 43.8082 1.31288 37.8469 1.03801C36.9956 0.99875 36.3023 1.69103 36.2997 2.54326C36.2972 3.39549 36.9864 4.08462 37.8376 4.12734C43.2384 4.39838 48.4966 6.00467 53.1367 8.81277C58.2176 11.8876 62.3657 16.2874 65.1362 21.5404C67.9067 26.7934 69.1951 32.7014 68.8633 38.631C68.5315 44.5605 66.5919 50.2879 63.2527 55.199C59.9134 60.1101 55.3003 64.0197 49.9081 66.5084C44.516 68.9972 38.548 69.9713 32.6443 69.3263C26.7407 68.6813 21.1239 66.4416 16.3963 62.8472C12.0788 59.5646 8.65165 55.2654 6.4138 50.3425C6.06111 49.5667 5.16682 49.1791 4.37523 49.4948Z" fill="#5CA4A9" />
                    <path d="M4.37523 49.4948C3.58363 49.8105 3.19478 50.7099 3.5443 51.4871C5.99179 56.9297 9.76491 61.6823 14.5284 65.304C19.7019 69.2374 25.8486 71.6885 32.3092 72.3943C38.7698 73.1001 45.3006 72.0341 51.2015 69.3106C57.1023 66.587 62.1505 62.3087 65.8048 56.9343C69.4591 51.56 71.5816 45.2923 71.9447 38.8034C72.3078 32.3145 70.8978 25.8492 67.866 20.1007C64.8341 14.3522 60.2948 9.53731 54.7346 6.17242C49.6152 3.07424 43.8082 1.31288 37.8469 1.03801C36.9956 0.99875 36.3023 1.69103 36.2997 2.54326C36.2972 3.39549 36.9864 4.08462 37.8376 4.12734C43.2384 4.39838 48.4966 6.00467 53.1367 8.81277C58.2176 11.8876 62.3657 16.2874 65.1362 21.5404C67.9067 26.7934 69.1951 32.7014 68.8633 38.631C68.5315 44.5605 66.5919 50.2879 63.2527 55.199C59.9134 60.1101 55.3003 64.0197 49.9081 66.5084C44.516 68.9972 38.548 69.9713 32.6443 69.3263C26.7407 68.6813 21.1239 66.4416 16.3963 62.8472C12.0788 59.5646 8.65165 55.2654 6.4138 50.3425C6.06111 49.5667 5.16682 49.1791 4.37523 49.4948Z" stroke="#5CA4A9" stroke-width="2" mask="url(#path-3-outside-1_0_137)" />
                  </svg>

                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="footer col-span-12 rounded-lg border border-gray-400 bg-gray-600 p-1 ">
        {/* <!-- Footer content --> */}
        <div class="flex pt-2 allign-justify text-sm text-gray-400">
          <div class="flex-1 inline-flex items-center">
            <p class="pl-2"> Posted {calculateDaysAgo(date)} days ago</p>

            <p class="pl-7"><span>.{applicantsCount} applicants</span></p>
          </div>
          <div class="  flex-1 inline-flex place-items-center justify-end">
            <div>
              <button onClick={nav} class="flex-no-shrink bg-teal-500 hover:bg-slate-400 px-5 ml-4 py-2 pl-7 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 hover:border-green-500 text-white rounded-full transition ease-in duration-300">APPLY NOW</button>
            </div>
            <div class="pl-2 h-6">
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
              >
                <path d="M3 2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.777.416L8 13.101l-5.223 2.815A.5.5 0 012 15.5V2zm2-1a1 1 0 00-1 1v12.566l4.723-2.482a.5.5 0 01.554 0L13 14.566V2a1 1 0 00-1-1H4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <Applyform
          setApplicantsCount={updateApplicantsCount}
          setShowForm={setShowForm}
        />
      )}
    </div>

  );

}
export default Module;