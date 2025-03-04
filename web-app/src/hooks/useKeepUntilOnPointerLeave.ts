import { useEffect, useState } from 'react';

export function useKeepUntilOnPointerLeave(
  ref: React.RefObject<HTMLElement | null>,
  onClick?: () => void,
): [boolean, () => void] {
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener('pointerleave', () => {
      setIsSet(false);
    });
  }, [ref]);

  const _onClick = () => {
    setIsSet(true);
    onClick?.();
  };

  return [isSet, _onClick];
}
