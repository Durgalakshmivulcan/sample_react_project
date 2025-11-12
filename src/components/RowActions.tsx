type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function RowActions({ onEdit, onDelete }: Props) {
  return (
    <div className="d-flex gap-2">
      <button className="btn btn-sm btn-primary d-flex align-items-center gap-1" onClick={onEdit}>
        <i className="bi bi-pencil-square"></i> Edit
      </button>
      <button className="btn btn-sm btn-danger d-flex align-items-center gap-1" onClick={onDelete}>
        <i className="bi bi-trash"></i> Delete
      </button>
    </div>
  );
}
