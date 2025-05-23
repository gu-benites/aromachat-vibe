'use client';

import { MessageSquare, Users, FileText, Menu } from 'lucide-react';
import { useSidebar } from '@/features/layout/contexts/sidebar-context';

export default function Home() {
  const { toggleSidebar, isCollapsed } = useSidebar();

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Mobile header with menu button */}
        <div className="md:hidden flex items-center mb-6">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold ml-4">AromaChat</h1>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to AromaChat</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern chat application with a beautiful and responsive interface.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Real-time Messaging</h2>
            <p className="text-muted-foreground">
              Chat with your team in real-time with our fast and reliable messaging system.
            </p>
          </div>
          
          <div className="rounded-lg border p-6 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Team Collaboration</h2>
            <p className="text-muted-foreground">
              Work together seamlessly with your team members in dedicated channels.
            </p>
          </div>
          
          <div className="rounded-lg border p-6 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">File Sharing</h2>
            <p className="text-muted-foreground">
              Share files and documents with your team with just a few clicks.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of teams who are already using AromaChat to improve their communication.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
}
