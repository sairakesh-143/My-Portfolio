import { useState, useEffect } from "react";
import {
  MessageSquare,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  User,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { messageStore } from "@/lib/messageStore";
import { ContactMessage } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const loadMessages = () => {
    setMessages(messageStore.getMessages());
  };

  useEffect(() => {
    loadMessages();
    const unsub = messageStore.subscribe(loadMessages);
    return unsub;
  }, []);

  const handleOpenMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      messageStore.markAsRead(msg.id);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    messageStore.deleteMessage(id);
    toast.success("Message deleted.");
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Inquiries & Messages Inbox
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Messages sent from visitors and recruiters through your public portfolio contact form.
        </p>
      </div>

      {/* Messages List */}
      <div className="p-6 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-xl">
        {messages.length === 0 ? (
          <div className="py-16 text-center">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No messages yet</h3>
            <p className="text-xs text-slate-400 mt-1">
              New submissions from your contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {messages.map((m) => (
              <div
                key={m.id}
                onClick={() => handleOpenMessage(m)}
                className={`py-4 px-4 rounded-2xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  m.read
                    ? "hover:bg-white/[0.02] opacity-80"
                    : "bg-indigo-500/[0.04] border border-indigo-500/20 hover:bg-indigo-500/[0.08]"
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    m.read
                      ? "bg-white/[0.03] text-slate-400"
                      : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-white">
                        {m.name}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        &lt;{m.email}&gt;
                      </span>
                      {!m.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>

                    <p className="text-xs font-medium text-amber-300/90 mt-0.5">
                      {m.subject || "Portfolio Contact Message"}
                    </p>

                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {m.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-[11px] font-mono text-slate-500">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleDelete(m.id, e)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-white/[0.04] transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Viewer Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-xl bg-[#0b0f1d] border border-white/[0.12] text-white p-6 sm:p-8 rounded-3xl shadow-2xl">
          {selectedMessage && (
            <div className="space-y-5">
              <DialogHeader className="text-left space-y-1.5">
                <span className="text-xs font-mono text-amber-400">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
                <DialogTitle className="text-xl font-bold text-white">
                  {selectedMessage.subject || "Message from Visitor"}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-300">
                  From <strong className="text-white">{selectedMessage.name}</strong> ({selectedMessage.email})
                </DialogDescription>
              </DialogHeader>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    messageStore.deleteMessage(selectedMessage.id);
                    setSelectedMessage(null);
                    toast.success("Message deleted.");
                  }}
                  className="bg-white/[0.03] border-white/[0.1] text-rose-400 text-xs rounded-xl"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Delete
                </Button>

                <Button
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl"
                  asChild
                >
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject || "Your message on my portfolio"
                    )}`}
                  >
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    Reply via Email &rarr;
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminMessages;
