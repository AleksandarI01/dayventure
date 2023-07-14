import Button from "../Button/Button.jsx";
const ContactUsCard = () => {
  return (
    <>
      <div className="card-height-width border border-solid rounded-md border-venture-gray">
        <div className="h-[100%] w-[100% ]  flex flex-col border border-solid rounded-md bg-MailBox bg-no-repeat bg-cover">
          <div className="h-[25%] w-[100%] shrink-0 flex flex-row"></div>

          <div className=" w-[100%] shrink-0 flex justify-center items-center">
            <Button>CONTACT US</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsCard;
