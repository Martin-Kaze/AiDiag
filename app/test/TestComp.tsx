import { CustAvatarGroup } from "../dashboard/CustAvatarGroup";
import YtConnButt from "../dashboard/YtConnButt";

export default function TestComp(props: any) {
  return (
    <aside className="flex flex-col gap-3">
      {/* Social accounts card */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
            Social accounts
          </span>
          {props.data && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-600">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              {props.data.length} linked
            </span>
          )}
        </div>
        <div className="px-4 py-3 flex flex-col gap-3">
          {props.data ? (
            <CustAvatarGroup data={props.data} />
          ) : (
            <YtConnButt />
          )}
        </div>
      </div>

      {/* Quick topics card */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-neutral-100">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
            Quick topics
          </span>
        </div>
        <div className="px-2 py-2 flex flex-col">
          {[
            { icon: "🌙", label: "Sleep quality" },
            { icon: "🥗", label: "Nutrition tips" },
            { icon: "🧘", label: "Stress management" },
            { icon: "💪", label: "Exercise routine" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-teal-50 hover:text-teal-700 transition-colors text-left w-full"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}