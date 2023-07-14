import TeamCard from "../../components/TeamCard/TeamCard";
import Trip from "../../components/Trip/Trip";
import ContactUsCard from "../../components/ContactUsCard/ContactUsCard";
const AboutUs = () => {
  return (
    <div className="h-[87.5vh] flex flex-col gap-20">
      <div className="flex flex-col items-center justify-center w-full bg-BgAboutUs h-96 bg-no-repeat bg-cover">
        <div className="flex-col text-venture-white my-6">
          <h1>ORGANIZE YOUR PERFECT DAY-TRIP</h1>
          <h3>BY USERS, FOR USERS</h3>
        </div>
      </div>

      <div className=" flex flex-row w-full justify-evenly p-8">
        <TeamCard />
        <Trip />
        <ContactUsCard />
      </div>
    </div>
  );
};

export default AboutUs;
