import type { ChangelogEntry } from "@/types";


interface ChangelogProps {
    entries: ChangelogEntry[]
}

const Changelog = ({ entries }: ChangelogProps) => {
    const groupEntries = entries.sort().reduce<Record<string, ChangelogEntry[]>>((groups, entry) => {
        if (!groups[entry.date]) {
            groups[entry.date] = []
        }
        groups[entry.date].push(entry)
        return groups
    }, {})

    return (
        <div className="max-w-5xl w-full space-y-2">
            <h2 className="text-lg font-semibold mb-2">Changelog</h2>
            <div className="rounded-xl bg-zinc-700 p-8">
                {entries.length === 0 ? (
                    <p className="text-sm text-zinc-300">No updates yet.</p>
                ) : (
                    <div className="space-y-6">
                        {Object.entries(groupEntries).map(([date, dateEntries]) => (
                            <div key={date}>
                                <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                                    {date}
                                </h3>
                                <div className="space-y-1">
                                    {dateEntries.map((entry, index) => (
                                        <div key={`${entry.date}-${index}`}
                                            className="flex items-center gap-3 py-1.5">
                                            <div className="flex w-4 justify-center">
                                                <div className="size-1.5 rounded-full bg-equator-700" />
                                            </div>
                                            <span className="text-sm text-zinc-300">
                                                {entry.message}
                                            </span>
                                        </div>))}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    )
}

export default Changelog