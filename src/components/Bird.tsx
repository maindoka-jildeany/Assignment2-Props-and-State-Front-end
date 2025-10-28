interface BirdProps {
  position: number;
  rotation: number;
  isJumping: boolean;
  // image sources (optional when using emoji skin)
  normalSrc?: string;
  jumpSrc?: string;
  // when true, render emoji instead of image
  useEmoji?: boolean;
}

const Bird = ({ position, rotation, isJumping, normalSrc, jumpSrc, useEmoji }: BirdProps) => {
  return (
    <div
      className={"bird" + (useEmoji ? " emoji" : "")}
      style={{
        top: `${position}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {useEmoji ? (
        <span className="bird-emoji" aria-hidden>
          {isJumping ? '😆' : '☺️'}
        </span>
      ) : (
        <img
          src={isJumping ? jumpSrc : normalSrc}
          alt="bird-skin"
          className="bird-image"
        />
      )}
    </div>
  );
};

export default Bird;