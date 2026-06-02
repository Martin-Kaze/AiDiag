'use client'

export function CustAvatarGroup(props: any) {
  const data = props?.data ?? [];
  const visible = data.slice(0, 3);
  const overflow = data.length - 3;

  return (
    <div className="flex items-center gap-3">
      {/* Stacked avatars */}
      <div className="flex items-center">
        {visible.map((item: any, i: number) => {
          const src = item?.snippet?.thumbnails?.default?.url;
          const name = item?.snippet?.title ?? "?";
          const initial = name[0]?.toUpperCase();

          return (
            <div
              key={i}
              title={name}
              className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600 flex-shrink-0"
              style={{ marginLeft: i > 0 ? "-10px" : "0", zIndex: visible.length - i }}
            >
              {src ? (
                <img
                  src={src}
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <span>{initial}</span>
              )}
            </div>
          );
        })}

        {overflow > 0 && (
          <div
            className="w-9 h-9 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-500 flex-shrink-0"
            style={{ marginLeft: "-10px" }}
          >
            +{overflow}
          </div>
        )}
      </div>

      {/* Count label */}
      <p className="text-xs text-neutral-500">
        {data.length} channel{data.length !== 1 ? "s" : ""} connected
      </p>
    </div>
  );
}