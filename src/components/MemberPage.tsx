// MemberPage.tsx
interface MemberPageProps {
  id: string;
  name: string;
}

const MemberPage = ({ id, name }: MemberPageProps) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <h1>{name}</h1>
    </div>
  );
};

export default MemberPage;