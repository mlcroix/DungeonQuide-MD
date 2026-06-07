import Link from 'next/link';
import './header.scss';
import Logo from '@/components/logo';
import PageNavigation from '../page-navigation/page-navigation';

export default function Header() {
  const mainNavItems = [
    { label: 'News', href: '/news' },
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Guides', href: '/guides' },
    { label: 'Community', href: '/community' }
  ];
  
  const userNavItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
    { label: 'Logout', href: '/logout' }
  ];

  return (
    <div className='header'>
      <div className='left-content-wrapper'>
        <Link href="/" className="logo-link">
          <Logo className='logo'/>
        </Link>
        <PageNavigation navItems={mainNavItems} />
      </div>
      <div className='right-content-wrapper'>
        <PageNavigation navItems={userNavItems} />
      </div>
    </div>
  );
}