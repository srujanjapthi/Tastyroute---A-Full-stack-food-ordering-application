import heroImg from "../assets/hero.png";

const Hero = () => {
  return (
    <div>
      <img
        className="w-full max-h-[500px] object-cover"
        src={heroImg}
        alt="hero Image"
        draggable={false}
      />
    </div>
  );
};

export default Hero;
