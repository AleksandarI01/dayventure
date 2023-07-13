import SearchHeader from "../../components/SearchHeader/SearchHeader.jsx";
import Label from "../../components/Label/Label.jsx";

const Search = () => {
    return (
        <>
            <div
                className="flex flex-col align-middle justify-center w-full items-center bg-KayakHomeHeader h-96 bg-no-repeat bg-cover">
                <div className={"w-full h-[23%]"}>
                </div>

                <SearchHeader></SearchHeader>
                <div className="flex flex-row py-3">
                    <Label>Hospitality</Label>
                    <Label>Museum</Label>
                    <Label>Shopping</Label>
                    <Label>Food</Label>
                    <Label>Sport</Label>
                    <Label>Hiking</Label>
                </div>
            </div>
        </>
    );
};

export default Search;
