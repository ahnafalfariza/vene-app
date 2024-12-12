import { Button } from "../components/ui/button";
import {
  Palette,
  HeartPulse,
  BriefcaseBusiness,
  Users,
  Volleyball,
} from "lucide-react";

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
  return (
    <div className="flex gap-4">
      {CategoryData.map((cat) => (
        <CategoryItem key={cat.id} icon={cat.icon} text={cat.text} />
      ))}
    </div>
  );
};

const CategoryItem = ({ text, icon }) => {
  return (
    <Button variant="ghost" className="rounded-full bg-[#F0F0F0]">
      {icon}
      <p>{text}</p>
    </Button>
  );
};

export default Category;
