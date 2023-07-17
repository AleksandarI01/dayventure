import Button from "../Button/Button";

const SearchHeader = ({value, onChangeFunction, onSubmitFunction}) => {
  return (
    <>
      <div className="flex my-3">
        <form className="flex gap-3 justify-center w-full" onSubmit={onSubmitFunction}>
          <input
            className="no-style-on-focus border-[solid] border-2 rounded-md border-x-venture-gray w-96"
            type="text"
            name="search"
            placeholder="Find your adventure"
            value={value}
            onChange={onChangeFunction}
          />
          <Button type="submit">SEARCH</Button>
        </form>
      </div>
    </>
  );
};

export default SearchHeader;
