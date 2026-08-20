import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  confirmVariant?: "danger" | "warning" | "default";
  onConfirm: () => void;
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  confirmVariant = "default",
  onConfirm,
}: ConfirmDialogProps) => {
  const confirmStyles = {
    danger:
      "bg-rose-600 hover:bg-rose-500 text-white border-0 shadow-lg shadow-rose-500/20",
    warning:
      "bg-amber-500 hover:bg-amber-400 text-black border-0 shadow-lg shadow-amber-500/20",
    default:
      "bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-500/20",
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#0e1424] border border-white/[0.1] rounded-2xl shadow-2xl max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-lg font-bold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400 text-sm leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2.5 mt-2">
          <AlertDialogCancel className="bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.1] text-slate-300 rounded-xl text-xs font-medium">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={`rounded-xl text-xs font-bold px-5 ${confirmStyles[confirmVariant]}`}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
