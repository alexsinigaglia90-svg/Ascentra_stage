import { CreateWizard } from "@/components/create/create-wizard";

export default function CreatePage() {
  return (
    <div className="space-y-4 pt-6">
      <h1 className="text-3xl font-semibold">Start je ontwerp</h1>
      <p className="text-slate-600">Een warme flow in 2 fases: intake + beeldcreatie.</p>
      <CreateWizard />
    </div>
  );
}
