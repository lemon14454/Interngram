interface FooterProps {
  caption: string;
  username: string;
}

const Footer = ({ caption, username }: FooterProps) => {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">{username}</span>
      <span>{caption}</span>
    </div>
  );
};

export default Footer;
