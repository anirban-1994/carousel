import { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";

export const Carousel = () => {
  const [imageURL, setImageURL] = useState([]);
  const [currentImageNo, setCurrentImageNo] = useState(0);

  //load image url after mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums/1/photos")
      .then((response) => response.json())
      .then((json_data) => {
        let image_url = json_data.map((product) => product.url);
        setImageURL(image_url);
      });
  }, []);

  const transitions = useTransition(imageURL[currentImageNo], {
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    delay: 500,
    exitBeforeEnter: true,
    onRest: () => {
      if (currentImageNo < imageURL.length - 1) {
        setCurrentImageNo((currentImageNo) => currentImageNo + 1);
      } else {
        setCurrentImageNo(0);
      }
    },
  });

  return (
    <div className="w-[80%] min-w-[100px] max-w-[500px] aspect-square border border-gray-500 rounded-2xl p-2">
      {transitions((style, item) => (
        <animated.img src={item} alt="" className="rounded-2xl" style={style} />
      ))}
    </div>
  );
};
