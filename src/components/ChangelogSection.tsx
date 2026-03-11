interface ChangelogSectionProps {
  changelog?: string;
  notes: string;
  whatChangedLabel: string;
  notesLabel: string;
}

export default function ChangelogSection({ changelog, notes, whatChangedLabel, notesLabel }: ChangelogSectionProps) {
  if (!changelog && !notes) return null;

  return (
    <div className="space-y-6">
      {changelog && (
        <div>
          <h3 className="font-serif text-xl text-accent mb-3">{whatChangedLabel}</h3>
          <p className="text-foreground leading-relaxed">{changelog}</p>
        </div>
      )}
      {notes && (
        <div>
          <h3 className="font-serif text-xl text-accent mb-3">{notesLabel}</h3>
          <p className="text-foreground leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  );
}
