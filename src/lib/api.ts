export async function fetchUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export async function fetchUserShifts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/userShifts`);
  if (!response.ok) {
    throw new Error('Failed to fetch user shifts');
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
