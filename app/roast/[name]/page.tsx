"use client";
import { useParams } from "next/navigation";
import roastData from "../../../public/roast.json";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Roast = () => {
  const { name }: { name: string } = useParams();

  const getRoastList = roastData.roasts.find((e) => e.name === name)?.roast;

  const [roast, setRoast] = useState("placeholder");
  const [level, setLevel] = useState(1);
  const [pre, setPre] = useState(getRoastList.light.pre);

  const roastRef = useRef(null);
  const preRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClick = () => {
    const main = gsap.timeline();

    // Roast update
    main.to(roastRef.current, {
      opacity: 0,
      scale: 1,
      onComplete: () => {
        updateRoast();

        roastAnimation();
      },
    });

    // Pre roast update after 2 seconds
    main.to(preRef.current, {
      opacity: 0,
      delay: 2,
      onComplete: () => {
        updatePreRoast();

        if (level != 3) {
          gsap.to(preRef.current, {
            opacity: 1,
          });
        }
      },
    });
  };

  const roastAnimation = () => {
    const tl = gsap.timeline();
    // Scale up
    tl.to(roastRef.current, { scale: 1.5, opacity: 1, duration: 0.3 });

    // Shaking animation
    let spin = 0;
    while (spin < 6) {
      if (spin % 2 == 0) {
        tl.to(roastRef.current, {
          rotation: 5,
          duration: 0.1,
        });
      } else {
        tl.to(roastRef.current, {
          rotation: -5,
          duration: 0.1,
        });
      }
      spin++;
    }

    // Scale down
    tl.to(roastRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.3,
    });
  };

  const updateRoast = () => {
    // Update the roast text
    if (level === 1) {
      setRoast(getRoastList.light.roast);
      setLevel(2);
    } else if (level === 2) {
      setRoast(getRoastList.medium.roast);
      setLevel(3);
    } else if (level === 3) {
      setRoast(getRoastList.burnt.roast);
      setLevel(4);
    }
  };

  const updatePreRoast = () => {
    // Update the pre-roast text
    if (level === 1) {
      setPre(getRoastList.medium.pre);
    } else if (level === 2) {
      setPre(getRoastList.burnt.pre);
    } else if (level === 3) {
      setPre("end");
    }
  };

  const introAnimation = () => {
    const tl = gsap.timeline();
    tl.set(roastRef.current, { opacity: 0 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 1 }
    );
    tl.fromTo(
      preRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.5 }
    );
    tl.fromTo(
      buttonRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.5 }
    );
  };

  useEffect(() => {
    introAnimation();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center text-white">
      <div className="text-center md:w-8/12 mx-12">
        <h1 ref={titleRef} className="text-3xl mb-4 font-bold">
          😇 Compliments for {name} 😇
        </h1>
        <div ref={preRef} className="text-white text-lg mb-4">
          <h2>{pre}</h2>
        </div>
        <div ref={roastRef} className="rounded text-xl bg-red-600 px-10 py-3">
          <h2>{roast}</h2>
        </div>
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-not-allowed"
          disabled={level == 4}
        >
          Click me
        </button>
      </div>
    </div>
  );
};

export default Roast;
