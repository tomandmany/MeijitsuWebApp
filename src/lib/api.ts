export async function fetchMembers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/members`);
  if (!response.ok) {
    throw new Error('Failed to fetch members');
  }
  return response.json();
}

export async function fetchMemberShifts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/memberShifts`);
  if (!response.ok) {
    throw new Error('Failed to fetch member shifts');
  }
  return response.json();
}

export async function fetchShiftsModel() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/shiftsModel`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch shifts model');
  }
  return response.json();
}
