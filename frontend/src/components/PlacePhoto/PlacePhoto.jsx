const PlacePhoto = ({ photo }) => {
  console.log(photo, "PHOTO PLACE PHOTO");
  return (
    <div className="h-48 w-48 ">
      <img className="h-48 w-48 bg-cover" src={photo} alt="Place" />
    </div>
  );
};

export default PlacePhoto;
