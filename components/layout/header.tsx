import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function Header() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <SunIcon
          className="h-10 w-10 text-yellow-500 "
          role="button"
          onClick={() => setTheme('light')}
        />
      );
    }
    return (
      <MoonIcon
        className="h-10 w-10 text-gray-900 "
        role="button"
        onClick={() => setTheme('dark')}
      />
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow dark:border-gray-700 dark:bg-[#212E37] dark:shadow-lg ">
      <div className="mx-auto flex w-full max-w-[82rem] items-center justify-between p-4 py-6 ">
        <div className="cursor-pointer whitespace-nowrap font-sans text-[1.2rem] font-bold   tracking-tight text-slate-900 dark:text-white">
          <Link href="/">
            <a>Where in the world?</a>
          </Link>{' '}
        </div>
        {renderThemeChanger()}
      </div>
    </header>
  );
}
