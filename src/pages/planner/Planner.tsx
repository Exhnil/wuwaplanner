import { useItemStore } from "@/store/ItemStore";
import { useEffect } from "react";
import DomainCard from "./components/DomainCard";
import SectionLayout from "./components/SectionLayout";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardTitle } from "@/components/ui/card";
import MaterialPopover from "./components/MaterialPopover";
import { getMaterialIcon } from "@/lib/images";
import { useCharactersStore } from "@/store/CharactersStore";
import { useWeaponStore } from "@/store/WeaponStore";
import { usePlannerData } from "@/hooks/usePlannerData";

const getRarityColor = (rarity: number) => {
	return rarityColors[rarity] ?? "from-transparent";
};

const rarityColors: Record<number, string> = {
	2: "bg-green-400",
	3: "bg-blue-400",
	4: "bg-purple-600",
	5: "bg-equator-700",
};

const Planner = () => {
	const { items, fetchAllMaterials, fetchAllDomains } = useItemStore();
	const { fetchCharacters } = useCharactersStore();
	const { fetchWeapons } = useWeaponStore();
	const { requiredMap, runsByDomain, filteredEnemyDrops, filteredLocalItems, groupedEnemyDrops, forgeryMaterials, overlordClasses, weeklyDomains, hasNothingToFarm, totalEnergy } = usePlannerData()

	useEffect(() => {
		const loadData = async () => {
			await Promise.all([
				fetchAllMaterials(),
				fetchCharacters(),
				fetchWeapons(),
				fetchAllDomains(),
			]);
		};
		loadData();
	}, [fetchAllDomains, fetchAllMaterials, fetchCharacters, fetchWeapons]);

	return (
		<div className="p-6 space-y-6">
			<div className="items-center mb-4">
				<h1 className="text-2xl mb-2 font-bold">Planner</h1>
			</div>

			<div className="my-4 h-1 w-full bg-iron-700" />

			{!hasNothingToFarm && (
				<div>
					<p className="inline-block text-sm bg-gradient-to-r from-equator-500 to-transparent px-2 py-1 font-semibold text-white">
						<span>{totalEnergy} total waveplates</span>
					</p>
				</div>
			)}

			{hasNothingToFarm && (
				<div className="flex flex-col items-center justify-center py-20 text-center text-zinc-400">
					<h2 className="text-xl font-semibold mb-2">
						The void is looking at you
					</h2>
					<p className="text-sm">
						You have nothing to farm. Did you liberate yourself from the farm ?
						Saw the light at the end of the grind ? Or maybe you just didn't add
						anything. In that case, go add an objective, quick, and come back.
					</p>
				</div>
			)}

			{filteredEnemyDrops.length > 0 && (
				<SectionLayout title="Enemy Drops">
					{Object.entries(groupedEnemyDrops).map(([key, group]) => (
						<Card
							key={key}
							className="bg-zinc-900/60 p-4 flex flex-col items-center gap-3 rounded-none border-neutral-800"
						>
							<CardTitle className="text-lg sm:text-xl font-bold text-center">
								{group.items[group.items.length - 1].name}
							</CardTitle>
							<div className="flex gap-2 mt-2">
								{group.items.map((item) => (
									<div
										key={item.id}
										className="relative w-16 h-16 shadow-inner bg-zinc-900/60"
									>
										<Tooltip>
											<MaterialPopover
												id={item.id}
												rarity={item.rarity}
												required={requiredMap[item.id]}
											>
												<TooltipTrigger asChild>
													<img
														src={getMaterialIcon(item.id)}
														alt={item.name}
														className="w-16 h-16 object-cover"
													/>
												</TooltipTrigger>
											</MaterialPopover>
											<TooltipContent>
												<p>{item.name}</p>
											</TooltipContent>
										</Tooltip>
										<span className="absolute top-0 right-0 text-white text-xs px-1 font font-semibold">
											{requiredMap[item.id]}
										</span>
										<div
											className={`absolute bottom-0 w-full h-1 ${getRarityColor(item.rarity)}`}
										/>
									</div>
								))}
							</div>
						</Card>
					))}
				</SectionLayout>
			)}

			{forgeryMaterials.length > 0 && (
				<SectionLayout title="Forgery Challenge">
					{forgeryMaterials.map((domain) => (
						<DomainCard
							key={domain.id}
							domain={domain}
							items={items}
							requiredMap={requiredMap}
							runs={runsByDomain[domain.id]}
						/>
					))}
				</SectionLayout>
			)}

			{weeklyDomains.length > 0 && (
				<SectionLayout title="Weekly Challenge">
					{weeklyDomains.map((domain) => (
						<DomainCard
							key={domain.id}
							domain={domain}
							items={items}
							requiredMap={requiredMap}
							runs={runsByDomain[domain.id]}
						/>
					))}
				</SectionLayout>
			)}

			{overlordClasses.length > 0 && (
				<SectionLayout title="Overlord Class">
					{overlordClasses.map((domain) => (
						<DomainCard
							key={domain.id}
							domain={domain}
							items={items}
							requiredMap={requiredMap}
							runs={runsByDomain[domain.id]}
						/>
					))}
				</SectionLayout>
			)}

			{filteredLocalItems.length > 0 && (
				<SectionLayout title="Exploration">
					{filteredLocalItems.map((item) => (
						<Card
							key={item.id}
							className="bg-zinc-900/60 p-4 flex flex-col items-center gap-3 rounded-none border-neutral-800"
						>
							<CardTitle className="text-lg sm:text-xl font-bold text-center">
								{item.name}
							</CardTitle>
							<div className="flex gap-2 mt-2">
								<div className="relative w-16 h-16 shadow-inner bg-zinc-900/60">
									<Tooltip>
										<MaterialPopover
											id={item.id}
											rarity={item.rarity}
											required={requiredMap[item.id]}
										>
											<TooltipTrigger asChild>
												<img
													src={getMaterialIcon(item.id)}
													alt={item.name}
													className="w-16 h-16 object-cover"
												/>
											</TooltipTrigger>
										</MaterialPopover>
										<TooltipContent>
											<p>{item.name}</p>
										</TooltipContent>
									</Tooltip>
									<span className="absolute top-0 right-0 text-white text-xs px-1 font font-semibold">
										{requiredMap[item.id]}
									</span>
								</div>
							</div>
						</Card>
					))}
				</SectionLayout>
			)}
		</div>
	);
};

export default Planner;
