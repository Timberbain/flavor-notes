interface ChangelogSectionProps {
  changelog?: string;
  notes: string;
}

export default function ChangelogSection({ changelog, notes }: ChangelogSectionProps) {
  if (!changelog && !notes) return null;

  return (
    <div className="space-y-6">
      {changelog && (
        <div>
          <h3 className="font-serif text-xl text-accent mb-3">What Changed</h3>
          <p className="text-foreground leading-relaxed">{changelog}</p>
        </div>
      )}
      {notes && (
        <div>
          <h3 className="font-serif text-xl text-accent mb-3">Notes</h3>
          <p className="text-foreground leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  );
}
