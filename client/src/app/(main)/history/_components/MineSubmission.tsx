export enum MineSubmissionT {
  normal = "NORMAL",
  addFriend = "ADD_FRIEND",
  commission = "COMMISSION",
}

export default function MineSubmission({
  name,
  amount,
  type,
}: {
  name: string;
  amount: number | null;
  type: MineSubmissionT;
}) {
  return (
    <div
      className={` ${
        type === "COMMISSION"
          ? "border-green-400"
          : type === "ADD_FRIEND"
          ? "border-blue-400"
          : "border-yellow-400"
      } backdrop-blur-xl shadow-black/25 shadow-lg border p-2 rounded-lg flex items-center justify-between px-4`}
    >
      <div className=" flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 fill-yellow-400 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <span>
          {name?.slice(0, 10)}
          {name && name?.length > 10 ? "..." : ""}
        </span>
      </div>
      {amount ? <span>$ {amount}</span> : <span> </span>}
    </div>
  );
}
