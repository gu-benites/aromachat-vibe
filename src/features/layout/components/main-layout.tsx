'use client';

import React from 'react';
import { DashboardLayout as TemplateDashboardLayout } from './template-dashboard-layout';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string; // className prop might not be directly used by TemplateDashboardLayout
                       // but keeping it in the interface for now if it's used elsewhere.
}

export function MainLayout({ children, className }: MainLayoutProps) {
  // The TemplateDashboardLayout now handles its own internal structure,
  // including sidebar and header.
  // The className prop might be applied to the main content area within TemplateDashboardLayout
  // if that component is modified to accept it, or it can be passed to children if appropriate.
  // For now, TemplateDashboardLayout does not use a className prop directly on its root.
  // If `className` was intended for the main content area, that logic would need
  // to be inside TemplateDashboardLayout or passed differently.

  // We are simplifying MainLayout to primarily be a wrapper around TemplateDashboardLayout.
  // Any specific styling or layout adjustments that `className` was intended for
  // might need to be re-evaluated in the context of TemplateDashboardLayout's structure.
  
  // If the className is meant for the children container within TemplateDashboardLayout's <main> tag,
  // TemplateDashboardLayout would need to be modified to accept and apply it.
  // For this step, we pass children directly.

  return (
    <TemplateDashboardLayout>
      {children}
    </TemplateDashboardLayout>
  );
}
