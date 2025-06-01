
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getHomeRoute = () => {
    switch (user?.role) {
      case 'USER':
        return '/user/dashboard';
      case 'IT_AGENT':
      case 'HR_AGENT':
        return '/agent/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      case 'IT_AGENT':
        return 'bg-blue-100 text-blue-800';
      case 'HR_AGENT':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Link to={getHomeRoute()} className="text-xl font-bold text-blue-600">
            HelpDesk Portal
          </Link>
          {user && (
            <Badge className={getRoleColor(user.role)}>
              {user.role.replace('_', ' ')}
              {user.department && ` - ${user.department}`}
            </Badge>
          )}
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4">
              {user.role === 'USER' && (
                <>
                  <Link to="/user/dashboard" className="text-gray-600 hover:text-blue-600">
                    Home
                  </Link>
                  <Link to="/user/tickets" className="text-gray-600 hover:text-blue-600">
                    My Tickets
                  </Link>
                </>
              )}
              {(user.role === 'IT_AGENT' || user.role === 'HR_AGENT') && (
                <>
                  <Link to="/agent/dashboard" className="text-gray-600 hover:text-blue-600">
                    Home
                  </Link>
                  <Link to="/agent/tickets" className="text-gray-600 hover:text-blue-600">
                    Department
                  </Link>
                </>
              )}
              {user.role === 'ADMIN' && (
                <>
                  <Link to="/admin/dashboard" className="text-gray-600 hover:text-blue-600">
                    Dashboard
                  </Link>
                  <Link to="/admin/tickets" className="text-gray-600 hover:text-blue-600">
                    All Tickets
                  </Link>
                  <Link to="/admin/misuse-reports" className="text-gray-600 hover:text-blue-600">
                    Misuse Reports
                  </Link>
                </>
              )}
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};
