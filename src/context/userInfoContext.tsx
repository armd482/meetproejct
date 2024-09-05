import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

interface UserInfoContextType {
  name: string | null;
  handleNameChange: (value: string) => void;
}

export const UserInfoContext = createContext<UserInfoContextType>({
  name: null,
  handleNameChange: () => {},
});

export function UserInfoContextProvider({ children }: PropsWithChildren) {
  const [name, setName] = useState<string | null>(null);
  const handleNameChange = useCallback((value: string) => {
    setName(value);
  }, []);

  const value = useMemo(
    () => ({
      name,
      handleNameChange,
    }),
    [name, handleNameChange],
  );

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}
