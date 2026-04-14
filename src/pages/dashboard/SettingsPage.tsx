export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>
      {["Profile", "Account", "Notifications", "Preferences"].map((section) => (
        <div key={section} className="glass-card rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-medium">{section}</h2>
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-3 w-32 bg-secondary/50 rounded" />
              <div className="h-8 w-40 bg-secondary/30 rounded-lg" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
