import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import useGetLeads from '@/data/useGetLeads';
import useGetUsers from '@/data/useGetUsers';
import useDeleteLead from '@/data/useDeleteLead';
import useCreateUser from '@/data/useCreateUser';
import { toast } from 'sonner';
import { useState } from 'react';
import LoadingError from '@/components/admin/LoadingError';
import LeadsTable from '@/components/admin/LeadsTable';
import UsersTable from '@/components/admin/UsersTable';
import LeadMessageDialog from '@/components/admin/LeadMessageDialog';

export default function Admin() {
  const {
    data: leads,
    isLoading: leadsLoading,
    error: leadsError,
  } = useGetLeads();
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useGetUsers();
  const deleteLead = useDeleteLead();
  const createUser = useCreateUser();

  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const handleDeleteLead = async (leadId: string) => {
    try {
      toast.info('Deleting lead...');
      await deleteLead(leadId);
      toast.success('Lead deleted successfully');
      if (selectedLead === leadId) setSelectedLead(null);
    } catch (error) {
      console.error('Failed to delete lead:', error);
      toast.error('Failed to delete lead');
    }
  };

  const handleCreateUser = async (leadId: string) => {
    const tempPassword = Math.random().toString(36).slice(-12) + 'Aa1!';

    try {
      toast.info('Creating user...');
      await createUser(leadId, tempPassword);
      toast.success(
        `User created successfully. Temp password: ${tempPassword}`
      );
      setSelectedLead(null);
    } catch (error) {
      console.error('Failed to create user:', error);
      toast.error('Failed to create user');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-background">
      <div className="p-6 border-b">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage leads and users</p>
      </div>

      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        {/* Leads Panel */}
        <ResizablePanel defaultSize={50}>
          <div className="flex flex-col h-full p-4">
            <h2 className="text-2xl font-semibold mb-4">Leads</h2>
            <LoadingError isLoading={leadsLoading} error={leadsError}>
              {leads && (
                <LeadsTable
                  leads={leads}
                  selectedLead={selectedLead}
                  onSelectLead={setSelectedLead}
                  onCreateUser={handleCreateUser}
                  onDeleteLead={handleDeleteLead}
                />
              )}
            </LoadingError>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Users Panel */}
        <ResizablePanel defaultSize={50}>
          <div className="flex flex-col h-full p-4">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <LoadingError isLoading={usersLoading} error={usersError}>
              {users && <UsersTable users={users} />}
            </LoadingError>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Lead Message Dialog */}
      {leads && (
        <LeadMessageDialog
          selectedLeadId={selectedLead}
          leads={leads}
          onOpenChange={(open) => {
            if (!open) setSelectedLead(null);
          }}
        />
      )}
    </div>
  );
}
