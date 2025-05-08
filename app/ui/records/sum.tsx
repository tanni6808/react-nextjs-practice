import { RecordItem } from "@/app/lib/definitions";

export default function Summary({ records }: { records: RecordItem[] }) {
  const sum = records.reduce(function (acc, curr) {
    if (curr.type === "expense") return acc - curr.amount;
    else return acc + curr.amount;
  }, 0);
  return <div className="text-gray-500 my-3">合計：{sum}元</div>;
}
