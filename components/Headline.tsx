import React from 'react';
import { cn } from '@/lib/utils';

export type HeadlineSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface Props {
  text?: React.ReactNode;
  children?: React.ReactNode;
  theme?: 'light' | 'dark';
  size?: HeadlineSize;
  className?: string;
  as?: React.ElementType;
}

const Headline = ({
  text,
  children,
  theme = 'light',
  size = 'lg',
  className = '',

}: Props) => {
  const content = text || children;

  if (!content) {
    return null;
  }

  // Define size presets mapping responsive sizing across device tiers
  const sizeMap: Record<HeadlineSize, string> = {
    sm: 'text-[24px] 2xl:text-[30px]',
    md: 'text-[32px] 2xl:text-[40px]',
    lg: 'text-[42px] 2xl:text-[64px]',
    xl: 'text-[48px] 2xl:text-[64px]',
    xxl: 'text-[56px] 2xl:text-[72px]',
  };

  // 1. Typography block ordered: Font Family -> Font Size -> Font Weight -> Line Height -> Letter Spacing -> Text Transform
  const typographyClasses = `font-inter ${sizeMap[size]} font-bold leading-[0.98] tracking-[-0.03em] uppercase`;

  // 2. Functional layout/spacing classes
  const spacingClasses = 'mb-4 2xl:mb-6 relative z-10';

  // 3. Decoupled Theme classes handling theme variations safely
  const themeClasses = theme === 'dark'
    ? 'text-white'
    : 'text-[var(--text-dark)]';

  return (
    <h2 className={cn(typographyClasses, spacingClasses, themeClasses, className)}>
      {content}
    </h2>
  );
};

export default Headline;
