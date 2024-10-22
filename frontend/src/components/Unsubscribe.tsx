'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { DialogFooter } from './ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import toast from 'react-hot-toast';
import axios from 'axios';

const FormSchema = z.object({
  temperatureUnit: z.enum(['Celsius', 'Kelvin'], {
    required_error: 'You need to select a temperature unit.',
  }),
  alertThreshold: z.string().min(2, {
    message: 'Threshold must be at least 2 characters.',
  }),
});

interface SubscribeProps {
  setIsOpen: (isOpen: boolean) => void;
  data: {
    alertThreshold: string;
    temperatureUnit: 'Celsius' | 'Kelvin';
  };
  setIsSubscribed: (isSubscribed: boolean) => void;
  unsubscribeUser: (email: string) => void;
  setDataChanged: (dataChanged: boolean) => void;
  dataChanged: boolean;
}

function Unsubscribe({
  setIsOpen,
  data,
  unsubscribeUser,
  setDataChanged,
  dataChanged,
}: SubscribeProps) {
  const { user } = useKindeBrowserClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      alertThreshold: data?.alertThreshold,
      temperatureUnit: data?.temperatureUnit,
    },
  });

  // Submit updated subscription
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { temperatureUnit, alertThreshold } = data;
    const usermail = user?.email;
    const parsedAlertThreshold = Number(alertThreshold);

    axios
      .put('/api/updateSubscription', {
        email: usermail,
        temperatureUnit,
        alertThreshold: parsedAlertThreshold,
      })
      .then(() => {
        toast.success('Subscription updated successfully!');
        setIsOpen(false); // Close the dialog
        setDataChanged(!dataChanged); // Update the subscription status
      })
      .catch((error) => {
        toast.error('Subscription update failed: ' + error.message);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="temperatureUnit"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Temperature Unit</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-1 pb-3"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Celsius" />
                    </FormControl>
                    <FormLabel className="font-normal">Celsius</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Kelvin" />
                    </FormControl>
                    <FormLabel className="font-normal">Kelvin</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alertThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alert Threshold (°C)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="alert threshold"
                  {...field}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>
                Set the temperature threshold for alerts.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="py-3">
          <div className="flex gap-3 items-center justify-between w-full">
            <Button
              variant="outline"
              className="w-full bg-red-500 text-white"
              onClick={() => user?.email && unsubscribeUser(user?.email)}
            >
              Unsubscribe
            </Button>
            <Button
              type="submit"
              className="w-full bg-green-500 text-white"
              variant="outline"
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default Unsubscribe;
