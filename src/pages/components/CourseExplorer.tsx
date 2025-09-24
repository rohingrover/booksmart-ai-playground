import { useState, useEffect } from "react";
const MOODLE_API_BASE_URL = import.meta.env.VITE_MOODLE_API_BASE_URL;
function CourseExplorer({ onBoardChange, onSubjectChange }) {
  
  const baseURL = MOODLE_API_BASE_URL;
  const [dropdowns, setDropdowns] = useState([]);

  // Fetch first-level (Board/Exam)
  useEffect(() => {
    fetch(`${baseURL}/explore-courses.php?parent=0`)
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
      fetch(`${baseURL}/explore-courses.php?parent=${selectedId}`)
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
      dropdowns.map((level, index) => (
        <select
          key={index}
          className="border rounded p-2 w-full"
          value={level.selected}
          onChange={(e) => {
            const selectedId = e.target.value;
            const opt = level.options.find((o) => o.id == selectedId);
            handleSelectChange(index, selectedId, opt?.has_child);
          }}
        >
          <option value="all">
            {index === 0 ? "-- Select Board/Exam --" : "-- Select --"}
          </option>
          {level.options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      ))
  );
}

export default CourseExplorer;
