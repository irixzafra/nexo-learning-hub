
import React from 'react';
import { UserSearchResult } from './types';
import { CommandSeparator, CommandGroup, CommandItem } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { getRoleIcon, getRoleName, getRoleBadgeColor } from './roleUtils';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface UserSearchProps {
  userResults: UserSearchResult[];
  handleSwitchRole: (role: UserRoleType) => void;
  isSearching?: boolean;
}

export const UserSearch: React.FC<UserSearchProps> = ({ 
  userResults, 
  handleSwitchRole,
  isSearching = false 
}) => {
  console.log('🔍 Renderizando UserSearch con resultados:', userResults);
  
  if (isSearching) {
    return (
      <>
        <CommandSeparator />
        <CommandGroup heading="Buscando usuarios...">
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />
            <span className="text-sm text-muted-foreground">Buscando...</span>
          </div>
        </CommandGroup>
      </>
    );
  }
  
  if (userResults.length === 0) {
    console.log('⚠️ Sin resultados de usuarios para mostrar');
    return null;
  }

  const getInitials = (name: string): string => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <CommandSeparator />
      <CommandGroup heading="Usuarios encontrados">
        {userResults.map((user) => {
          console.log('👤 Renderizando usuario en resultados:', user);
          return (
            <CommandItem
              key={user.id}
              onSelect={() => {
                console.log('🔄 Usuario seleccionado para simular rol:', user);
                // Simulate this user's role
                if (user.role) {
                  handleSwitchRole(toUserRoleType(user.role));
                }
              }}
              className="flex items-center gap-2 py-2"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {getInitials(user.full_name || '')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm truncate">{user.full_name || 'Sin nombre'}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email || 'No email'}</span>
              </div>
              {user.role && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "ml-auto text-xs px-1.5 py-0.5", 
                    getRoleBadgeColor(user.role.toString()).replace('bg-', 'border-')
                  )}
                >
                  {getRoleName(user.role.toString())}
                </Badge>
              )}
            </CommandItem>
          );
        })}
      </CommandGroup>
    </>
  );
};
