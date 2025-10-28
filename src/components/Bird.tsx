interface BirdProps {
  position: number;
  rotation: number;
  isJumping: boolean;
  normalSrc: string;
  jumpSrc: string;
}

const Bird = ({ position, rotation, isJumping, normalSrc, jumpSrc }: BirdProps) => {
  return (
    <div
      className="bird"
      style={{
        top: `${position}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <img
        src={isJumping ? jumpSrc : normalSrc}
        alt="bird-skin"
        className="bird-image"
      />
    </div>
  );
};

export default Bird;