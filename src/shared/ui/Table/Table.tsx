import { JSX, ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({
  children,
  className = "",
}: TableProps): JSX.Element => {
  return (
    <div className={`w-full max-w-full overflow-auto ${className}`}>
      <table className="w-full min-w-full table-fixed border-collapse">
        {children}
      </table>
    </div>
  );
};

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export const TableHeader = ({
  children,
  className = "",
}: TableHeaderProps): JSX.Element => {
  return (
    <thead className={`border-b border-[hsl(var(--border))] ${className}`}>
      {children}
    </thead>
  );
};

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export const TableBody = ({
  children,
  className = "",
}: TableBodyProps): JSX.Element => {
  return <tbody className={className}>{children}</tbody>;
};

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TableRow = ({
  children,
  className = "",
  onClick,
}: TableRowProps): JSX.Element => {
  return (
    <tr
      className={`border-b border-[hsl(var(--border)/20)] transition-colors hover:bg-[hsl(var(--primary)/0.2)] ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

export const TableHead = ({
  children,
  className = "",
}: TableHeadProps): JSX.Element => {
  return (
    <th
      className={`py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))] ${className}`}
    >
      {children}
    </th>
  );
};

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export const TableCell = ({
  children,
  className = "",
}: TableCellProps): JSX.Element => {
  return (
    <td className={`py-3 text-sm text-[hsl(var(--foreground))] ${className}`}>
      {children}
    </td>
  );
};
