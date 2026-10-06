import type { ChangelogEntry } from "@/types";


interface ChangelogProps {
    entries: ChangelogEntry[]
}

const Changelog = ({ entries }: ChangelogProps) => {
    const groupEntries = entries.sort()

    return (
        <div>
            <h2>Changelog</h2>
            <div>
                {entries.length === 0 ? (
                    <p>Nothing</p>
                ) : (
                    <div>{Object.entries(groupEntries).map((_) => (
                        <div>date</div>
                    ))}
                    </div>
                )}
            </div>
        </div>

    )
}

export default Changelog