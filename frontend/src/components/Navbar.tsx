'use client';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Subscribe from './Subscribe';
import toast from 'react-hot-toast';
import Unsubscribe from './Unsubscribe';

function Navbar() {
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const email = user?.email;
  const [data, setData] = React.useState<any>(null);
  const [dataChanged, setDataChanged] = React.useState(false);

  React.useEffect(() => {
    const checkSubscription = async () => {
      console.log('Checking subscription status...');
      if (isAuthenticated) {
        try {
          const response = await fetch(`/api/subscribed?email=${user?.email}`);
          const data = await response.json();
          console.log(data);

          if (data.subscription) {
            setIsSubscribed(true);
            setData(data.subscription);
          } else {
            setIsSubscribed(false);
          }
        } catch (error) {
          console.error('Error fetching subscription status:', error);
        }
      }
    };

    checkSubscription();
  }, [isAuthenticated, dataChanged]);

  const unsubscribeUser = async (email: string) => {
    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Handle success message
        toast.success('Unsubscribed successfully!');
        setIsSubscribed(false);
        setData(null);
        setIsOpen(false);
      } else {
        console.error(data.error); // Handle error message
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full p-3 px-10 border-b shadow">
      <Link href={'/'} className="text-xl font-semibold">
        Weather App
      </Link>
      <div className="flex items-center gap-7 text-md">
        <Link href="/" className="hover:underline underline-offset-2">
          {' '}
          Home{' '}
        </Link>
        <Link href="/alerts" className="hover:underline underline-offset-2">
          {' '}
          Alerts{' '}
        </Link>
        <Link href="/summaries" className="hover:underline underline-offset-2">
          {' '}
          Weather Summaries{' '}
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated && !isSubscribed && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsOpen(true)}>
                Subscribe
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Subscribe to Weather App 🔔</DialogTitle>
                <DialogDescription>
                  provide your prefernces to get the latest weather updates.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <Subscribe
                  dataChanged={dataChanged}
                  setDataChanged={setDataChanged}
                  setIsOpen={setIsOpen}
                  setIsSubscribed={setIsSubscribed}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
        {isAuthenticated && isSubscribed && email && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Edit Subscription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Subscription to Weather App 🔔</DialogTitle>
                <DialogDescription>
                  Provide your prefernces to get the latest weather updates.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <Unsubscribe
                  data={data}
                  dataChanged={dataChanged}
                  setDataChanged={setDataChanged}
                  setIsOpen={setIsOpen}
                  setIsSubscribed={setIsSubscribed}
                  unsubscribeUser={unsubscribeUser}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
        {!isAuthenticated ? (
          <LoginLink>
            <Button variant={'outline'}>Sign In</Button>
          </LoginLink>
        ) : (
          <LogoutLink>
            <Button variant={'outline'}>Sign Out</Button>
          </LogoutLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
