export interface IContactLinkProps {
  link: string;
  text: string;
  bold?: boolean;
}
export const ContactLink: React.FC<IContactLinkProps> = ({
  link,
  text,
  bold,
}) => {
  const textElement = bold ? <strong>{text}</strong> : <span>{text}</span>;
  return <a href={link}>{textElement}</a>;
};
