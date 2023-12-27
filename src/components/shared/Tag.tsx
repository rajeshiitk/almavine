import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface props {
  _id: string;
  name: string;
  count?: number; // ? means optional
  showCount?: boolean;
}

const Tag = ({ _id, name, count, showCount }: props) => {
  return (
    <Link href={`/tag/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{count}</p>
      )}
    </Link>
  );
};

export default Tag;
