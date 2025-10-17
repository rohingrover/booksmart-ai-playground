import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function CourseExplorer({ onBoardChange, onSubjectChange }) {
  
  const baseURL = API_BASE_URL;
  const [dropdowns, setDropdowns] = useState([]);

  // Fetch first-level (Board/Exam)
  useEffect(() => {
    fetch(`${baseURL}/api/explore-courses?parent=0`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data?.result) {
          setDropdowns([
            { parentId: 0, options: data.data.result, selected: "" },
          ]);
        }
      });
  }, []);

  const handleSelectChange = (levelIndex, selectedId, hasChild) => {
    const updated = [...dropdowns];
    updated[levelIndex].selected = selectedId;
    updated.splice(levelIndex + 1);

    if (levelIndex === 0) {
      // 🚀 First level is always Board/Exam
      onBoardChange(selectedId);
    }

    if (hasChild) {
      // Fetch next level (e.g., Class or Subject)
      fetch(`${baseURL}/api/explore-courses?parent=${selectedId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status && data.data?.result?.length) {
            updated.push({
              parentId: selectedId,
              options: data.data.result,
              selected: "",
            });
          }
          setDropdowns(updated);
        });
    } else {
      // 🚀 Last child (has_child = false) = Subject
      onSubjectChange(selectedId);
      setDropdowns(updated);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {dropdowns.map((level, index) => (
        <Select
          key={index}
          value={level.selected || "all"}
          onValueChange={(selectedId) => {
            if (selectedId === "all") {
              const updated = [...dropdowns];
              updated[index].selected = "";
              updated.splice(index + 1);
              setDropdowns(updated);
              if (index === 0) {
                onBoardChange("all");
              }
              return;
            }
            const opt = level.options.find((o) => o.id == selectedId);
            handleSelectChange(index, selectedId, opt?.has_child);
          }}
        >
          <SelectTrigger className="w-full bg-white/95 border-2 border-brand-primary/20 focus:border-brand-primary focus:bg-white rounded-2xl px-4 py-3 text-gray-700 font-medium shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-primary/40">
            <SelectValue placeholder={index === 0 ? "-- Select Board/Exam --" : "-- Select --"} />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm border border-brand-primary/20 rounded-2xl shadow-xl">
            <SelectItem value="all" className="text-gray-500 font-medium hover:bg-brand-primary/5">
              {index === 0 ? "-- Select Board/Exam --" : "-- Select --"}
            </SelectItem>
            {level.options.map((opt) => (
              <SelectItem 
                key={opt.id} 
                value={opt.id.toString()} 
                className="text-gray-700 hover:bg-brand-primary/10 hover:text-brand-primary font-medium transition-colors duration-200"
              >
                {opt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}

export default CourseExplorer;
