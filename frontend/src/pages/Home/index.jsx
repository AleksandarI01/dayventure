import SearchHeader from "../../components/SearchHeader/SearchHeader";
import Label from "../../components/Label/Label";
const Home = () => {
  return (
    <>
      <div className="flex flex-col align-middle justify-center w-full items-center bg-KayakHomeHeader h-96 bg-no-repeat bg-cover">
        <h1 className="flex text-venture-white my-6">
          ORGANIZE YOUR PERFECT DAY-TRIP
        </h1>
        <SearchHeader />
        <div className="flex flex-row py-3">
          <Label>Hospitality</Label>
          <Label>Museum</Label>
          <Label>Shopping</Label>
          <Label>Food</Label>
          <Label>Sport</Label>
          <Label>Hiking</Label>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center border-solid border-2 border-yellow-300 py-10">
        <div className="flex flex-col w-8/12 align-center border-2 border-red-600 py-5">
          <div className="flex w-full  py-10">
            <h2>Popular dayventures</h2>
          </div>
          <div className="flex w-full justify-start">
            <ul classname="list-none flex flex-row h-full">
              <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                Food
              </li>
              <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                Shopping
              </li>
              <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                Museums
              </li>
              <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                History
              </li>
              <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                Ghost
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
