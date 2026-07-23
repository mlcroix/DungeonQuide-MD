"use client";

import Link from 'next/link';
import './header.scss';
import Logo from '@/components/logo';
import PageNavigation from '../page-navigation/page-navigation';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, isLoggedIn, loading, logout } = useAuth();

  const mainNavItems = [
    { label: 'News', href: '/news' },
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Guides', href: '/guides' },
    { label: 'Community', href: '/community' }
  ];
  
  const userNavItems = isLoggedIn && user
    ? [
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' },
        { label: 'Logout', href: '/', onClickFunction: () => logout() }
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