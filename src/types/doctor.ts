export interface Doctor {
  id?: number;
  doc_id: string;
  doctorName: string;
  department: string;
  gender: string;
  phone: string;
  specialization: string;
  experience: number;
  email: string;
  address: string;
  services: string;
  fee: string;
  timeSlot: string;
  receptionist: string;
  details: string;
  picture: File | null; // 👈 this should be File | null, not just null
}
