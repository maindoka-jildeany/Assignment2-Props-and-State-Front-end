interface PipeProps {
  height: number;
  position: number;
  gap: number;
}

const Pipes = ({ height, position, gap }: PipeProps) => {
  return (
    <div className="pipes" style={{ left: `${position}px` }}>
      <div
        className="pipe top"
        style={{ height: `${height}px` }}
      />
      <div
        className="pipe bottom"
        style={{ height: `calc(100vh - ${height + gap}px)` }}
      />
    </div>
  );
};

export default Pipes;