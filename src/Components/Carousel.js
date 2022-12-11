import { useEffect, useState } from "react";

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

  useEffect(() => {
    //setting image change timeout
    let imageChangeInterval = setTimeout(() => {
      if (currentImageNo < imageURL.length) {
        setCurrentImageNo((currentImageNo) => currentImageNo + 1);
      } else {
        setCurrentImageNo(0);
      }
    }, 2000);
    return () => {
      clearTimeout(imageChangeInterval);
    };
  }, [imageURL, currentImageNo]);

  return (
    <div className="w-[80%] min-w-[100px] max-w-[500px] aspect-square border border-gray-500 rounded-2xl p-2">
      <img src={imageURL[currentImageNo]} alt="" className="rounded-2xl" />
    </div>
  );
};
