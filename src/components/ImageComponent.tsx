import React from "react";
import Image from "next/image";

interface props {
  photo: string;
}

const ImageComponent = ({ photo }: props) => {
  return (
    <>
      <div>
        <Image className="min-w-full rounded-xl" width={900} height={400} src={photo} alt={""} />
      </div>
    </>
  );
};

export default ImageComponent;
