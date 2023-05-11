'use client';

import { useRouter } from 'next/navigation';

import Button from './Button';
import Heading from './Heading';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  label?: string;
  reset?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters.',
  label = 'Remove all filters',
  showReset,
  reset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div
        className="w-48 mt-4 flex 
        flex-row 
        gap-2 "
      >
        {showReset && (
          <Button
            outline
            label={label ?? 'Remove all filters'}
            onClick={() => reset && reset()}
          />
        )}
        <Button outline label="Go Back" onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default EmptyState;
