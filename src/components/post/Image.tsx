interface ImageProps {
  src: string;
  caption: string;
}

const Image = ({ src, caption }: ImageProps) => {
  return <img src={require(`Photos/${src}`)} />;
};

export default Image;
