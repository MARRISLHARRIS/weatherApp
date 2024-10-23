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
  setIsSubscribed: (isSubscribed: boolean) => void;
  dataChanged: boolean;
  setDataChanged: (dataChanged: boolean) => void;
}

function Subscribe({
  setIsOpen,
  setIsSubscribed,
  dataChanged,
  setDataChanged,
}: SubscribeProps) {
  const { user } = useKindeBrowserClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      alertThreshold: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { temperatureUnit, alertThreshold } = data;
    const usermail = user?.email;

    // Parse alertThreshold to a number
    const parsedAlertThreshold = Number(alertThreshold);

    // Send the subscription data to the API
    axios
      .post('/api/subscribe', {
        email: usermail,
        temperatureUnit,
        alertThreshold: parsedAlertThreshold,
      })
      .then(() => {
        setIsSubscribed(true); // Update the subscription status
        toast.success('Subscription successful!');
        setDataChanged(!dataChanged); // Update the data
        setIsOpen(false); // Close the dialog
      })
      .catch((error) => {
        toast.error('Subscription failed: ' + error.message);
      });

    // console.log({
    //   temperatureUnit,
    //   alertThreshold: parsedAlertThreshold,
    //   usermail,
    // });
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
              <FormLabel>
                Alert Threshold (
                <span className="text-sm font-normal">in °C</span>)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="alert threshold"
                  className="grid grid-cols-4 items-center gap-4"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Once the temperature reaches this threshold, you will be
                alerted.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="py-3">
          <Button type="submit">Subscribe</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default Subscribe;
