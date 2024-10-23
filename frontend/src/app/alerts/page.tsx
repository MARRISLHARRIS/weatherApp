'use client';
// pages/alerts.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming you're using a Card component
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

function AlertsPage() {
  interface Alert {
    _id: string;
    city: string;
    message: string;
    sentAt: string;
  }

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { isAuthenticated, user } = useKindeBrowserClient();

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!user?.email) return; // Ensure the user email is available
      try {
        const response = await fetch(`/api/alerts?email=${user.email}`); // Fetch alerts for the user
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Sort alerts by sentAt date from latest to oldest
        const sortedAlerts = data.alerts.sort((a: Alert, b: Alert) => {
          return new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime();
        });

        setAlerts(sortedAlerts); // Set the fetched alerts
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    if (isAuthenticated) {
      fetchAlerts(); // Fetch alerts if the user is authenticated
    }
  }, [isAuthenticated, user?.email]); // Fetch alerts when user authentication state or email changes

  return (
    <div>
      {isAuthenticated ? (
        <div className="max-w-6xl mx-auto p-4 pt-7 w-full">
          <h2 className="text-2xl font-bold mb-4">Weather Alerts</h2>
          {alerts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {alerts.map((alert) => (
                <Card
                  key={alert._id}
                  className="w-full cursor-pointer hover:shadow-md flex flex-col justify-between"
                >
                  <CardHeader className="flex flex-col items-start pb-2">
                    <CardTitle className="text-lg font-medium">
                      {alert.city} ⚠️
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between h-full">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      Sent at: {new Date(alert.sentAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg">No alerts found.</p>
          )}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-4 pt-7 w-full">
          <h1 className="text-center">Please Login to view your alerts.</h1>
        </div>
      )}
    </div>
  );
}

export default AlertsPage;
