import LinkButton from '../link-button';
import './page-navigation.scss';

type NavItem = {
  label: string;
  href: string;
  icon?: string;
};

type PageNavigationProps = {
  navItems: NavItem[];
  className?: string;
};

export default function PageNavigation({ navItems, className = '' }: PageNavigationProps) {
  return (
    <div className={`button-wrapper ${className}`}>
      {navItems.map((item) => (
        <LinkButton
          key={item.href}
          label={item.label}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </div>
  );
}