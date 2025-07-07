import React from 'react';
import AdminPanel from '@/components/AdminPanel';
import MessageNotification from '@/components/MessageNotification';

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <MessageNotification />
      <AdminPanel />
    </div>
  );
};

export default Admin; 