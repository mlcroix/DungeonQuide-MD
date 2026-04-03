import './header.scss';
import Logo from '@/components/logo';


export default function Header() {
  return (
    <div className='header'>
      <div className='logo-wrapper'>
        <Logo className='logo'/>
      </div>
      Header Component
    </div>
  );
}
