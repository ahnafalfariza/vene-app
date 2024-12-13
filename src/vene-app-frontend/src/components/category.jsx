import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Palette,
  HeartPulse,
  BriefcaseBusiness,
  Users,
  Volleyball,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const CategoryData = [
  {
    id: "arts-and-culture",
    text: "Arts & Culture",
    icon: <Palette />,
  },
  {
    id: "health-and-fitness",
    text: "Health & Fitness",
    icon: <HeartPulse />,
  },
  {
    id: "business",
    text: "Business",
    icon: <BriefcaseBusiness />,
  },
  {
    id: "social",
    text: "Social",
    icon: <Users />,
  },
  {
    id: "hobby",
    text: "Hobby",
    icon: <Volleyball />,
  },
];

const Category = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onClickCategory = (_category) => {
    const nextCategory = _category === activeCategory ? "" : _category;
    setActiveCategory(nextCategory);

    navigate(nextCategory ? `/?filter=${nextCategory}` : "");
  };

  return (
    <div className="flex gap-4">
      {CategoryData.map((cat) => (
        <CategoryItem
          key={cat.id}
          id={cat.id}
          icon={cat.icon}
          text={cat.text}
          activeCategory={activeCategory}
          onClickCategory={onClickCategory}
        />
      ))}
    </div>
  );
};

const CategoryItem = ({ text, id, icon, onClickCategory, activeCategory }) => {
  return (
    <Button
      onClick={() => onClickCategory(id)}
      variant={activeCategory === id ? "default" : "custom"}
      className="rounded-full"
    >
      {icon}
      <p>{text}</p>
    </Button>
  );
};

export default Category;
