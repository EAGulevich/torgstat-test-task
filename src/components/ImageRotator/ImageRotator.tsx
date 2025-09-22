import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
interface ImageRotatorProps {
  imageUrl: string;
}

type Data = {
  x: number;
  y: number;
  mouseX: number;
  mouseY: number;
  centerX: number;
  centerY: number;
};

const INIT_DATA: Data = {
  x: 0,
  y: 0,
  mouseX: 0,
  mouseY: 0,
  centerX: 0,
  centerY: 0,
};

const ImageRotator: React.FC<ImageRotatorProps> = ({ imageUrl }) => {
  const [rotation, setRotation] = useState<Data>(INIT_DATA);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [canRotate, setCanRotate] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !canRotate) {
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const maxAngle = 14;
      const rotateX = -(mouseY / rect.height) * maxAngle;
      const rotateY = -(mouseX / rect.width) * maxAngle;

      setTimeout(() => {
        setRotation({
          x: Math.round(rotateX),
          y: Math.round(rotateY),
          mouseX: mouseX,
          mouseY: mouseY,
          centerX,
          centerY,
        });
      }, 300);

      timeoutRef.current = setTimeout(() => {
        setRotation(INIT_DATA);
        setCanRotate(false);
      }, 2000);
    },
    [canRotate],
  );

  useLayoutEffect(() => {
    const timerId = timeoutRef.current;
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [handleMouseMove]);

  const onMouseEnter = useCallback(() => {
    setCanRotate(true);
  }, []);

  return (
    <div ref={containerRef}>
      <div className={"dev"}>
        {(Object.keys(rotation) as (keyof Data)[]).map((key) => (
          <div className="dev-row" key={key}>
            <div>{key}: </div>
            <div>{rotation[key]}</div>
          </div>
        ))}
      </div>
      <div className="dev-img-container">
        <div className="dev-dot-center" />
        <img
          onMouseEnter={onMouseEnter}
          src={imageUrl}
          className={"cat"}
          alt="Rotating image"
          style={{
            transform: `perspective(684px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        />
      </div>
    </div>
  );
};

export default ImageRotator;
