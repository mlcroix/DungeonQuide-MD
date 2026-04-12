import Image from 'next/image';
import './navigation-button.scss';


type NavigatorButtonProps = {
  label: string,
  icon: string,
  onClickFunction: () => void
};

export default function NavigatorButton({
  label,
  icon,
  onClickFunction
}: NavigatorButtonProps) {
  return (
    <button onClick={onClickFunction} className='button'>
        <Image src={icon} alt={label} width={20} height={20}/>
        <b>{label}</b>
    </button>
  );
}
