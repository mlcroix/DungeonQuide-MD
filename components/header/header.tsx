"use client";

import Link from 'next/link';
import './header.scss';
import Logo from '@/components/logo';
import PageNavigation from '../page-navigation/page-navigation';
import cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Header() {
  const [userData, setUserData] = useState<string | undefined>(undefined);

  useEffect(() => {
    setUserData(cookies.get('user_data'));
  }, []);

  const mainNavItems = [
    { label: 'News', href: '/news' },
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Guides', href: '/guides' },
    { label: 'Community', href: '/community' }
  ];
  
  const userNavItems = userData
    ? [
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' },
        { label: 'Logout', href: '/logout' }
      ]
    : [
        { label: 'Login', href: '/login' },
        { label: 'Sign up', href: '/signup' }
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