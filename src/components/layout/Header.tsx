
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
      case 'user':
        return '/user/dashboard';
      case 'it_agent':
      case 'hr_agent':
        return '/agent/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'it_agent':
        return 'bg-blue-100 text-blue-800';
      case 'hr_agent':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'it_agent':
        return 'IT Agent';
      case 'hr_agent':
        return 'HR Agent';
      case 'admin':
        return 'Admin';
      case 'user':
        return 'User';
      default:
        return role;
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
              {getRoleDisplayName(user.role)}
              {user.department && ` - ${user.department}`}
            </Badge>
          )}
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4">
              {user.role === 'user' && (
                <>
                  <Link to="/user/dashboard" className="text-gray-600 hover:text-blue-600">
                    Home
                  </Link>
                  <Link to="/user/tickets" className="text-gray-600 hover:text-blue-600">
                    My Tickets
                  </Link>
                </>
              )}
              {(user.role === 'it_agent' || user.role === 'hr_agent') && (
                <>
                  <Link to="/agent/dashboard" className="text-gray-600 hover:text-blue-600">
                    Home
                  </Link>
                  <Link to="/agent/tickets" className="text-gray-600 hover:text-blue-600">
                    Department
                  </Link>
                </>
              )}
              {user.role === 'admin' && (
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
