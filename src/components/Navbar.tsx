'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type BaseNavigationItem = {
  name: string;
  href: string;
};

type NestedNavigationItem = {
  name: string;
  children: BaseNavigationItem[];
};

type ParentNavigationItem = {
  name: string;
  href: string;
  children?: (BaseNavigationItem | NestedNavigationItem)[];
};

type NavigationItem = BaseNavigationItem | ParentNavigationItem;

const isNestedItem = (
  item: BaseNavigationItem | NestedNavigationItem | ParentNavigationItem
): item is NestedNavigationItem => {
  return 'children' in item && !('href' in item);
};

const hasChildren = (item: NavigationItem): item is ParentNavigationItem => {
  return 'children' in item;
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navigation: NavigationItem[] = [
    {
      name: 'Trang chủ',
      href: '/',
    },
    {
      name: 'APIs',
      href: '#',
      children: [
        {
          name: 'Đếm ngày',
          children: [
            // { name: 'Đếm ngày nhận lương', href: '/api/demngaynhanluong' },
            { name: 'Đếm ngày đến Tết Âm', href: '/demngaytetam' },
            { name: 'Đếm ngày đến Tết Dương', href: '/demngaytetduong' },
          ],
        },
        {
          name: 'Admin',
          href: '/admin',
        },
        // {
        //   name: 'Thông báo',
        //   children: [
        //     { name: 'Sunday Bot', href: '/api/sunday' },
        //     { name: 'Happy Birthday', href: '/api/hbd' },
        //   ],
        // },
      ],
    },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg'
          : 'bg-white dark:bg-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Sunday Bot
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map(item => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 inline-flex items-center
                    ${
                      pathname === item.href
                        ? 'text-orange-500 dark:text-orange-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                  onMouseEnter={() =>
                    hasChildren(item) && setActiveSubmenu(item.name)
                  }
                >
                  {item.name}
                  {hasChildren(item) && (
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Submenu */}
                {hasChildren(item) && item.children && (
                  <div
                    className={`absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-300 transform origin-top-left
                      ${
                        activeSubmenu === item.name
                          ? 'scale-100 opacity-100'
                          : 'scale-95 opacity-0 pointer-events-none'
                      }
                    `}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <div className="py-2">
                      {item.children.map(subItem => (
                        <div key={subItem.name} className="group/sub relative">
                          {isNestedItem(subItem) ? (
                            <div
                              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700 flex items-center justify-between cursor-pointer"
                              onMouseEnter={e => {
                                const submenu =
                                  e.currentTarget.querySelector(
                                    '.nested-submenu'
                                  );
                                if (submenu) {
                                  submenu.classList.remove('opacity-0');
                                  submenu.classList.add('opacity-100');
                                }
                              }}
                              onMouseLeave={e => {
                                const submenu =
                                  e.currentTarget.querySelector(
                                    '.nested-submenu'
                                  );
                                if (submenu) {
                                  submenu.classList.remove('opacity-100');
                                  submenu.classList.add('opacity-0');
                                }
                              }}
                            >
                              {subItem.name}
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                              {/* Nested Submenu */}
                              <div className="nested-submenu absolute left-full top-0 w-56 ml-2 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 transition-opacity duration-300">
                                <div className="py-2">
                                  {subItem.children.map(nestedItem => (
                                    <Link
                                      key={nestedItem.name}
                                      href={nestedItem.href}
                                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700"
                                    >
                                      {nestedItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <Link
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700"
                            >
                              {subItem.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map(item => (
            <div key={item.name}>
              {hasChildren(item) ? (
                <div>
                  <button
                    onClick={() =>
                      setActiveSubmenu(
                        activeSubmenu === item.name ? null : item.name
                      )
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeSubmenu === item.name ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Mobile Submenu */}
                  <div
                    className={`pl-4 space-y-1 transition-all duration-300 ${
                      activeSubmenu === item.name
                        ? 'max-h-screen opacity-100'
                        : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    {item.children?.map(subItem => (
                      <div key={subItem.name}>
                        {isNestedItem(subItem) ? (
                          <div>
                            <div className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                              {subItem.name}
                            </div>
                            <div className="pl-4 space-y-1">
                              {subItem.children.map(nestedItem => (
                                <Link
                                  key={nestedItem.name}
                                  href={nestedItem.href}
                                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {nestedItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={subItem.href}
                            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200
                    ${
                      pathname === item.href
                        ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
