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
  Sparkles,
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
  const [filterTab, setFilterTab] = useState<"all" | "unread" | "read">("all");

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

  const filteredMessages = messages.filter((m) => {
    if (filterTab === "unread") return !m.read;
    if (filterTab === "read") return m.read;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Messages Inbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage and respond to messages sent through your portfolio contact form.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-dark-850 border border-slate-800 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterTab === "all"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("unread")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterTab === "unread"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Unread ({messages.filter(m => !m.read).length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("read")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterTab === "read"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Read ({messages.filter(m => m.read).length})
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0E1322]/90 border border-slate-800 shadow-xl">
        {filteredMessages.length === 0 ? (
          <div className="py-16 text-center">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No messages found</h3>
            <p className="text-xs text-slate-400 mt-1">
              New submissions from your contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {filteredMessages.map((m) => (
              <div
                key={m.id}
                onClick={() => handleOpenMessage(m)}
                className={`py-4 px-3 sm:px-4 rounded-xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  m.read
                    ? "hover:bg-dark-850/50 opacity-85"
                    : "bg-purple-600/10 border border-purple-500/30 hover:bg-purple-600/15"
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    m.read
                      ? "bg-dark-800 text-slate-400"
                      : "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-white">
                        {m.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        &lt;{m.email}&gt;
                      </span>
                      {!m.read && (
                        <span className="px-2 py-0.2 text-[10px] font-bold rounded-full bg-purple-500 text-white animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-purple-300 mt-0.5">
                      {m.subject || "Portfolio Contact Inquiry"}
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
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
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
        <DialogContent className="max-w-xl bg-[#0B0F19] border border-purple-500/30 text-white p-6 sm:p-8 rounded-2xl shadow-2xl">
          {selectedMessage && (
            <div className="space-y-5">
              <DialogHeader className="text-left space-y-1.5">
                <span className="text-xs font-mono text-purple-400">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
                <DialogTitle className="text-xl font-bold text-white">
                  {selectedMessage.subject || "Message from Visitor"}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-300">
                  From <strong className="text-white">{selectedMessage.name}</strong> ({selectedMessage.email})
                </DialogDescription>
              </DialogHeader>

              <div className="p-4 rounded-xl bg-dark-850 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    messageStore.deleteMessage(selectedMessage.id);
                    setSelectedMessage(null);
                    toast.success("Message deleted.");
                  }}
                  className="bg-dark-850 border-slate-800 text-rose-400 text-xs rounded-xl"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Delete
                </Button>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-purple-500/25"
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
