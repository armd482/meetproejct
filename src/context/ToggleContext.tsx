import { ToggleStatusType, ToggleType } from '@/type/toggleType';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

interface ToggleContextType {
  toggleStatus: ToggleStatusType;
  isVisibleToggle: boolean;
  handleToggleStatus: (key: ToggleType) => void;
  handleVisibleToggle: () => void;
}

export const ToggleContext = createContext<ToggleContextType>({
  toggleStatus: { caption: false, emoji: false, handsUp: false, screen: false },
  isVisibleToggle: true,
  handleToggleStatus: () => {},
  handleVisibleToggle: () => {},
});

export function ToggleContextProvider({ children }: PropsWithChildren) {
  const [toggleStatus, setToggleStatus] = useState<ToggleStatusType>({
    caption: false,
    emoji: false,
    handsUp: false,
    screen: false,
  });
  const [isVisibleToggle, setIsVisibleTogle] = useState<boolean>(true);

  const handleToggleStatus = useCallback((key: ToggleType) => {
    setToggleStatus((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleVisibleToggle = useCallback(() => {
    setIsVisibleTogle((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      toggleStatus,
      isVisibleToggle,
      handleToggleStatus,
      handleVisibleToggle,
    }),
    [toggleStatus, isVisibleToggle, handleToggleStatus, handleVisibleToggle],
  );

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
}
