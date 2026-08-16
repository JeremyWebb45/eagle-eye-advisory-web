import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { Lead } from '@/data/types';

interface LeadMessageDialogProps {
  selectedLeadId: string | null;
  leads: Lead[];
  onOpenChange: (open: boolean) => void;
}

export default function LeadMessageDialog({
  selectedLeadId,
  leads,
  onOpenChange,
}: LeadMessageDialogProps) {
  const selectedLead = leads.find((l) => l.id === selectedLeadId);

  return (
    <Dialog open={!!selectedLeadId} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Lead Message</DialogTitle>
          <DialogDescription>
            Message from {selectedLead?.name}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-foreground whitespace-pre-wrap">
            {selectedLead?.message}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
