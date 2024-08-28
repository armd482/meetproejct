import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { PanelType } from '@/type/panelType';

interface PanelContextType {
  panelType: null | PanelType;
  handlePanelType: (value: null | PanelType) => void;
}

export const PanelContext = createContext<PanelContextType>({
  panelType: null,
  handlePanelType: () => {},
});

export function PanelContextProvider({ children }: PropsWithChildren) {
  const [panelType, setPanelType] = useState<null | PanelType>(null);
  const handlePanelType = useCallback((value: null | PanelType) => {
    setPanelType(value);
  }, []);

  const value = useMemo(
    () => ({
      panelType,
      handlePanelType,
    }),
    [panelType, handlePanelType],
  );

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
}
