import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";

type Proficiency = "Advanced" | "Working" | "Foundational";

const proficiencyColors: Record<Proficiency, string> = {
  Advanced: "bg-proficiency-advanced text-white",
  Working: "bg-proficiency-working text-white",
  Foundational: "bg-proficiency-foundational text-white",
};

export function Skills() {
  const { data } = useResumeDataContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = data.skills.categories;

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories;
    }

    const query = searchQuery.toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        skills: category.skills.filter(
          (skill) =>
            skill.name.toLowerCase().includes(query) ||
            category.name.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.skills.length > 0);
  }, [categories, searchQuery]);

  const displayCategories =
    activeCategory === "all"
      ? filteredCategories
      : filteredCategories.filter((cat) => cat.name === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container-wide">
        <h2 className="mb-4">Skills & Expertise</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Comprehensive capabilities across CWMD, CBRN, homeland security, and
          emergency management domains.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Tabs */}
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent mb-8">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All Categories
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayCategories.map((category) => (
                <div
                  key={category.name}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between gap-2"
                      >
                        <span className="text-sm text-foreground">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          {skill.years && (
                            <span className="text-xs text-muted-foreground">
                              {skill.years}y
                            </span>
                          )}
                          <Badge
                            className={`text-xs ${
                              proficiencyColors[skill.proficiency as Proficiency]
                            }`}
                          >
                            {skill.proficiency}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Skills Index for SEO */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Skills Index
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.flatMap((category) =>
              category.skills.map((skill) => (
                <span
                  key={`${category.name}-${skill.name}`}
                  className="text-xs text-muted-foreground"
                >
                  {skill.name}
                  {" • "}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
