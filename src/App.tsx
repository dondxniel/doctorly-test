import { normalize } from "normalize-diacritics";
import { FormEvent, useState } from "react";
import Navbar from "./components/compound/Navbar";
import MedicationItem from "./components/simple/MedicationItem";
import medications from "./medications.json";

function App() {
	// component state values
	const [allResultsInView, setAllResultsInView] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [searchResults, setSearchResults] = useState<any>([]);
	const [active, setActive] = useState(null);

	// component functions
	const handleSetSearchValue = async function (
		e: FormEvent<HTMLInputElement>
	) {
		// fires every time the input field changes value.
		let searchQuery = (e.target as HTMLInputElement).value;
		setSearchValue(searchQuery);
		let results = naiveSearch(searchQuery, medications);
		setSearchResults(results);
	};

	const naiveSearch = function (searchQuery: string, medications: any[]) {
		if (searchQuery === "") return [];
		searchQuery = searchQuery.toLowerCase();

		let results: any = [];
		medications.forEach(async function (item: any) {
			let score = 0;
			let medicationName = (await normalize(item.name)).toLowerCase();
			for (let i = 0; i < medicationName.length; i++) {
				for (let j = 0; j < searchQuery.length; j++) {
					// Make sure that at least one of the entered characters is found.
					if (
						!searchQuery
							.split("")
							.some((item: any) =>
								medicationName.split("").includes(item)
							)
					) {
						break;
					} else {
						// Make sure that
						if (searchQuery[j] === medicationName[i]) score += 1;
					}
				}
			}
			score !== 0 && results.push({ ...item, score });
		});
		results = results.sort(
			(item: any, nextItem: any) => nextItem.score - item.score
		);
		return results;
	};

	const handleSetAllResultsInView = () => {
		!allResultsInView
			? setSearchResults(medications)
			: setSearchResults([]);
		setAllResultsInView(!allResultsInView);
	};

	return (
		<div>
			<Navbar />
			{/* Search input */}
			<div className="flex md:flex-row flex-col mx-20 items-center gap-3">
				<div className="border border-gray-500 flex-[0.5] rounded-md overflow-hidden">
					<input
						type="search"
						autoComplete="on"
						onChange={handleSetSearchValue}
						value={active ? "" : searchValue}
						placeholder="Search for a medication."
						className="w-full h-10 px-3 placeholder-gray-500"
					/>
				</div>
				<div className="flex flex-row items-center justify-center">
					{!allResultsInView && (
						<button
							onClick={handleSetAllResultsInView}
							className="px-3 py-2 bg-blue-500 text-white cursor-pointer rounded-md hover:bg-blue-600"
						>
							View All Search Results
						</button>
					)}
					{allResultsInView && (
						<button
							onClick={handleSetAllResultsInView}
							className="px-3 py-2 bg-red-500 text-white cursor-pointer rounded-md hover:bg-red-600"
						>
							Remove All Results From View
						</button>
					)}
				</div>
			</div>
			<div className="mx-20">
				{!!active && (
					<div className="mt-20">
						<MedicationItem
							active={active}
							setActive={setActive}
							item={active}
						/>
					</div>
				)}
				{!active &&
					searchResults.map((item: any) => (
						<MedicationItem
							active={active}
							setActive={setActive}
							item={item}
							key={item.pzn}
						/>
					))}
			</div>
		</div>
	);
}

export default App;
