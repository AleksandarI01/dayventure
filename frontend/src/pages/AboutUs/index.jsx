import TeamCard from "../../components/TeamCard/TeamCard";
import Trip from "../../components/Trip/Trip";
import ContactUsCard from "../../components/ContactUsCard/ContactUsCard";
import {useEffect, useState} from "react";
import {axiosDayVenture} from "../../axios/index.js";
import {useSelector} from "react-redux";
const AboutUs = () => {
    const aboutUsTripId = import.meta.env.VITE_ABOUTUSTRIPID;
    const accessToken = useSelector((state) => state.user.accessToken);
    
    const [aboutUsTrip, setAboutUsTrip] = useState(null)


    useEffect(() => {
        console.log(aboutUsTripId)
        if (aboutUsTripId) {
            let config = null
            if (accessToken) {
                config = {headers: {Authorization: `Bearer ${accessToken}`}};
            }
            let url = `/trips/${aboutUsTripId}`
            axiosDayVenture
                .get(url, config)
                .then((res) => {
                    setAboutUsTrip(res.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
      }, [aboutUsTripId, accessToken])

  return (
    <div className="h-[87.5vh] flex flex-col gap-20 flex-grow overflow-auto">
      <div className="flex flex-col items-center justify-center w-full bg-BgAboutUs h-96 bg-no-repeat bg-cover">
        <div className="flex-col text-venture-white my-6">
          <h1>ORGANIZE YOUR PERFECT DAY-TRIP</h1>
          <h3>BY USERS, FOR USERS</h3>
        </div>
      </div>

      <div className=" flex flex-col md:flex-row items-center w-full justify-center p-8 gap-20">
        <TeamCard />
          {aboutUsTrip ? <Trip trip={aboutUsTrip}/> : null}
        <ContactUsCard />
      </div>
    </div>
  );
};

export default AboutUs;
