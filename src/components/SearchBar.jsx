import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchBar({ searchQuery, setSearchQuery }) {
    return(
    <div className="relative mb-3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar cursos por nombre o código..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    )
}