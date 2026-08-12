import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, UserPlus } from 'lucide-react';
import type { Lead } from '@/data/types';

interface LeadsTableProps {
  leads: Lead[];
  selectedLead: string | null;
  onSelectLead: (leadId: string) => void;
  onCreateUser: (leadId: string) => void;
  onDeleteLead: (leadId: string) => void;
}

export default function LeadsTable({
  leads,
  selectedLead,
  onSelectLead,
  onCreateUser,
  onDeleteLead,
}: LeadsTableProps) {
  return (
    <div className="flex-1 overflow-auto border rounded-lg">
      <Table>
        <TableHeader className="sticky top-0 bg-muted">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads && leads.length > 0 ? (
            leads.map((lead) => (
              <TableRow
                key={lead.id}
                className={`cursor-pointer ${
                  selectedLead === lead.id ? 'bg-accent' : 'hover:bg-muted/50'
                }`}
                onClick={() => onSelectLead(lead.id)}
              >
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.company || '-'}</TableCell>
                <TableCell>{lead.title || '-'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCreateUser(lead.id);
                      }}
                    >
                      <UserPlus size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteLead(lead.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-8"
              >
                No leads found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
