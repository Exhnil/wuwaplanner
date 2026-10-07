import type { ChangelogEntry } from "@/types";
import { Circle, Package, Sparkles, UserRound, Wrench } from "lucide-react";


interface ChangelogProps {
    entries: ChangelogEntry[]
}

const getEntryIcon = (message: string) => {
    const text = message.toLowerCase()

    if (text.includes("character")) {
        return UserRound
    }
    if (text.includes("weapon")) {
        return Sparkles
    }
    if (text.includes("materials")) {
        return Package
    }
    if (text.includes("fix") || text.includes("fixed") || text.includes("bug")) {
        return Wrench
    }

    return Circle
}

const getEntryStyle = (message: string) => {
    const text = message.toLowerCase()
    if (text.includes("character")) {
        return "text-equator-400";
    }

    if (text.includes("weapon")) {
        return "text-amber-400";
    }

    if (text.includes("material")) {
        return "text-sky-400";
    }

    if (
        text.includes("fix") ||
        text.includes("fixed") ||
        text.includes("bug")
    ) {
        return "text-orange-400";
    }

    return "text-zinc-400";
}

const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const Changelog = ({ entries }: ChangelogProps) => {
    const groupEntries = entries.sort((a, b) => b.date.localeCompare(a.date))
        .reduce<Record<string, ChangelogEntry[]>>((groups, entry) => {
            if (!groups[entry.date]) {
                groups[entry.date] = []
            }
            groups[entry.date].push(entry)
            return groups
        }, {})

    return (
        <section className="max-w-5xl w-full">
            <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-iron-700" />
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                    Changelog
                </h2>
                <div className="h-px flex-1 bg-iron-700" />
            </div>

            <div className="border border-iron-700 bg-iron-900/90 shadow-xl">
                {entries.length === 0 ? (
                    <div className="px-6 py-6 text-center">
                        <p className="text-sm text-zinc-300">No updates yet.</p>
                    </div>
                ) : (
                    <div>
                        {Object.entries(groupEntries).map(([date, dateEntries], index) => (
                            <div key={date}
                                className={index > 0 ? "border-t border-iron-700" : ""}>
                                <div className="flex">
                                    <div className="w-24 shrink-0 flex justify-center pt-4">
                                        <div className="w-20 border border-iron-600 bg-iron-950 px-2 py-2 text-center">
                                            <time dateTime={date} className="block text-xs font-bold uppercase tracking-wider text-zinc-200">
                                                {formatDate(date).split(" ")[0]}
                                            </time>
                                            <span className="block text-[10px] uppercase tracking-wider text-zinc-500">
                                                {formatDate(date).split(" ")[1]}
                                                {" "}
                                                {formatDate(date).split(" ")[2]}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative flex-1 py-3 pr-5">
                                        <div className="absolute left-0 top-0 bottom-0 w-px bg-iron-700" />
                                        <div className="space-y-0">
                                            {dateEntries.map((entry, index) => {
                                                const Icon = getEntryIcon(entry.message)
                                                const iconStyle = getEntryStyle(entry.message)
                                                return (
                                                    <div key={`${entry.date}-${index}`} className="relative flex min-h-8 items-center gap-3 pl-5">
                                                        <div className="absolute left-0 -translate-x-1/2 size-2 border border-iron-700 bg-iron-900" />
                                                        <div className={`flex size-6 shrink-0 items-center justify-center border border-iron-700 bg-iron-950 ${iconStyle}`}>
                                                            <Icon className="size-3.5" />
                                                        </div>
                                                        <span className="text-sm text-zinc-300">
                                                            {entry.message}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>


                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>

    )
}

export default Changelog