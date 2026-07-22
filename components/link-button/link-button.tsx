import NextLink from 'next/link';
import Image from 'next/image';
import './link-button.scss';

type LinkButtonProps = {
  label: string;
  icon?: string;
  href: string;
  onClickFunction?: () => void
};

export default function LinkButton({ label, icon, href, onClickFunction }: LinkButtonProps) {
  return (
    <NextLink href={href} className="link-button" onClick={onClickFunction}>
        {icon && <Image src={icon} alt={label} width={20} height={20} />}
      <b>{label}</b>
    </NextLink>
  );
}