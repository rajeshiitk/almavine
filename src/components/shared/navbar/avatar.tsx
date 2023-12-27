import Image from "next/image";
import React from "react";

const Avatar = () => {
  return (
    <div className="lg:hidden">
      <Image
        src="/assets/avatar.jpg"
        alt="avator"
        className="rounded-full object-cover"
        width={50}
        height={50}
      />
    </div>
  );
};

export default Avatar;
