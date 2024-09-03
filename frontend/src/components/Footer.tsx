type FooterElementProps = {
  children: React.ReactNode;
};

const FooterElement = ({ children }: FooterElementProps) => {
  return (
    <span className="hover:bg-orange-800 cursor-pointer transition-all px-3 py-2 rounded-md tracking-tighter">
      {children}
    </span>
  );
};

const Footer = () => {
  return (
    <div className="bg-orange-500 py-3 md:py-5">
      <div className="container flex flex-col md:flex-row gap-2 justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tighter">
          TastyRoute.com
        </span>
        <span className="text-white flex gap-5 font-semibold">
          <FooterElement>About us</FooterElement>
          <FooterElement>Privacy</FooterElement>
          <FooterElement>Contact</FooterElement>
        </span>
      </div>
    </div>
  );
};

export default Footer;
