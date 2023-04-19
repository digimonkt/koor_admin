import { IconButton } from "@mui/material";
import { IMAGES } from "@assets/images";
import styles from "./styles.module.css";
import { SVG } from "@assets/svg";
export const IconCard = () => {
  return (
    <>
      <div className={`${styles.playButton}`}>
        <IconButton sx={{ color: "#fff" }}>
          <SVG.PlayIcon />
        </IconButton>
      </div>
    </>
  );
};

export const CARD_LIST = [
  {
    imgUrl: IMAGES.ResourceOne,
    title: "How to find work nowadays?",
    description:
      "Sit nisi ac non a sit arcu risus est. Mi, condimentum nulla leo malesuada. Ornare purus condimentum nulla als...",
  },
  {
    imgUrl: IMAGES.ResourceTwo,
    title: "Perfect CV. How?",
    description:
      "Sit nisi ac non a sit arcu risus est. Mi, condimentum nulla leo malesuada. Ornare purus condimentum nulla als...",
  },
  {
    imgUrl: IMAGES.RecentThree,
    title: "How to post a job",
    description:
      "Sit nisi ac non a sit arcu risus est. Mi, condimentum nulla leo malesuada. Ornare purus condimentum nulla als...",
    playIcon: <IconCard />,
  },
  {
    imgUrl: IMAGES.RecentFour,
    title: "Find work faster with Koor!",
    description:
      "Sit nisi ac non a sit arcu risus est. Mi, condimentum nulla leo malesuada. Ornare purus condimentum nulla als...",
  },
];
