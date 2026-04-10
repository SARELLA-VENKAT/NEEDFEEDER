import CanvasBackground from "./CanvasBackground.jsx";

export default function CssBackground() {
  return (
    <div className="three-bg" aria-hidden="true">
      <div className="futuristic-bg">
        <CanvasBackground />
        <div className="futuristic-layer layer-a" />
        <div className="futuristic-layer layer-b" />
        <div className="futuristic-layer layer-c" />
        <div className="futuristic-orb orb-one" />
        <div className="futuristic-orb orb-two" />
        <div className="futuristic-orb orb-three" />
        <div className="futuristic-card card-a" />
        <div className="futuristic-card card-b" />
        <div className="futuristic-prism prism-a" />
        <div className="futuristic-prism prism-b" />
        <div className="futuristic-ring" />
      </div>
    </div>
  );
}
