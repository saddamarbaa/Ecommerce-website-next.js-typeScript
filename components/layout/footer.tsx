import React from 'react';

export default function footer() {
  return (
    <footer className=" flex h-24 w-full items-center justify-center border-t pt-[3rem] pb-[3rem] text-slate-500 dark:border-t-slate-500 dark:text-slate-400">
      <span className="mr-2">© 2022 Copyright: </span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="flex cursor-pointer items-center justify-center gap-2 font-bold "
        href="https://github.com/saddamarbaa/rest-countries-app-nextjs-typescript"
      >
        Saddam Arbaa
      </a>
    </footer>
  );
}
