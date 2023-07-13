import Button from "../Button/Button";

const SearchHeader = () => {
  return (
    <>
      <div className="flex my-3">
        <div className="flex gap-3 justify-center w-full">
          <input
            className="border-[solid] border-2 rounded-md border-x-venture-gray w-96"
            type="text"
            name="search"
            placeholder="Find your adventure"
          />
          <Button>SEARCH</Button>
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
