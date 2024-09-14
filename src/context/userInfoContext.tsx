import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';

interface UserInfoContextType {
  name: string | null;
  color: string | null;
  handleNameChange: (name: string, color?: string) => void;
}

export const UserInfoContext = createContext<UserInfoContextType>({
  name: null,
  color: null,
  handleNameChange: () => {},
});

export function UserInfoContextProvider({ children }: PropsWithChildren) {
  const [name, setName] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const handleNameChange = useCallback((newName: string, newColor?: string) => {
    setName(newName);
    if (newColor) {
      setColor(newColor);
    }
  }, []);

  const value = useMemo(
    () => ({
      name,
      color,
      handleNameChange,
    }),
    [name, color, handleNameChange],
  );

  return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}
