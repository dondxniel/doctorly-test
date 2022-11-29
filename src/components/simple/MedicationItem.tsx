function MedicationItem({
	item,
	active,
	setActive,
}: {
	item: any;
	active: any;
	setActive: any;
}) {
	return (
		<div
			className={`p-3 mb-3 rounded-md md:w-2/5 w-full text-sm border border-sky-800 cursor-pointer transition-all duration-500`}
			onClick={() => {
				!active ? setActive(item) : setActive(null);
			}}
		>
			Name: {item.name} --- {item.score}
			<div
				className={`overflow-hidden ${
					JSON.stringify(active) === JSON.stringify(item)
						? "h-46"
						: "h-0"
				}`}
			>
				<div className="border-b border-gray-200 mt-5 py-2 px-2">
					Amount: {item.amountUnit} {item.amountValue}
				</div>

				<div className="border-b border-gray-200 mt-5 py-2 px-2">
					PZN: {item.pzn}
				</div>
				<div className="border-b border-gray-200 mt-5 py-2 px-2">
					Strength : {item.strengthUnit} {item.strengthValue}
				</div>
			</div>
		</div>
	);
}

export default MedicationItem;
