import React from 'react';
import { Tabs } from './Tabs';

interface TabsWrapperProps {
  className?: string;
}

export function TabsWrapper({ className }: TabsWrapperProps) {
  return <Tabs className={className} />;
}
