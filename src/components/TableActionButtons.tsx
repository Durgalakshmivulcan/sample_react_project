export default function TableActionButtons() {
  const btnStyle = "btn btn-sm fw-semibold px-3";

  return (
    <div className="d-flex gap-2">
      <button className={`${btnStyle} btn-dark`}>Copy</button>
      <button className={`${btnStyle} btn-success`}>Excel</button>
      <button className={`${btnStyle} btn-info text-white`}>CSV</button>
      <button className={`${btnStyle} btn-danger`}>PDF</button>
      <button className={`${btnStyle} btn-primary`}>Print</button>
    </div>
  );
}
 