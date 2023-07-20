import Button from "../Button/Button.jsx";

const ContactUsCard = () => {
  return (
    <>
      <div className="card-height-width border border-solid rounded-md border-venture-gray">
        <div className="h-[100%] w-[100%]  flex justify-center items-end pb-4 border border-solid rounded-md bg-MailBox bg-cover bg-center">
          <Button onClickFunction={() => window.location = "mailto:dayventure.app@gmail.com"}>CONTACT US</Button>
        </div>
      </div>
    </>
  );
};

export default ContactUsCard;
