import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="pt-8">
      <Card>
        <h1 className="text-2xl font-semibold">Privacy</h1>
        <p className="mt-3 text-slate-700">Je data blijft lokaal op je eigen apparaat (localStorage), tenzij je zelf extern deelt. We bewaren geen medische of gevoelige persoonsgegevens.</p>
      </Card>
    </div>
  );
}
